/**
 * Created by haowen 2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';

//css
import './experienceThree.css';

//bootstrap
import {Row, Col, Button, Image} from 'react-bootstrap'

//global
import {lang} from '../../../../global'

//media 
import Isf from './media/isf.svg';
import Via from './media/via.svg';
import Pea from './media/pea.svg';
import Autre from './media/autre.svg';
import Aucune from './media/aucune.svg';

import IsfBlue from './media/isfBlue.svg';
import ViaBlue from './media/viaBlue.svg';
import PeaBlue from './media/peaBlue.svg';
import AutreBlue from './media/autreBlue.svg';
import AucuneBlue from './media/aucuneBlue.svg';

//redux
import {connect} from "react-redux";
import {
    changeDuree, changeExp, changeInvFinancier
}
    from '../../../../actions/userProfileActions';

//antd
import Radio from 'antd/lib/radio';
import 'antd/lib/radio/style/css';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ExperienceThree extends React.Component {

    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollTop = 0
        window.scrollTo(0, 0)
    }

    // 1 dureeInv
    onChangeDuree(e) {
        this.props.dispatch(changeDuree(e.target.value));
    }

    // 2 expInv
    onChangeExp(num) {
        let array = this.props.experienceControl.exp;
        if (array[num] === true) {
            array[num] = false;
        } else {
            array[num] = true;
        }

        let str = [];
        for (let i = 0; i < 5; i++) {
            if (array[i] === true) {
                str.push(i);
            }
        }
        let newArray = str.sort();
        let answer = newArray.toString();
        this.props.dispatch(changeExp({array, answer}, this.props.userId));
    }

    // 3 montantInvFinancier
    onChangeInvFinancier(e) {
        this.props.dispatch(changeInvFinancier(e.target.value));
    }

    render() {

        return (
            <div className="experienceThree" style={{marginBottom: '45px'}}>
                {/*Question 1*/}
                <FormattedMessage id="experienceThree.question_one">
                    {(message) =>
                        <h2 className="section-title3" style={{marginTop: '0px'}}>{message}</h2>}
                </FormattedMessage>
                <div>
                    <RadioGroup className="firstQuestion" size="large" onChange={this.onChangeDuree.bind(this)}
                                value={this.props.user.dureeInv}>
                        <FormattedMessage id="experienceThree.question_one_r1">
                            {(message) =>
                                <RadioButton value="débutant">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceThree.question_one_r2">
                            {(message) =>
                                <RadioButton value="confirmé">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceThree.question_one_r3">
                            {(message) =>
                                <RadioButton value="expert">{message}</RadioButton>}
                        </FormattedMessage>
                    </RadioGroup>
                </div>
                {/*Question 2*/}
                <FormattedMessage id="experienceThree.question_two">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                {
                    (() => {
                        let rows = [];
                        let content = lang["experienceThree.question_two.items"];
                        let imgs = [Isf, Via, Pea, Autre, Aucune];
                        let imgBlues = [IsfBlue, ViaBlue, PeaBlue, AutreBlue, AucuneBlue];
                        for (let i = 0; i < 5; i++) {
                            rows.push(<Col xs={12} sm={6} key={i}>
                                <Button active={this.props.experienceControl.exp[i]}
                                        onClick={this.onChangeExp.bind(this, i)}>
                                    <Image className="blueImg" src={imgs[i]}/>
                                    <Image className="whiteImg" src={imgBlues[i]}/>
                                    <span>{content[i]}</span>
                                </Button>
                            </Col>);
                        }
                        return (<Row className="checkListOne">{rows}</Row>);
                    })()
                }

                {/*Question 3*/}
                <FormattedMessage id="experienceThree.question_three">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                <div>
                    <RadioGroup className="firstQuestion" size="large" onChange={this.onChangeInvFinancier.bind(this)}
                                value={this.props.user.montantInvFinancier}>
                        <FormattedMessage id="experienceThree.question_three_r1">
                            {(message) =>
                                <RadioButton value="<5000">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceThree.question_three_r2">
                            {(message) =>
                                <RadioButton value="5000to15000">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceThree.question_three_r3">
                            {(message) =>
                                <RadioButton value=">15000">{message}</RadioButton>}
                        </FormattedMessage>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        user: store.userProfile.user,
        experienceControl: store.userProfile.experienceControl,
    }
})(ExperienceThree);
