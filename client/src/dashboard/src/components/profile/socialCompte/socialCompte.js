import React from 'react';
import {FormattedMessage} from 'react-intl';

//css
import './socialCompte.css';

//bootstrap
import {Row, Col, Button, Image} from 'react-bootstrap'

//media
import Facebook from './media/facebook.png'
import Linkedin from './media/linkedin.png'
import Twitter from './media/Twitter-icon.png'

//redux
import {connect} from "react-redux";
import {
    ajouterLinkedin,
    ajouterFacebook,
    ajouterTwitter,
    addLinkedin,
    addFacebook,
    addTwitter,
    viderLk,
    viderFb,
    viderTw,
    validerLk,
    validerFb,
    validerTw
} from '../../../actions/userProfileActions';

//antd
import Icon from 'antd/lib/icon';

//gobal
import {checkFaceBook, checkTwitter, checkLinkedin, lang} from '../../../global'

import iziToast from 'izitoast';


class SocialCompte extends React.Component {

    componentDidMount() {
        this.lk = window.document.getElementById("lk");
        this.inputLk = window.document.getElementById("inputLk");
        this.outputLk = window.document.getElementById("outputLk");

        this.fb = window.document.getElementById("fb");
        this.inputFb = window.document.getElementById("inputFb");
        this.outputFb = window.document.getElementById("outputFb");

        this.tw = window.document.getElementById("tw");
        this.outputTw = window.document.getElementById("outputTw");
        this.inputTw = window.document.getElementById("inputTw");
    }

    // Linkedin
    ajouterLk() {
        this.lk.style.display = "none";
        this.inputLk.style.display = "initial";
        this.props.dispatch(ajouterLinkedin());
    }

    onChangeLinkedin(e) {
        let str = e.target.value.replace(/\s+/g, '');
        this.outputLk.style.display = "none";
        this.props.dispatch(addLinkedin(str));
    }

    validerLinkedin(e) {
        e.preventDefault();
        if (checkLinkedin(this.props.linkedin)) {
            this.props.dispatch(validerLk(this.props.basicInfo, this.props.linkedin));
            let value = this.props.linkedin;
            if (value === "" || value === "non rempli") {
                this.lk.style.display = "initial";
                this.outputLk.style.display = "none";
            } else {
                this.outputLk.style.display = "initial";
                this.lk.style.display = "none";
            }
            this.inputLk.style.display = "none";
        } else {
            iziToast.error({
                title: 'Error',
                message: lang["basicEdit.ValidateStatus"][7],
                position: 'topCenter',
            });
        }
    }

    cancelLinkedin() {
        this.outputLk.style.display = "none";
        this.lk.style.display = "initial";
        this.props.dispatch(viderLk(this.props.basicInfo));
    }

    // Facebook
    ajouterFb() {
        this.fb.style.display = "none";
        this.inputFb.style.display = "initial";
        this.props.dispatch(ajouterFacebook());
    }

    onChangeFacebook(e){
        let str = e.target.value.replace(/\s+/g, '');
        this.outputFb.style.display = "none";
        this.props.dispatch(addFacebook(str));
    }

    validerFacebook(e) {
        e.preventDefault();
        if (checkFaceBook(this.props.facebook)) {
            this.props.dispatch(validerFb(this.props.basicInfo, this.props.facebook));
            let value = this.props.facebook;
            if (value === "" || value === "non rempli") {
                this.fb.style.display = "initial";
                this.outputFb.style.display = "none";
            } else {
                this.outputFb.style.display = "initial";
                this.fb.style.display = "none";
            }
            this.inputFb.style.display = "none";
        } else {
            iziToast.error({
                title: 'Error',
                message: lang["basicEdit.ValidateStatus"][7],
                position: 'topCenter',
            });
        }

    }

    cancelFacebook() {
        this.outputFb.style.display = "none";
        this.fb.style.display = "initial";
        this.props.dispatch(viderFb(this.props.basicInfo));
    }

    // Twitter
    ajouterTw() {
        this.props.dispatch(ajouterTwitter());
        let hidden = window.document.getElementById("tw");
        hidden.style.display = "none";
        let show = window.document.getElementById("inputTw");
        show.style.display = "initial";
    }

    onChangeTwitter(e){
        let str = e.target.value.replace(/\s+/g, '');
        this.props.dispatch(addTwitter(str));
        let hidden = window.document.getElementById("outputTw");
        hidden.style.display = "none";
    }

    validerTwitter(e) {
        e.preventDefault();
        if (checkTwitter(this.props.twitter)) {
            // this.props.dispatch(validerTw(this.props.basicInfo, this.props.twitter));
            let value = this.props.twitter;
            if (value === "" || value === "non rempli") {
                this.tw.style.display = "initial";
                this.outputTw.style.display = "none";
            } else {
                this.outputTw.style.display = "initial";
                this.tw.style.display = "none";
            }
            this.inputTw.style.display = "none";
        } else {
            iziToast.error({
                title: 'Error',
                message: lang["basicEdit.ValidateStatus"][7],
                position: 'topCenter',
            });
        }

    }

    cancelTwitter() {
        this.outputTw.style.display = "none";
        this.tw.style.display = "initial";
        this.props.dispatch(viderTw(this.props.basicInfo));
    }

    handleSubmit(event) {
        // event preventDefault is obligatory
        event.preventDefault();
    }


    render() {
        const boxStyle = {
            position: 'fix',
            top: '83px',
            background: 'white',
            marginTop: '25px',
            boxShadow: '3px 3px 5px 0px rgba(161, 151, 151, 0.2)',
        };

        const addCompte = {
            float: 'right',
            color: '#405A65',
            fontWeight: '400',
            border: '2px solid #B7D9EE',
            width: '80px',
            textAlign: 'center',
            paddingTop: '1px',
            paddingBottom: '1px',
            borderRadius: '5px',
        };

        const validerCompte = {
            float: 'right',
            fontWeight: '400',
            paddingRight: '0',
            border: 'none',
            textAlign: 'center',
            paddingTop: '3px',
            paddingBottom: '3px',
            borderRadius: '5px',
        };

        const allCompte = {
            float: 'right',
            color: '#281E1D',
            fontSize: '14px',
            fontWeight: '400',
            marginTop: '3px',
            marginBottom: '2px',
        };


        return (
            <div className="infoSocial" style={boxStyle}>
                <Row>
                    <Col xs={2} sm={4}>
                        <Image className="icon" src={Linkedin} responsive/>
                        <span style={{
                            float: 'left',
                            color: '#405A65',
                            fontWeight: '400',
                            fontSize: '14px',
                            marginLeft: '15px',
                            marginTop: '3px'
                        }}>Linkedin</span>
                    </Col>
                    <Col xs={10} sm={8}>
                        {/*Show compte and Supprimer button*/}
                        <div id="outputLk">
                            <a onClick={this.cancelLinkedin.bind(this)}
                               tabIndex="0"
                               style={{float: 'right', marginLeft: '10px', marginTop: '5px', marginBottom: '0px'}}
                               className={(this.props.basicInfo.linkedinpage === "non rempli" || this.props.basicInfo.linkedinpage === "") ? "class_hidden" : "class_show"}>
                                <Icon type="close"/>
                            </a>
                            <p style={allCompte}
                               className={(this.props.basicInfo.linkedinpage === "non rempli" || this.props.basicInfo.linkedinpage === "") ? "class_hidden" : "class_show"}>
                                {this.props.basicInfo.linkedinpage}
                            </p>
                        </div>

                        {/*Ajouter Button*/}
                        <div id="lk"
                             className={!(this.props.basicInfo.linkedinpage === "non rempli" || this.props.basicInfo.linkedinpage === "") || (this.props.ajouterLinkedinFlag) ? "class_hidden" : "class_show"}>
                            <FormattedMessage id="socialCompte.add">
                                {(message) =>
                                    <Button
                                        onClick={this.ajouterLk.bind(this)}
                                        style={addCompte}
                                        onSubmit={this.handleSubmit}>
                                        {message}
                                    </Button>}
                            </FormattedMessage>
                        </div>

                        {/*Input and Valider button*/}
                        <form id="inputLk"
                              onSubmit={this.validerLinkedin.bind(this)}
                              style={{height: '27px'}}
                              className={(!this.props.ajouterLinkedinFlag) ? "class_hidden" : "class_show"}>
                            <FormattedMessage id="socialCompte.validate">
                                {(message) =>
                                    <Button type="submit"
                                            style={validerCompte}>
                                        {message}
                                    </Button>}
                            </FormattedMessage>
                            <FormattedMessage id="socialCompte.inputLk">
                                {(message) =>
                                    <input placeholder={message}
                                           className="inputCompte"
                                           onChange={this.onChangeLinkedin}
                                           value={this.props.linkedin}
                                    />}
                            </FormattedMessage>
                        </form>
                    </Col>
                </Row>

                <hr/>

                <Row>
                    <Col xs={2} sm={4}>
                        <Image className="icon" src={Facebook} responsive/>
                        <span style={{
                            float: 'left',
                            color: '#405A65',
                            fontWeight: '400',
                            fontSize: '14px',
                            marginLeft: '15px',
                            marginTop: '3px'
                        }}>Facebook</span>
                    </Col>
                    <Col xs={10} sm={8}>
                        {/*Show compte and Supprimer button*/}
                        <div id="outputFb">
                            <a onClick={this.cancelFacebook.bind(this)}
                               tabIndex="0"
                               style={{float: 'right', marginLeft: '10px', marginTop: '5px', marginBottom: '0px'}}
                               className={(this.props.basicInfo.facebookpage === "non rempli" || this.props.basicInfo.facebookpage === "") ? "class_hidden" : "class_show"}>
                                <Icon type="close"/>
                            </a>
                            <p style={allCompte}
                               className={(this.props.basicInfo.facebookpage === "non rempli" || this.props.basicInfo.facebookpage === "") ? "class_hidden" : "class_show"}>
                                {this.props.basicInfo.facebookpage}
                            </p>
                        </div>

                        {/*Ajouter Button*/}
                        <div id="fb"
                             className={!(this.props.basicInfo.facebookpage === "non rempli" || this.props.basicInfo.facebookpage === "") || (this.props.ajouterFacebookFlag) ? "class_hidden" : "class_show"}>
                            <FormattedMessage id="socialCompte.add">
                                {(message) =>
                                    <Button
                                        onClick={this.ajouterFb.bind(this)}
                                        style={addCompte}
                                        onSubmit={this.handleSubmit}>
                                        {message}
                                    </Button>}
                            </FormattedMessage>
                        </div>

                        {/*Input and Valider button*/}
                        <form id="inputFb"
                              onSubmit={this.validerFacebook.bind(this)}
                              style={{height: '27px'}}
                              className={!this.props.ajouterFacebookFlag ? "class_hidden" : "class_show"}>
                            <FormattedMessage id="socialCompte.validate">
                                {(message) =>
                                    <Button type="submit"
                                            style={validerCompte}>
                                        {message}
                                    </Button>}
                            </FormattedMessage>
                            <FormattedMessage id="socialCompte.inputFb">
                                {(message) =>
                                    <input placeholder={message}
                                           className="inputCompte"
                                           onChange={this.onChangeFacebook}
                                           value={this.props.facebook}
                                    />}
                            </FormattedMessage>
                        </form>
                    </Col>
                </Row>

                <hr/>

                <Row>
                    <Col xs={2} sm={4}>
                        <Image className="icon" src={Twitter} responsive/>
                        <span style={{
                            float: 'left',
                            color: '#405A65',
                            fontWeight: '400',
                            fontSize: '14px',
                            marginLeft: '15px',
                            marginTop: '3px'
                        }}>Twitter</span>
                    </Col>
                    <Col xs={10} sm={8}>
                        {/*Show compte and delete button*/}
                        <div id="outputTw">
                            <a onClick={this.cancelTwitter.bind(this)}
                               tabIndex="0"
                               style={{float: 'right', marginLeft: '10px', marginTop: '5px', marginBottom: '0px'}}
                               className={(this.props.basicInfo.twitterpage === "non rempli" || this.props.basicInfo.twitterpage === "") ? "class_hidden" : "class_show"}>
                                <Icon type="close"/>
                            </a>
                            <p style={allCompte}
                               className={(this.props.basicInfo.twitterpage === "non rempli" || this.props.basicInfo.twitterpage === "") ? "class_hidden" : "class_show"}>
                                {this.props.basicInfo.twitterpage}
                            </p>
                        </div>

                        {/*Ajouter Button*/}
                        <div id="tw"
                             className={!(this.props.basicInfo.twitterpage === "non rempli" || this.props.basicInfo.twitterpage === "") || (this.props.ajouterTwitterFlag) ? "class_hidden" : "class_show"}>
                            <FormattedMessage id="socialCompte.add">
                                {(message) =>
                                    <Button
                                        onClick={this.ajouterTw.bind(this)}
                                        style={addCompte}
                                        onSubmit={this.handleSubmit}>
                                        {message}
                                    </Button>}
                            </FormattedMessage>
                        </div>

                        {/*Input and Valider button*/}
                        <form id="inputTw"
                              onSubmit={this.validerTwitter.bind(this)}
                              style={{height: '27px'}}
                              className={!this.props.ajouterTwitterFlag ? "class_hidden" : "class_show"}>
                            <FormattedMessage id="socialCompte.validate">
                                {(message) =>
                                    <Button type="submit"
                                            style={validerCompte}>
                                        {message}
                                    </Button>}
                            </FormattedMessage>
                            <FormattedMessage id="socialCompte.inputTw">
                                {(message) =>
                                    <input placeholder={message}
                                           className="inputCompte"
                                           onChange={this.onChangeTwitter}
                                           value={this.props.twitter}
                                    />}
                            </FormattedMessage>
                        </form>
                    </Col>
                </Row>
            </div>

        )
    }
}

export default connect((store) => {
    return {
        basicInfo: store.userProfile.user.basicInfo,
        ajouterLinkedinFlag: store.userProfile.ajouterLinkedinFlag,
        ajouterFacebookFlag: store.userProfile.ajouterFacebookFlag,
        ajouterTwitterFlag: store.userProfile.ajouterTwitterFlag,
        linkedin: store.userProfile.linkedin,
        facebook: store.userProfile.facebook,
        twitter: store.userProfile.twitter,
        firstNub: store.userProfile.firstNub,

        valueLinkedin: store.userProfile.user.basicInfo.linkedinpage,
        valueFacebook: store.userProfile.user.basicInfo.facebookpage,
        valueTwitter: store.userProfile.user.basicInfo.twitterpage,
    }
})(SocialCompte);