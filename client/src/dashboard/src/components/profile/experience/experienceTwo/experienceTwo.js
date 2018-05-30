/**
 * Created by haowen 2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';

//css
import './experienceTwo.css';

//bootstrap
import {Row, Col, Button, Image} from 'react-bootstrap'

//media
import Sante from './media/sante.svg';
import Eco from './media/eco.svg';
import Objet from './media/objet.svg';
import Autre from './media/autre.svg';
import SanteBlue from './media/santeBlue.svg';
import EcoBlue from './media/ecoBlue.svg';
import ObjetBlue from './media/objetBlue.svg';
import AutreBlue from './media/autreBlue.svg';

import Curio from './media/curio.svg';
import Epargne from './media/epargne.svg';
import Accom from './media/accom.svg';
import Irpp from './media/irpp.svg';
import Tax from './media/tax.svg';
import Isf from './media/isf.svg';
import Pea from './media/pea.svg';
import Via from './media/via.svg';
import Aucune from './media/aucune.svg';

import CurioBlue from './media/curioBlue.svg';
import EpargneBlue from './media/epargneBlue.svg';
import AccomBlue from './media/accomBlue.svg';
import IrppBlue from './media/irppBlue.svg';
import TaxBlue from './media/taxBlue.svg';
import IsfBlue from './media/isfBlue.svg';
import PeaBlue from './media/peaBlue.svg';
import ViaBlue from './media/viaBlue.svg';
import AucuneBlue from './media/aucuneBlue.svg';

//global
import {lang} from '../../../../global'

//redux
import {connect} from "react-redux";
import {
    changeSecteur, changeObject, changeOption, changeInvCetteAnnee
}
    from '../../../../actions/userProfileActions';

//antd
import Radio from 'antd/lib/radio';
import 'antd/lib/radio/style/css';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ExperienceTwo extends React.Component {

    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollTop = 0;
        window.scrollTo(0, 0)
    }

    // 1 secteurAct
    onChangeSecteur(num) {
        let array = this.props.experienceControl.secteur;
        if (array[num] === true) {
            array[num] = false;
        } else {
            array[num] = true;
        }

        let str = [];
        for (let i = 0; i < 4; i++) {
            if (array[i] === true) {
                str.push(i);
            }
        }
        let newArray = str.sort();
        let answer = newArray.toString();
        this.props.dispatch(changeSecteur({array, answer}, this.props.userId));
    }

    // 2 motivInv
    onChangeObject(num) {
        let array = this.props.experienceControl.object;
        if (array[num] === true) {
            array[num] = false;
        } else {
            array[num] = true;
        }

        let str = [];
        for (let i = 0; i < 7; i++) {
            if (array[i] === true) {
                str.push(i);
            }
        }
        let newArray = str.sort();
        let answer = newArray.toString();
        this.props.dispatch(changeObject({array, answer}, this.props.userId));
    }

    // 3 defiscalisation
    onChangeOption(num) {
        let array = this.props.experienceControl.option;
        if(num===5){
            array = new Array(6).fill(false);
            array[5] = true;
        }else{
            array[5] = false;
            if (array[num] === true) {
                array[num] = false;
            } else {
                array[num] = true;
            }
        }


        let str = [];
        for (let i = 0; i < 6; i++) {
            if (array[i] === true) {
                str.push(i);
            }
        }
        let newArray = str.sort();
        let answer = newArray.toString();
        this.props.dispatch(changeOption({array, answer}, this.props.userId));
    }

    //4 montantInvCetteAnnee
    onChangeInvCetteAnnee(e) {
        this.props.dispatch(changeInvCetteAnnee(e.target.value));
    }


    render() {

        return (
            <div className="experienceTwo" style={{marginBottom: '45px'}}>
                {/*Question 1*/}
                <FormattedMessage id="experienceTwo.question_one">
                    {(message) =>
                        <h2 className="section-title3" style={{marginTop: '0px'}}>{message}</h2>}
                </FormattedMessage>
                {
                    (() => {
                        let rows = [];
                        let content = lang["experienceTwo.question_one.items"];
                        let imgs = [Sante, Eco, Objet, Autre];
                        let imgBlues = [SanteBlue, EcoBlue, ObjetBlue, AutreBlue];
                        for (let i = 0; i < 4; i++) {
                            rows.push(<Col xs={12} sm={6} key={i}>
                                <Button active={this.props.experienceControl.secteur[i]}
                                        onClick={this.onChangeSecteur.bind(this, i)}>
                                    <Image className="blueImg" src={imgs[i]}/>
                                    <Image className="whiteImg" src={imgBlues[i]}/>
                                    <span>{content[i]}</span>
                                </Button>
                            </Col>);
                        }
                        return (<Row className="checkListOne">{rows}</Row>);
                    })()
                }

                {/*Question 2*/}
                <FormattedMessage id="experienceTwo.question_two">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                {
                    (() => {
                        let rows = [];
                        let content = lang["experienceTwo.question_two.items"];
                        let imgs = [Curio, Epargne, Accom, Irpp, Tax, Isf, Autre];
                        let imgBlues = [CurioBlue, EpargneBlue, AccomBlue, IrppBlue, TaxBlue, IsfBlue, AutreBlue];
                        for (let i = 0; i < 7; i++) {
                            rows.push(<Col xs={12} sm={6} key={i}>
                                <Button active={this.props.experienceControl.object[i]}
                                        onClick={this.onChangeObject.bind(this, i)}>
                                    <Image className="blueImg" src={imgs[i]}/>
                                    <Image className="whiteImg" src={imgBlues[i]}/>
                                    <span>{content[i]}</span>
                                </Button>
                            </Col>);
                        }
                        return (<Row className="checkListOne checkListTwo">{rows}</Row>);
                    })()
                }

                {/*Question 3*/}
                <FormattedMessage id="experienceTwo.question_three">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                {
                    (() => {
                        let rows = [];
                        let content = lang["experienceTwo.question_three.items"];
                        let imgs = [Irpp, Tax, Pea, Via, Isf, Aucune];
                        let imgBlues = [IrppBlue, TaxBlue, PeaBlue, ViaBlue, IsfBlue, AucuneBlue];
                        for (let i = 0; i < 6; i++) {
                            rows.push(<Col xs={12} sm={6} key={i}>
                                <Button active={this.props.experienceControl.option[i]}
                                        onClick={this.onChangeOption.bind(this, i)}>
                                    <Image className="blueImg" src={imgs[i]}/>
                                    <Image className="whiteImg" src={imgBlues[i]}/>
                                    <span>{content[i]}</span>
                                </Button>
                            </Col>);
                        }
                        return (<Row className="checkListOne checkListThree">{rows}</Row>);
                    })()
                }


                {/*Question 4*/}
                <FormattedMessage id="experienceTwo.question_four">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                {
                    (() => {
                        let content = lang["experienceTwo.question_four.items"];
                        let value = ["<1000", "1000to5000", "5000to10000", ">10000"];
                        let result = [];
                        for (let i = 0; i < 4; i++) {
                            result.push(<RadioButton key={value[i]} value={value[i]}>{content[i]}</RadioButton>);
                        }
                        return (<RadioGroup className="firstQuestion" size="large"
                                            onChange={this.onChangeInvCetteAnnee.bind(this)}
                                            value={this.props.user.montantInvCetteAnnee}>{result}</RadioGroup>)
                    })()
                }
            </div>
        )
    }
}

export default connect((store) => {
    return {
        user: store.userProfile.user,
        experienceControl: store.userProfile.experienceControl,
    }
})(ExperienceTwo);
