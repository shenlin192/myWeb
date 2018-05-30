import React from 'react';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl';

//css
import './experience.css';

//antd
import Progress from 'antd/lib/progress';
import {setThridNub} from "../../../actions/userProfileActions"


//redux
import {connect} from "react-redux";


class Experience extends React.Component {


    componentDidMount() {
        this.props.dispatch(setThridNub(this.progress(2)));
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
        this.props.dispatch(setThridNub(this.progress(2)));
    }

    progress(type) {
        let result = [
            this.props.type_investisseur,
            this.props.net_annual_income,
            this.props.provenance_revenu,
            this.props.patrimoine,
            this.props.fond_invest,
            this.props.origines_patrimoine,
            this.props.isf,


            this.props.secteurAct,
            this.props.motivInv,
            this.props.defiscalisation,
            this.props.montantInvCetteAnnee,

            this.props.expInv,
            this.props.dureeInv,
            this.props.montantInvFinancier
        ];

        if (type === 0) {
            let length = 0;
            for (let i = 0; i < result.length; i++) {
                if ((typeof result[i] === "string" && result[i] !== "" && result[i] !== "NULL") || (typeof result[i] === "number")) {
                    length = length + 1;
                }
            }
            return parseInt((length / 14 * 100), 10);
        }
        else if (type === 1) {
            let length = 1;
            for (let i = 0; i < result.length; i++) {
                if ((typeof result[i] === "string" && result[i] !== "" && result[i] !== "NULL") || (typeof result[i] === "number")) {
                    length = length + 2;
                }
            }
            return parseInt((length / 29 * 100), 10);
        }
        else if (type === 2) {
            let length = 0;
            for (let i = 0; i < result.length; i++) {
                if ((typeof result[i] === "string" && result[i] !== "" && result[i] !== "NULL") || (typeof result[i] === "number")) {
                    length = length + 1;
                }
            }
            return length
        }
    };


    render() {

        const completerButton = {
            color: '#405A65',
            fontSize: '14px',
            fontWeight: '400',
            border: '2px solid #B7D9EE',
            width: '220px',
            borderRadius: '5px',
            marginRight: '0px',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '15px',
            paddingRight: '15px',
            textDecoration: 'none',
        };


        return (
            <div className="experience bigDiv">
                <FormattedMessage id="experience.votre_experience">
                    {(message) =>
                        <h2 className="section-title2">{message}</h2>}
                </FormattedMessage>

                <FormattedMessage id="COMPLETE">
                    {(message) =>
                        <p className="progress-title">
                            {message} {(this.progress.bind(this, 0))()}%</p>}
                </FormattedMessage>

                <Progress percent={(this.progress.bind(this, 1))()} status="active" showInfo={false} strokeWidth={12}
                          className="progress-exp"/>

                <FormattedMessage id="experience.determinez_votre_profil">
                    {(message) =>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            color: '#405A65',
                            marginBottom: '25px'
                        }}>{message}</p>}
                </FormattedMessage>
                {/* hide if all questions are finished */}
                <div style={{textAlign: 'right', marginTop: '25px', marginBottom: '25px'}}
                     className={(this.progress.bind(this, 2)() === 14) ? "class_hidden" : "class_show_block"}>
                    <FormattedMessage id="experience.renseigner_votre_profil">
                        {(message) =>
                            <Link to="/profile/experienceStep" style={completerButton}>{message}</Link>}
                    </FormattedMessage>
                </div>
                {/* show if all questions are finished */}
                <div style={{marginTop: '25px', fontSize: '14px', fontWeight: '500', color: '#405A65'}}
                     className={(this.progress.bind(this, 2)() === 14) ? "class_show" : "class_hidden"}>
                    <FormattedMessage id="experience.contact_us">
                        {(message) =>
                            <p>{message}</p>}
                    </FormattedMessage>
                </div>
            </div>
        )
    }
}

export default connect((store) => {
    return {
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
    }
})(Experience);