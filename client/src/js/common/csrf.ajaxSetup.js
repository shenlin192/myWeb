/**
 * Created by shenlin on 04/11/2017.
 */
import $ from 'jquery';
import { getCookie } from './cookie';

$.ajaxSetup({
  beforeSend(xhr, settings) {
    if (settings.type === 'POST' || settings.type === 'PUT' || settings.type === 'DELETE') {
      if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
        // Only send the token to relative URLs i.e. locally.
        xhr.setRequestHeader('X-CSRF-Token', getCookie('csrfToken'));
      }
    }
  },
});
