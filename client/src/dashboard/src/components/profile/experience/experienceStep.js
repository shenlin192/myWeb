import React from 'react';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl';
import iziToast from 'izitoast'

//redux
import {connect} from "react-redux";
import {sendConfirmAll, sendAllData} from "../../../actions/userProfileActions"

//css
import './experienceStep.css';

// Components
import ExperienceOne from './experienceOne/experienceOne'
import ExperienceTwo from './experienceTwo/experienceTwo'
import ExperienceThree from './experienceThree/experienceThree'
import ConfirmAll from './experienceThree/confirmAll'

//antd
import Steps from 'antd/lib/steps';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';

//global
import {lang} from '../../../global';

const Step = Steps.Step;

const steps = [{
    title: 'First',
    content: <ExperienceOne/>,
    icon: <Icon type="line-chart"/>,

}, {
    title: 'Second',
    content: <ExperienceTwo/>,
    icon: <Icon type="heart-o"/>,
}, {
    title: 'Last',
    content: <ExperienceThree/>,
    icon: <Icon type="book"/>,
}];


class ExperienceStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    next() {
        const current = this.state.current + 1;
        this.setState({current});
        window.scrollTo(0, 0);
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
        window.scrollTo(0, 0);
    }

    checkAllFilled(){
        let flag = true;

        let inputs = [this.props.type_investisseur, this.props.net_annual_income, this.props.provenance_revenu,
            this.props.patrimoine,this.props.fond_invest,this.props.origines_patrimoine, this.props.isf,
            this.props.secteurAct, this.props.motivInv, this.props.defiscalisation,
            this.props.montantInvCetteAnnee, this.props.expInv, this.props.dureeInv, this.props.montantInvFinancier
        ];

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i] == null || inputs[i] == "" || inputs[i] === "non rempli" || inputs[i] === "NULL") {
                flag = false;
                break;
            }
        }
        return flag;
    }

    confirmAll() {
        if (this.checkAllFilled()) {
            this.props.dispatch(sendConfirmAll());
        } else {
            let content = lang["experienceStep.not_finish"];
            iziToast.error({
                title: 'Error',
                message: content,
                messageSize: '20px',
                messageLineHeight: '24px',
                position: 'topCenter',
                timeout: 5000,
            });
        }
    }

    sendAll(type) {
        this.props.dispatch(sendAllData(this.props.user, this.props.userId, type, this.props.kyc));
    }

    render() {
        const {current} = this.state;

        return (
            <div className="bigDiv" id="experience-container">
                <div style={{textAlign: 'right'}}>
                    <div className="save ant-btn" onClick={this.sendAll.bind(this)}>
                        {/* Enregistrer et quitterr */}
                        {
                            (()=>{
                                if(this.checkAllFilled()){

                                }else{
                                    return (
                                        <FormattedMessage id="experienceStep.enregistrer_et_quitter">
                                            {(message) =>
                                                <Link to="/profile">
                                                    {message}
                                                </Link>
                                            }
                                        </FormattedMessage>
                                    )
                                }
                            })()
                        }

                    </div>
                </div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} icon={item.icon}/>)}
                </Steps>
                <div className="steps-title">
                    {
                        this.state.current === 0
                        &&
                        <FormattedMessage id="experienceStep.situation_financiere">
                            {(message) =>
                                <p className="title1">{message}</p>}
                        </FormattedMessage>
                    }
                    {
                        this.state.current === 1
                        &&
                        <FormattedMessage id="experienceStep.prefrence_investissement">
                            {(message) =>
                                <p className="title2">{message}</p>}
                        </FormattedMessage>
                    }
                    {
                        this.state.current === 2
                        &&
                        <FormattedMessage id="experienceStep.experience_investissement">
                            {(message) =>
                                <p className="title3">{message}</p>}
                        </FormattedMessage>
                    }
                </div>
                <div className="steps-content">
                    {steps[this.state.current].content}
                </div>
                <div className="steps-action clearfix">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <FormattedMessage id="experienceStep.next">
                            {(message) =>
                                <Button type="primary" onClick={() => this.next()}>{message}</Button>}
                        </FormattedMessage>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <FormattedMessage id="experienceStep.finish">
                            {(message) =>
                                <Button type="primary" onClick={this.confirmAll.bind(this)}>
                                    {message}
                                </Button>}
                        </FormattedMessage>
                    }
                    {
                        this.state.current > 0
                        &&
                        <FormattedMessage id="experienceStep.return">
                            {(message) =>
                                <Button className="retour" onClick={() => this.prev()}>
                                    <Icon type="left"
                                          style={{display: "table-cell", fontSize: "30px", fontWeight: "700"}}/>
                                    <p style={{display: "table-cell", verticalAlign: "middle"}}>{message}</p>
                                </Button>}
                        </FormattedMessage>
                    }
                </div>
                <Modal
                    title="ACCEPTER LES RISQUES"
                    wrapClassName="confirmation"
                    key={this.state.newKey}
                    visible={this.props.showConfirmation}
                    closable={false}
                    maskClosable={false}
                    onOk={this.sendAll.bind(this, "terminate")}
                    onCancel={this.confirmAll.bind(this)}
                    footer={[
                        <FormattedMessage id="experienceStep.cancel">
                            {(message) =>
                                <Button key="back" size="large" onClick={this.confirmAll.bind(this)}>
                                    {message}
                                </Button>}
                        </FormattedMessage>
                        ,
                        <FormattedMessage id="experienceStep.validate">
                            {(message) =>
                                <Button key="submit" type="primary" size="large"
                                        onClick={this.sendAll.bind(this, "terminate")}
                                        disabled={(this.props.confirmValue.length === 4) ? (false) : (true)}>
                                    <Link to="/profile">{message}</Link>
                                    {/* Valider */}
                                </Button>}
                        </FormattedMessage>
                        ,
                    ]}
                >
                    <ConfirmAll/>
                </Modal>
            </div>
        );
    }
}


export default connect((store) => {
    return {
        thirdNub: store.userProfile.thirdNub,
        user: store.userProfile.user,
        userId: store.userProfile.user.id,
        confirmValue: store.userProfile.experienceControl.confirmValue,
        showConfirmation: store.userProfile.experienceControl.showConfirmation,
        modifyMode: store.userProfile.modifyMode,
        type_investisseur: store.userProfile.user.type_investisseur,
        net_annual_income: store.userProfile.user.net_annual_income,
        provenance_revenu: store.userProfile.user.provenance_revenu,
        patrimoine: store.userProfile.user.patrimoine,
        origines_patrimoine: store.userProfile.user.origines_patrimoine,
        isf: store.userProfile.user.isf,
        fond_invest: store.userProfile.user.fond_invest,
        secteurAct: store.userProfile.user.secteurAct,
        motivInv: store.userProfile.user.motivInv,
        defiscalisation: store.userProfile.user.defiscalisation,
        montantInvCetteAnnee: store.userProfile.user.montantInvCetteAnnee,
        expInv: store.userProfile.user.expInv,
        dureeInv: store.userProfile.user.dureeInv,
        montantInvFinancier: store.userProfile.user.montantInvFinancier,
        kyc: store.userProfile.user.kyc,
    }
})(ExperienceStep);