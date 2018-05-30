/**
 * Created by haowen 2017.
 */

import React from 'react';

//css
import './confirmAll.css';

//redux
import {connect} from "react-redux";
import {changeCheckCondition} from '../../../../actions/userProfileActions';

//antd
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/css';
const CheckboxGroup = Checkbox.Group;


class ConfirmAll extends React.Component {

    checkCondition(checkedValues) {
        this.props.dispatch(changeCheckCondition(checkedValues));
    }

    render() {

        return (
            <CheckboxGroup value={this.props.confirmValue} onChange={this.checkCondition.bind(this)}>
                <Checkbox value="1">Je reconnais être conscient des risques de perte en capital totale ou partielle et
                    du risque de manque de liquidité que comportent ce type d'investissement.</Checkbox>
                <Checkbox value="2">J'ai bien été informe que l'investissement projeté représente un risque de perte en
                    capital pouvant aller jusqu'à sa totalité et un risque de liquidité qui ne permettra pas toujours de
                    céder ces instruments financiers au moment souhaité.</Checkbox>
                <Checkbox value="3">Je suis prêt à patienter plus de cinq années avant de récupérer tout ou partie de
                    mon investissement final.</Checkbox>
                <Checkbox value="4">Le montant de l'investissement que je projette de réaliser représente moins de 10%
                    de mon partrimoine total.</Checkbox>
            </CheckboxGroup>
        )
    }
}

export default connect((store) => {
    return {
        confirmValue: store.userProfile.experienceControl.confirmValue,
        userId: store.userProfile.user.basicInfo.userId
    }
})(ConfirmAll)