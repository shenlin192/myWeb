/**
 * Created by haowen 2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';

//css
import './experienceOne.css';

//bootstrap
import {Row, Col, Button, Image} from 'react-bootstrap'

//media
import One from './media/1.svg';
import Two from './media/2.svg';
import Three from './media/3.svg';
import Four from './media/4.svg';
import Five from './media/5.svg';
import OneBlue from './media/1Blue.svg';
import TwoBlue from './media/2Blue.svg';
import ThreeBlue from './media/3Blue.svg';
import FourBlue from './media/4Blue.svg';
import FiveBlue from './media/5Blue.svg';

//global
import {lang} from '../../../../global'

//redux
import {connect} from "react-redux";
import {
    changeType, changeRevenu, changeFontInvest, changePatrimoine, changeProvenance, changeOriginesPatrimoine, changeISF
}
    from '../../../../actions/userProfileActions';

//antd
import Radio from 'antd/lib/radio';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/radio/style/css';
import 'antd/lib/checkbox/style/css';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;

class ExperienceOne extends React.Component {

    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollTop = 0
        window.scrollTo(0, 0)
    }

    // 1 type_investisseur
    onChangeType(e) {
        this.props.dispatch(changeType(e.target.value));
    }

    // 2 net_annual_income
    onChangeRevenu(e) {
        this.props.dispatch(changeRevenu(e.target.value));
    }

    // 3 provenance_revenu
    onChangeProvenance(num) {
        let array = this.props.experienceControl.situation;
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
        this.props.dispatch(changeProvenance({array, answer}, this.props.userId));
    }

    // 4 patrimoine
    onChangePatrimoine(e) {
        this.props.dispatch(changePatrimoine(e.target.value));
    }

    // 5 fond_invest
    onChangeFontInvest(e) {
        this.props.dispatch(changeFontInvest(e.target.value, this.props.userId));
    }

    // 6 origines_patrimoine
    onChangeOriginesPatrimoine(checkedValues) {
        this.props.dispatch(changeOriginesPatrimoine(checkedValues, this.props.userId));
    }

    // 7 isf
    onChangeISF(e) {
        this.props.dispatch(changeISF(e.target.value, this.props.userId));
    }


    render() {

        return (
            <div className="experienceOne" style={{marginBottom: '45px'}}>
                {/*Question 1*/}
                <FormattedMessage id="experienceOne.question_one">
                    {(message) =>
                        <h2 className="section-title3" style={{marginTop: '0px'}}>{message}</h2>}
                </FormattedMessage>

                <div>
                    <RadioGroup className="firstQuestion" size="large" onChange={this.onChangeType.bind(this)}
                                value={this.props.user.type_investisseur}>
                        <FormattedMessage id="experienceOne.question_one_r1">
                            {(message) =>
                                <RadioButton value="Particulier">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceOne.question_one_r2">
                            {(message) =>
                                <RadioButton className="group" value="Groupe/Club">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceOne.question_one_r3">
                            {(message) =>
                                <RadioButton value="Société">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceOne.question_one_r4">
                            {(message) =>
                                <RadioButton value="Autres">{message}</RadioButton>}
                        </FormattedMessage>
                    </RadioGroup>
                </div>


                {/*Question 2*/}
                <FormattedMessage id="experienceOne.question_two">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                <div>
                    <RadioGroup className="firstQuestion" size="large" onChange={this.onChangeRevenu.bind(this)}
                                value={this.props.user.net_annual_income}>
                        <FormattedMessage id="experienceOne.question_two_r1">
                            {(message) =>
                                <RadioButton value="0,50">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceOne.question_two_r2">
                            {(message) =>
                                <RadioButton value="50,100">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceOne.question_two_r3">
                            {(message) =>
                                <RadioButton value="100,300">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceOne.question_two_r4">
                            {(message) =>
                                <RadioButton value="300,+">{message}</RadioButton>}
                        </FormattedMessage>
                    </RadioGroup>
                </div>


                {/*Question 3*/}
                <FormattedMessage id="experienceOne.question_three">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>

                {
                    (() => {
                        let rows = [];
                        let content = lang["experienceOne.question_three.items"];
                        let imgs = [One, Two, Three, Four, Five];
                        let imgBlues = [OneBlue, TwoBlue, ThreeBlue, FourBlue, FiveBlue];
                        for (let i = 0; i < 5; i++) {
                            rows.push(<Col xs={12} sm={6} key={i}>
                                <Button active={this.props.experienceControl.situation[i]}
                                        onClick={this.onChangeProvenance.bind(this, i)}>
                                    <Image className="blueImg" src={imgs[i]}/>
                                    <Image className="whiteImg" src={imgBlues[i]}/>
                                    {content[i]}
                                </Button>
                            </Col>);
                        }
                        return (<Row className="checkListOne">{rows}</Row>);
                    })()
                }


                {/*Question 4*/}
                <FormattedMessage id="experienceOne.question_four">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                <RadioGroup className="firstQuestion" size="large" onChange={this.onChangePatrimoine.bind(this)}
                            value={this.props.user.patrimoine}>
                    <FormattedMessage id="experienceOne.question_four_r1">
                        {(message) =>
                            <RadioButton value="0,200">{message}</RadioButton>}
                    </FormattedMessage>
                    <FormattedMessage id="experienceOne.question_four_r2">
                        {(message) =>
                            <RadioButton value="200,500">{message}</RadioButton>}
                    </FormattedMessage>
                    <FormattedMessage id="experienceOne.question_four_r3">
                        {(message) =>
                            <RadioButton value="500,1000">{message}</RadioButton>}
                    </FormattedMessage>
                    <FormattedMessage id="experienceOne.question_four_r4">
                        {(message) =>
                            <RadioButton value="1000,+">{message}</RadioButton>}
                    </FormattedMessage>
                </RadioGroup>

                {/*Question 5*/}
                <FormattedMessage id="experienceOne.question_five">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                <div>
                    <RadioGroup size="large" onChange={this.onChangeFontInvest.bind(this)}
                                value={this.props.user.fond_invest}>
                        <FormattedMessage id="experienceOne.r_no">
                            {(message) =>
                                <RadioButton value="non">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceOne.r_yes">
                            {(message) =>
                                <RadioButton value="oui">{message}</RadioButton>}
                        </FormattedMessage>
                    </RadioGroup>
                </div>


                {/*Question 6*/}
                <FormattedMessage id="experienceOne.question_six">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                <CheckboxGroup className="checkListTwo" onChange={this.onChangeOriginesPatrimoine.bind(this)}
                               value={this.props.user.origines_patrimoine.split(',')}>
                    <FormattedMessage id="experienceOne.question_six_r1">
                        {(message) =>
                            <Checkbox value="1">{message}</Checkbox>}
                    </FormattedMessage>
                    <FormattedMessage id="experienceOne.question_six_r2">
                        {(message) =>
                            <Checkbox value="2">{message}</Checkbox>}
                    </FormattedMessage>
                    <FormattedMessage id="experienceOne.question_six_r3">
                        {(message) =>
                            <Checkbox value="3">{message}</Checkbox>}
                    </FormattedMessage>
                    <FormattedMessage id="experienceOne.question_six_r4">
                        {(message) =>
                            <Checkbox value="4">{message}</Checkbox>}
                    </FormattedMessage>
                    <FormattedMessage id="experienceOne.question_six_r5">
                        {(message) =>
                            <Checkbox value="5">{message}</Checkbox>}
                    </FormattedMessage>
                    <FormattedMessage id="experienceOne.question_six_r6">
                        {(message) =>
                            <Checkbox value="6">{message}</Checkbox>}
                    </FormattedMessage>
                </CheckboxGroup>


                {/*Question 7*/}
                <FormattedMessage id="experienceOne.question_seven">
                    {(message) =>
                        <h2 className="section-title3">{message}</h2>}
                </FormattedMessage>
                <div>
                    <RadioGroup size="large" onChange={this.onChangeISF.bind(this)} value={this.props.user.isf}>
                        <FormattedMessage id="experienceOne.r_no">
                            {(message) =>
                                <RadioButton value="non">{message}</RadioButton>}
                        </FormattedMessage>
                        <FormattedMessage id="experienceOne.r_yes">
                            {(message) =>
                                <RadioButton value="oui">{message}</RadioButton>}
                        </FormattedMessage>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        modifyMode: store.userProfile.modifyMode,
        user: store.userProfile.user,
        experienceControl: store.userProfile.experienceControl,
        userId: store.userProfile.user.id,
    }
})(ExperienceOne);
