/**
 * Created by shenlin on 02/11/2017.
 */
import validate from 'validate.js';
import _ from 'underscore';

/**
 * Adds two numbers
 * @param {Object} constraints
 * @param {String} formSelector
 * @param {String} formGroupClassName
 * @param {String} messageSelector
 * @return {Object} error
 */

export default function validation(constraints, formSelector, formGroupClassName, messageSelector) {
  // Hook up the form so we can prevent it from being posted
  const form = document.querySelector(formSelector);

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  // Hook up the inputs to validate on the fly
  const inputs = document.querySelectorAll('input, textarea, select');
  for (let i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener('keyup', function (ev) {
      const errors = validate(form, constraints, { fullMessages: false }) || {};
      showErrorsForInput(this, errors[this.name]);
    });
  }

  function handleFormSubmit(form) {
    // validate the form aainst the constraints
    const errors = validate(form, constraints, { fullMessages: false });
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }

  // Updates the inputs with the validation errors
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll('input[name], select[name]'), (input) => {
      // Since the errors can be null if no errors were found we need to handle
      // that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  // Shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // This is the root of the input
    let formGroup = closestParent(input.parentNode, formGroupClassName),
      // Find where the error messages will be insert into
      messages = formGroup.querySelector(messageSelector);
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add('has-error');
      // then we append all the errors
      _.each(errors, (error) => {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add('has-success');
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    }
    return closestParent(child.parentNode, className);
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove('has-error');
    formGroup.classList.remove('has-success');
    // and remove any old messages
    _.each(formGroup.querySelectorAll('.help-block.error'), (el) => {
      el.parentNode.removeChild(el);
    });
  }

  // Adds the specified error with the following markup
  // <p class="help-block error">[message]</p>
  function addError(messages, error) {
    const block = document.createElement('p');
    block.classList.add('help-block');
    block.classList.add('error');
    block.innerText = error;
    messages.appendChild(block);
  }

  function showSuccess() {
    // We made it \:D/
    // alert("Success!");
  }

  return validate(form, constraints, { fullMessages: false });
}
