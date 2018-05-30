import React from 'react';
import {FormattedMessage} from 'react-intl';

//media
import Flag from './media/flags.png';

//redux
import {connect} from "react-redux";
import {
    setModifyMode,
    validBasicInfoChange,
    setUserEmail,
    setUserFirstName,
    setUserLastName,
    setUserProfession,
    setUserCompanyName,
    setUserBirthdayDate,
    setUserBirthdayMonth,
    setUserBirthdayYear,
    setUserPhoto,
    setUserTelephone,
    setUserAddress,
    setUserCity,
    setUserZip,
    setCountry,
    setUserDescription,
    cancelChange,
    setFirstNub
} from "../../../actions/userProfileActions";

import {
    checkFirstName, checkLastName, checkEmail, checkBirthday, checkTelephone, checkProfession, checkCompanyName,
    checkAddress, checkLocation, checkCountry, checkZipCode, checkDescription, uploadingAvatar
}from "../../../actions/checkActions"

//fallback
import ReactImageFallback from "react-image-fallback";
import fallbackAvatar from "../../menu/media/fallback_avatar.png";

//css
import './basicInfo.css';

//bootstrap
import {Row, Col, Button, ButtonToolbar, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

// Plugin
import ReactTelInput from 'react-telephone-input/lib/withStyles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Global
import {serverName, nameCheck, emailCheck, birthdayCheck, lengthCheck, zipCodeCheck, lang} from '../../../global';

//phone check
import {parse, isValidNumber} from 'libphonenumber-js'

//country
import {countries} from 'country-data'

// antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
// import DatePicker from 'antd/lib/date-picker';


const FormItem = Form.Item;
const Option = Select.Option;


class BasicEdit extends React.Component {


    componentDidUpdate() {
        this.props.dispatch(setFirstNub(this.countValidInput()))
    }


    handleSubmit(event) {
        // event preventDefault is obligatory
        event.preventDefault();

        let formStatusCode = 0;
        if (this.props.firstNameValidateStatus !== 0) {
            formStatusCode = 1
        }
        else if (this.props.lastNameValidateStatus !== 0) {
            formStatusCode = 2
        }
        else if (!this.props.professionValidateStatus) {
            formStatusCode = 3
        }
        else if (!this.props.companyNameValidateStatus) {
            formStatusCode = 4
        }
        else if (!this.props.birthdayValidateStatus) {
            formStatusCode = 5
        }
        else if (!this.props.telephoneValidateStatus) {
            formStatusCode = 6
        }
        else if (this.props.emailValidateStatus !== 0) {
            formStatusCode = 7
        }
        else if (!this.props.addressValidateStatus) {
            formStatusCode = 8
        }
        else if (!this.props.locationValidateStatus) {
            formStatusCode = 9
        }
        else if (!this.props.zipCodeValidateStatus) {
            formStatusCode = 10
        }
        else if (!this.props.descriptionValidateStatus) {
            formStatusCode = 11
        }

        let content = lang["basicEdit.error"];

        if (formStatusCode === 0) {
            iziToast.info({
                title: 'info',
                message: "Your changes will not be saved in this demo",
                position: 'topCenter',
            });
            // this.props.dispatch(validBasicInfoChange(this.props.basicInfo, this.props.basicInfoBackUp));
            this.props.dispatch(setModifyMode());
            this.props.dispatch(setFirstNub(this.countValidInput()))
        } else {
            iziToast.error({
                title: 'Error',
                message: content[formStatusCode - 1],
                position: 'topCenter',
            });
        }
    }

    countValidInput() {
        let firstNub = 0;

        if (this.props.firstNameValidateStatus === 0 && this.props.basicInfo.firstName) {
            firstNub += 1
        }
        if (this.props.lastNameValidateStatus === 0 && this.props.basicInfo.lastName) {
            firstNub += 1
        }
        if (this.props.professionValidateStatus && this.props.basicInfo.profession) {
            firstNub += 1
        }
        if (this.props.companyNameValidateStatus && this.props.basicInfo.company_name) {
            firstNub += 1
        }
        if (this.props.birthdayValidateStatus && this.props.basicInfo.birthdayDate) {
            firstNub += 1
        }
        if (this.props.telephoneValidateStatus && this.props.basicInfo.telephone) {
            firstNub += 1
        }
        if (this.props.emailValidateStatus === 0 && this.props.basicInfo.email) {
            firstNub += 1
        }
        if (this.props.addressValidateStatus && this.props.basicInfo.address) {
            firstNub += 1
        }
        if (this.props.locationValidateStatus && this.props.basicInfo.city) {
            firstNub += 1
        }
        if (this.props.countryValidateStatus && this.props.basicInfo.country) {
            firstNub += 1
        }
        if (this.props.zipCodeValidateStatus && this.props.basicInfo.zip_code) {
            firstNub += 1
        }
        if (this.props.descriptionValidateStatus && this.props.basicInfo.description) {
            firstNub += 1
        }
        if (this.props.basicInfo.photo !== null && this.props.basicInfo.photo) {
            firstNub += 1
        }
        if (this.props.basicInfo.linkedinpage !== null && this.props.basicInfo.linkedinpage && this.props.basicInfo.linkedinpage !== "non rempli") {
            firstNub += 1
        }
        if (this.props.basicInfo.twitterpage !== null && this.props.basicInfo.twitterpage && this.props.basicInfo.twitterpage !== "non rempli") {
            firstNub += 1
        }
        if (this.props.basicInfo.facebookpage !== null && this.props.basicInfo.facebookpage && this.props.basicInfo.facebookpage !== "non rempli") {
            firstNub += 1
        }
        return firstNub
    }


    // handle changes and dispatch to actions
    changeFirstName(e) {
        let code = nameCheck(e.target.value, 30);
        this.props.dispatch(checkFirstName(code));
        this.props.dispatch(setUserFirstName(e.target.value))
    }

    changePhoto(e) {

        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });
        // this.props.dispatch(uploadingAvatar(true));
        // this.props.dispatch(setUserPhoto(e.target.files[0], this.props.basicInfo.userProfileId))
    }

    changeEmail(e) {
        let code = emailCheck(e.target.value)
        this.props.dispatch(checkEmail(code));
        this.props.dispatch(setUserEmail(e.target.value))
    }

    changeLastName(e) {
        let code = nameCheck(e.target.value, 30);
        this.props.dispatch(checkLastName(code));
        this.props.dispatch(setUserLastName(e.target.value))
    }

    changeProfession(e) {
        let flag = lengthCheck(e.target.value, 90);
        this.props.dispatch(checkProfession(flag));
        this.props.dispatch(setUserProfession(e.target.value));
    }

    changeCompanyName(e) {
        let flag = lengthCheck(e.target.value, 90);
        this.props.dispatch(checkCompanyName(flag));
        this.props.dispatch(setUserCompanyName(e.target.value))
    }

    changeBirthdayDate(date) {
        let flag = birthdayCheck(`${date}/${this.props.basicInfo.birthdayMonth}/${this.props.basicInfo.birthdayYear}`);
        this.props.dispatch(checkBirthday(flag));
        this.props.dispatch(setUserBirthdayDate(date))
    }

    changeBirthdayMonth(month) {
        let flag = birthdayCheck(`${this.props.basicInfo.birthdayDate}/${month}/${this.props.basicInfo.birthdayYear}`);
        this.props.dispatch(checkBirthday(flag));
        this.props.dispatch(setUserBirthdayMonth(month))
    }

    changeBirthdayYear(year) {
        let flag = birthdayCheck(`${this.props.basicInfo.birthdayDate}/${this.props.basicInfo.birthdayMonth}/${year}`);
        this.props.dispatch(checkBirthday(flag));
        this.props.dispatch(setUserBirthdayYear(year))
    }


    changeTelephone(telNumber, selectedCountry) {
        telNumber = telNumber.replace(/\s+/g, '');
        let flag = isValidNumber(parse(telNumber));
        this.props.dispatch(checkTelephone(flag));
        this.props.dispatch(setUserTelephone(telNumber));
    }

    changeAddress(e) {
        let flag = lengthCheck(e.target.value, 80);
        this.props.dispatch(checkAddress(flag));
        this.props.dispatch(setUserAddress(e.target.value))
    }

    changeCity(e) {
        let flag = lengthCheck(e.target.value, 20);
        this.props.dispatch(checkLocation(flag));
        this.props.dispatch(setUserCity(e.target.value))
    }

    changeZip(e) {
        let flag = zipCodeCheck(e.target.value);
        this.props.dispatch(checkZipCode(flag));
        this.props.dispatch(setUserZip(e.target.value))
    }

    changeCountry(e) {
        this.props.dispatch(setCountry(e))
    }

    changeDescription(e) {
        let flag = lengthCheck(e.target.value, 500);
        this.props.dispatch(checkDescription(flag));
        this.props.dispatch(setUserDescription(e.target.value))
    }


    cancel() {
        this.props.dispatch(cancelChange());
        this.props.dispatch(setModifyMode());

        // force validation of telephone
        let flagTelephone = isValidNumber(parse(this.props.basicInfoBackUp.telephone));
        this.props.dispatch(checkTelephone(flagTelephone));

        // force validation of birthday
        let flagBirthday = birthdayCheck(`${this.props.basicInfoBackUp.birthdayDate}/${this.props.basicInfoBackUp.birthdayMonth}/${this.props.basicInfoBackUp.birthdayYear}`);
        this.props.dispatch(checkBirthday(flagBirthday));
    }


    render() {

        const profilePhoto = {
            width: '100%',
            maxHeight: '200px',
            maxWidth: '200px',
            margin: 'auto'
        };

        const profileTitle = {
            fontSize: '14px',
            fontWeight: '300',
            color: '#405A65',
        };

        const birthdayInput = {
            width: '25%'
        };

        const inputStyle = {
            color: '#405A65',
            fontWeight: '500',
            width: '100%',
            borderRadius: '0',
            border: 'none',
            background: '#F2F4F5',
            boxShadow: 'none',
            paddingTop: '6px',
            paddingBottom: '6px',
            paddingLeft: '12px',
            fontSize: '14px',
            height: '40px',
        }

        return (
            <div className="basicEdit">
                {/*a big form starts*/}

                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row className="infoBasic" style={{marginTop: '30px'}}>
                        <Col xs={6} sm={5} md={4} lg={3} style={{textAlign: 'center'}}>
                            <ReactImageFallback
                                src={serverName + this.props.basicInfo.photo}
                                fallbackImage={fallbackAvatar}
                                alt="profile"
                                className="img-profile responsive"
                                thumbnail
                                responsive
                                style={profilePhoto}/>
                            <label htmlFor="uploadProfileImg" style={{width: '100%'}}>
                                <FormItem
                                    validateStatus={(() => {
                                        if (this.props.uploadingAvatar) {
                                            return "validating"
                                        }
                                    })()}
                                    hasFeedback
                                >
                                    <FormattedMessage id="basicEdit.import">
                                        {(message) => <div className="changePhoto" tabIndex="0">{message}</div>}
                                    </FormattedMessage>

                                </FormItem>

                                <input accept='image/jpg, image/jpeg, image/png' type="file" id="uploadProfileImg"
                                       style={{display: 'none'}} onChange={this.changePhoto.bind(this)}/>
                                <p className="gris-tag">JPG, JPEG ou PNG</p>
                                <p className="gris-tag">Taille max: 4 mo</p>
                            </label>
                        </Col>
                        <Col xs={6} sm={7} md={8} lg={9}>

                            <Row>
                                {/*last name*/}
                                <Col xs={12} sm={6} md={6} lg={5}>
                                    <FormattedMessage id="basicEdit.prenom">
                                        {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                    </FormattedMessage>

                                    <FormItem
                                        validateStatus={(() => {
                                            if (this.props.lastNameValidateStatus === 0) {
                                                return "success"
                                            } else {
                                                return "error"
                                            }
                                        })()
                                        }
                                        hasFeedback
                                        help={(() => {

                                            switch (this.props.lastNameValidateStatus) {
                                                case 0:
                                                    break;
                                                case 1:
                                                    return lang["basicEdit.ValidateStatus"][0];
                                                // "This field can not be empty"
                                                case 2:
                                                    return lang["basicEdit.ValidateStatus"][6];
                                                // "Should contain alpha only"
                                                case 3:
                                                    return lang["basicEdit.ValidateStatus"][1];
                                                //  "20 caractères maximum",
                                                default:
                                                    return lang["basicEdit.ValidateStatus"][5];
                                                // "unknown error";
                                            }

                                        })()}>
                                        <Input placeholder="Prénom"
                                               style={inputStyle}
                                               id="lastName"
                                               value={this.props.basicInfo.lastName}
                                               maxLength="30"
                                               onChange={this.changeLastName.bind(this)}
                                        />
                                    </FormItem>

                                </Col>


                                {/*first name*/}
                                <Col xs={12} sm={6} md={6} lg={5}>
                                    <FormattedMessage id="basicEdit.nom">
                                        {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                    </FormattedMessage>

                                    <FormItem
                                        validateStatus={(() => {
                                            if (this.props.firstNameValidateStatus === 0) {
                                                return "success"
                                            } else {
                                                return "error"
                                            }
                                        })()
                                        }
                                        hasFeedback
                                        help={(() => {
                                            switch (this.props.firstNameValidateStatus) {
                                                case 0:
                                                    break;
                                                case 1:
                                                    return lang["basicEdit.ValidateStatus"][0];
                                                case 2:
                                                    return lang["basicEdit.ValidateStatus"][6];
                                                case 3:
                                                    return lang["basicEdit.ValidateStatus"][1];
                                                default:
                                                    return lang["basicEdit.ValidateStatus"][5];
                                            }

                                        })()}>
                                        <Input placeholder="Nom"
                                               style={inputStyle}
                                               id="firstName"
                                               value={this.props.basicInfo.firstName}
                                               maxLength="30"
                                               onChange={this.changeFirstName.bind(this)}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>

                            {/******** web Start ********/}
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={5}>
                                    <FormGroup controlId="profession">
                                        <FormattedMessage id="basicEdit.job">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.professionValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {
                                                if (!this.props.professionValidateStatus) {
                                                    return lang["basicEdit.ValidateStatus"][2];
                                                }
                                            })()}>
                                            <Input style={inputStyle}
                                                   type="text"
                                                   placeholder="Profession"
                                                   onChange={this.changeProfession.bind(this)}
                                                   maxLength='90'
                                                   value={this.props.basicInfo.profession}
                                            />
                                        </FormItem>
                                    </FormGroup>
                                </Col>
                                <Col className="companySmall" xs={12} sm={12} md={6} lg={5}>

                                    <FormGroup controlId="companyName">
                                        <FormattedMessage id="basicEdit.company">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.companyNameValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {
                                                if (!this.props.companyNameValidateStatus) {
                                                    return lang["basicEdit.ValidateStatus"][2];
                                                }
                                            })()}>
                                            <Input style={inputStyle}
                                                   type="text"
                                                   placeholder="Votre entreprise actuelle"
                                                   onChange={this.changeCompanyName.bind(this)}
                                                   maxLength='90'
                                                   value={this.props.basicInfo.company_name}
                                            />
                                        </FormItem>
                                    </FormGroup>
                                </Col>
                            </Row>


                            <Row>
                                <Col className="dateSmall" xs={12} sm={12} md={6} lg={5}>
                                    <FormGroup controlId="formBirthday1">
                                        <FormattedMessage id="basicEdit.birthday">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.birthdayValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {

                                                if (this.props.birthdayValidateStatus) {
                                                    return ""
                                                } else {
                                                    return lang["basicEdit.ValidateStatus"][7];
                                                }

                                            })()}>
                                            <div>
                                                {/*day*/}
                                                <Select onSelect={this.changeBirthdayDate.bind(this)}
                                                        value={(() => {
                                                            if (this.props.basicInfo.birthdayDate) {
                                                                return this.props.basicInfo.birthdayDate.toString()
                                                            } else {
                                                                return "5"
                                                            }
                                                        })()} style={birthdayInput}>
                                                    {
                                                        (() => {
                                                            let N = 31;
                                                            const numbers = Array.apply(null, {length: N}).map(Number.call, Number)
                                                            const optionItems = numbers.map((number) =>
                                                                <Option value={(number + 1).toString()}
                                                                        key={(number + 1).toString()}>
                                                                    {number + 1}
                                                                </Option>
                                                            );

                                                            return (optionItems)
                                                        })()
                                                    }
                                                </Select>

                                                {/*month*/}
                                                <Select onSelect={this.changeBirthdayMonth.bind(this)}
                                                        value={(() => {
                                                            if (this.props.basicInfo.birthdayMonth) {
                                                                return this.props.basicInfo.birthdayMonth.toString()
                                                            } else {
                                                                return '10'
                                                            }
                                                        })()}
                                                        style={birthdayInput}>
                                                    {
                                                        (() => {
                                                            let N = 12;
                                                            const numbers = Array.apply(null, {length: N}).map(Number.call, Number)
                                                            const optionItems = numbers.map((number) =>
                                                                <Option value={(number + 1).toString()}
                                                                        key={(number + 1).toString()}>
                                                                    {number + 1}
                                                                </Option>
                                                            );

                                                            return (optionItems)
                                                        })()
                                                    }
                                                </Select>

                                                {/*year*/}
                                                <Select onSelect={this.changeBirthdayYear.bind(this)}
                                                        value={(() => {
                                                            if (this.props.basicInfo.birthdayYear) {
                                                                return this.props.basicInfo.birthdayYear.toString()
                                                            } else {
                                                                return '1958'
                                                            }
                                                        })()}
                                                        style={{width: "50%"}} className="year">
                                                    {
                                                        (() => {
                                                            let currentYear = new Date().getFullYear();
                                                            let yearList = []
                                                            for (let i = 0; i < 100; i++) {
                                                                yearList.push(currentYear);
                                                                currentYear--;
                                                            }
                                                            const optionItems = yearList.map((year) =>
                                                                <Option value={year.toString()} key={(year).toString()}>
                                                                    {year}
                                                                </Option>
                                                            );

                                                            return (optionItems)
                                                        })()
                                                    }
                                                </Select>

                                            </div>
                                        </FormItem>

                                    </FormGroup>
                                </Col>


                                <Col className="teleSmall" xs={12} sm={12} md={6} lg={5}>
                                    <FormGroup controlId="telephoneWeb">
                                        <FormattedMessage id="basicEdit.tele">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.telephoneValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {

                                                if (this.props.telephoneValidateStatus) {
                                                    return ""
                                                } else {
                                                    return lang["basicEdit.ValidateStatus"][7];
                                                }

                                            })()}>
                                            <ReactTelInput
                                                defaultCountry='fr'
                                                flagsImagePath={Flag}
                                                onChange={this.changeTelephone.bind(this)}
                                                value={this.props.basicInfo.telephone}
                                                autoComplete="off"
                                                // onBlur={this.handleInputBlur}
                                                required
                                            />
                                        </FormItem>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    {/*part mobile begins*/}
                    <Row className="infoBasic">
                        <Col xs={12} sm={12} mdOffset={4} md={8} lgOffset={3} lg={9}>

                            <Row className="companyBig">
                                <Col xs={12} smHidden mdHidden lgHidden>
                                    <FormGroup controlId="companyNameMobild">
                                        <FormattedMessage id="basicEdit.company">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.companyNameValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {

                                                if (!this.props.companyNameValidateStatus) {
                                                    return lang["basicEdit.ValidateStatus"][2];
                                                }

                                            })()}>
                                            <Input style={inputStyle}
                                                   type="text"
                                                   placeholder="Votre entreprise actuelle"
                                                   maxLength='90'
                                                   onChange={this.changeCompanyName.bind(this)}
                                                   value={this.props.basicInfo.company_name}
                                            />
                                        </FormItem>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="dateBig">
                                <Col xs={12} smHidden mdHidden lgHidden>
                                    <FormGroup controlId="formBirthday2">
                                        <FormattedMessage id="basicEdit.birthday">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.birthdayValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {

                                                if (this.props.birthdayValidateStatus) {
                                                    return ""
                                                } else {
                                                    return lang["basicEdit.ValidateStatus"][7];
                                                }

                                            })()}>
                                            <div>
                                                {/*day*/}
                                                <Select onSelect={this.changeBirthdayDate.bind(this)}
                                                        value={(() => {
                                                            if (this.props.basicInfo.birthdayDate) {
                                                                return this.props.basicInfo.birthdayDate.toString()
                                                            } else {
                                                                return '5'
                                                            }
                                                        })()} style={birthdayInput}>
                                                    {
                                                        (() => {
                                                            let N = 31;
                                                            const numbers = Array.apply(null, {length: N}).map(Number.call, Number)
                                                            const optionItems = numbers.map((number) =>
                                                                <Option value={(number + 1).toString()}
                                                                        key={(number + 1).toString()}>
                                                                    {number + 1}
                                                                </Option>
                                                            );

                                                            return (optionItems)
                                                        })()
                                                    }
                                                </Select>

                                                {/*month*/}
                                                <Select onSelect={this.changeBirthdayMonth.bind(this)}
                                                        value={(() => {
                                                            if (this.props.basicInfo.birthdayMonth) {
                                                                return this.props.basicInfo.birthdayMonth.toString()
                                                            } else {
                                                                return '10'
                                                            }
                                                        })()}
                                                        style={birthdayInput}>
                                                    {
                                                        (() => {
                                                            let N = 12;
                                                            const numbers = Array.apply(null, {length: N}).map(Number.call, Number)
                                                            const optionItems = numbers.map((number) =>
                                                                <Option value={(number + 1).toString()}
                                                                        key={(number + 1).toString()}>
                                                                    {number + 1}
                                                                </Option>
                                                            );

                                                            return (optionItems)
                                                        })()
                                                    }
                                                </Select>

                                                {/*year*/}
                                                <Select onSelect={this.changeBirthdayYear.bind(this)}
                                                        value={(() => {
                                                            if (this.props.basicInfo.birthdayYear) {
                                                                return this.props.basicInfo.birthdayYear.toString()
                                                            } else {
                                                                return '1958'
                                                            }
                                                        })()}
                                                        style={{width: "50%"}} className="year">
                                                    {
                                                        (() => {
                                                            let currentYear = new Date().getFullYear();
                                                            let yearList = []
                                                            for (let i = 0; i < 100; i++) {
                                                                yearList.push(currentYear);
                                                                currentYear--;
                                                            }
                                                            const optionItems = yearList.map((year) =>
                                                                <Option value={year.toString()} key={(year).toString()}>
                                                                    {year}
                                                                </Option>
                                                            );

                                                            return (optionItems)
                                                        })()
                                                    }
                                                </Select>

                                            </div>
                                        </FormItem>

                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="teleBig">
                                <Col xs={12} smHidden mdHidden lgHidden>
                                    <FormGroup controlId="telephoneWeb">
                                        <FormattedMessage id="basicEdit.tele">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>
                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.telephoneValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {

                                                if (this.props.telephoneValidateStatus) {
                                                    return ""
                                                } else {
                                                    return lang["basicEdit.ValidateStatus"][7];
                                                }

                                            })()}>
                                            <ReactTelInput
                                                defaultCountry='fr'
                                                flagsImagePath={Flag}
                                                onChange={this.changeTelephone.bind(this)}
                                                value={this.props.basicInfo.telephone}
                                                autoComplete="off"
                                                // onBlur={this.handleInputBlur}
                                                required
                                            />
                                        </FormItem>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/*part mobile end*/}


                    <Row className="infoBasic">
                        <Col mdOffset={4} md={8} lgOffset={3} lg={9}>
                            <Row>
                                <Col md={12} lg={10}>
                                    <FormattedMessage id="basicEdit.email">
                                        {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                    </FormattedMessage>

                                    <FormItem
                                        validateStatus={(() => {
                                            if (this.props.emailValidateStatus === 0) {
                                                return "success"
                                            } else {
                                                return "error"
                                            }
                                        })()
                                        }
                                        hasFeedback
                                        help={(() => {

                                            switch (this.props.emailValidateStatus) {
                                                case 0:
                                                    break;
                                                case 1:
                                                    return lang["basicEdit.ValidateStatus"][0];
                                                case 2:
                                                    return lang["basicEdit.ValidateStatus"][7];
                                                default:
                                                    return lang["basicEdit.ValidateStatus"][5];
                                            }

                                        })()}>
                                        <Input placeholder="Lin@hoolders.com"
                                               style={inputStyle}
                                               id="email"
                                               value={this.props.basicInfo.email}
                                               onChange={this.changeEmail.bind(this)}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    <Row className="infoBasic">
                        <Col mdOffset={4} md={8} lgOffset={3} lg={9}>
                            <Row>
                                <Col md={12} lg={10}>
                                    <FormGroup controlId="address">
                                        <FormattedMessage id="basicEdit.adress">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.addressValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }

                                            hasFeedback
                                            help={(() => {
                                                if (!this.props.addressValidateStatus) {
                                                    return lang["basicEdit.ValidateStatus"][3];
                                                }
                                            })()}>
                                            <Input style={inputStyle}
                                                   type="text"
                                                   placeholder="Numéro et nom de la voie"
                                                   onChange={this.changeAddress.bind(this)}
                                                   value={this.props.basicInfo.address}
                                            />
                                        </FormItem>

                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    <Row className="infoBasic">
                        <Col mdOffset={4} md={8} lgOffset={3} lg={9}>
                            <Row>
                                <Col md={6} lg={3}>
                                    <FormGroup controlId="zipCode">
                                        <FormattedMessage id="basicEdit.code">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.zipCodeValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {
                                                if (!this.props.zipCodeValidateStatus) {
                                                    return lang["basicEdit.ValidateStatus"][7];
                                                }
                                            })()}>
                                            <Input style={inputStyle}
                                                   type="text"
                                                   placeholder="Intitulé de votre poste"
                                                   onChange={this.changeZip.bind(this)}
                                                   value={this.props.basicInfo.zip_code}
                                            />
                                        </FormItem>
                                    </FormGroup>
                                </Col>

                                <Col md={6} lg={3} id="col-city">
                                    <FormGroup controlId="formBasicText">
                                        <FormattedMessage id="basicEdit.city">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.locationValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {
                                                if (!this.props.locationValidateStatus) {
                                                    return lang["basicEdit.ValidateStatus"][1];
                                                }
                                            })()}>
                                            <Input style={inputStyle}
                                                   type="text"
                                                   placeholder="Ville"
                                                   onChange={this.changeCity.bind(this)}
                                                   value={this.props.basicInfo.city}
                                            />
                                        </FormItem>
                                    </FormGroup>
                                </Col>

                                <Col md={12} lg={4}>
                                    <FormGroup controlId="zipCode">
                                        <ControlLabel style={profileTitle}>Pays *</ControlLabel>

                                        <FormItem
                                            validateStatus="success"
                                            hasFeedback
                                            help={(() => {
                                                if (!this.props.zipCodeValidateStatus) {
                                                    return lang["basicEdit.ValidateStatus"][7];
                                                }
                                            })()}>
                                            <Select onSelect={this.changeCountry.bind(this)}
                                                    value={(() => {
                                                        if (this.props.basicInfo.country) {
                                                            return this.props.basicInfo.country
                                                        } else {
                                                            return "FRA"
                                                        }
                                                    })()} style={{}} className='country'>
                                                {
                                                    (() => {
                                                        const optionItems = countries.all.filter((e) => {
                                                            return e.ioc !== ""
                                                        }).sort((a, b) => {
                                                            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                                                        }).map((country) =>
                                                            <Option value={country.ioc} key={country.ioc}>
                                                                {country.name}
                                                            </Option>
                                                        );
                                                        return (optionItems)
                                                    })()
                                                }
                                            </Select>
                                        </FormItem>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </Col>
                    </Row>


                    <Row className="infoBasic">
                        <Col mdOffset={4} md={8} lgOffset={3} lg={9}>
                            <Row>
                                <Col md={12} lg={10}>
                                    <FormGroup controlId="description">
                                        <FormattedMessage id="basicEdit.presentation">
                                            {(message) => <ControlLabel style={profileTitle}>{message}</ControlLabel>}
                                        </FormattedMessage>

                                        <FormItem
                                            validateStatus={(() => {
                                                if (this.props.descriptionValidateStatus) {
                                                    return "success"
                                                } else {
                                                    return "error"
                                                }
                                            })()
                                            }
                                            hasFeedback
                                            help={(() => {
                                                if (!this.props.descriptionValidateStatus) {
                                                    return lang["basicEdit.ValidateStatus"][4];
                                                }
                                            })()}>
                                            <FormControl rows="6"
                                                         style={{
                                                             ...inputStyle,
                                                             height: "calc(10vw+50px)",
                                                             marginBottom: "20px"
                                                         }}
                                                         componentClass="textarea"
                                                         maxLength='500'
                                                         placeholder="Présentez-vous en quelque phrases 500 caractères maximum."
                                                         value={this.props.basicInfo.description}
                                                         onChange={this.changeDescription.bind(this)}
                                            />
                                        </FormItem>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    {/*validate*/}
                    <Row>
                        <Col mdOffset={4} md={8} lgOffset={3} lg={9}>
                            <Row>
                                <Col md={12} lg={10}>
                                    <FormGroup role="form">
                                        <ButtonToolbar>
                                            <Button className="ok" bsSize="large" type="submit" style={{
                                                fontSize: '20px',
                                                color: 'white',
                                                fontWeight: '500',
                                                border: 'none',
                                                borderRadius: '5px',
                                                float: 'right'
                                            }}>Valider</Button>
                                            <Button className="cancel" bsSize="large" onClick={this.cancel.bind(this)}
                                                    style={{
                                                        fontSize: '20px',
                                                        color: 'white',
                                                        fontWeight: '500',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        marginRight: '1.5vw',
                                                        float: 'right'
                                                    }}>Annuler</Button>
                                        </ButtonToolbar>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}


export default connect((store) => {
    return {
        basicInfo: store.userProfile.user.basicInfo,
        basicInfoBackUp: store.userProfile.basicInfoBackUp,
        uploadingAvatar: store.userProfile.uploadingAvatar,
        // validation status
        firstNameValidateStatus: store.userProfile.firstNameValidateStatus,
        lastNameValidateStatus: store.userProfile.lastNameValidateStatus,
        emailValidateStatus: store.userProfile.emailValidateStatus,
        birthdayValidateStatus: store.userProfile.birthdayValidateStatus,
        telephoneValidateStatus: store.userProfile.telephoneValidateStatus,
        professionValidateStatus: store.userProfile.professionValidateStatus,
        companyNameValidateStatus: store.userProfile.companyNameValidateStatus,
        addressValidateStatus: store.userProfile.addressValidateStatus,
        locationValidateStatus: store.userProfile.locationValidateStatus,
        countryValidateStatus: store.userProfile.countryValidateStatus,
        zipCodeValidateStatus: store.userProfile.zipCodeValidateStatus,
        descriptionValidateStatus: store.userProfile.descriptionValidateStatus,
    }
})(BasicEdit);