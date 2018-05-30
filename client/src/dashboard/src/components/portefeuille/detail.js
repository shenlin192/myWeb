/**
 * Created by shenlin on 6/20/17.
 */
import React from 'react';
import {connect} from "react-redux";
import {FormattedMessage} from 'react-intl';

//components
import InvestTable from './investTable';
import ReservationTable from "./reservationTable";
import Slider from "./slider";

//style
import "./detail.css"

//global
import {lang} from '../../global'

//antd
import Switch from 'antd/lib/switch';

//action
import {onChangeState} from '../../actions/investmentActions';

class Detail extends React.Component {


    changeState() {
        this.props.dispatch(onChangeState());
    }


    render() {
        return (

            <div className="invest-detail">


                {/*<h2 className="section-title">Mes Investment</h2>*/}

                <FormattedMessage id="investDetail.title1">
                    {(message) =>
                        <h2 className={!this.props.showInvestment ? "class_hidden" : "class_show section-title"}
                            id="investissement">
                            {message}
                        </h2>}
                </FormattedMessage>
                <FormattedMessage id="investDetail.title2">
                    {(message) =>
                        <h2 className={this.props.showInvestment ? "class_hidden" : "class_show section-title"}
                            id="reservation">
                            {message}
                        </h2>}
                </FormattedMessage>

                <Switch checkedChildren={lang["investDetail.switch"][0]}
                        unCheckedChildren={lang["investDetail.switch"][1]}
                        defaultChecked={true}
                        onChange={this.changeState.bind(this)}
                        style={{marginLeft: "20px", marginTop: "-5px", display: "inline-block"}}/>

                <div className={!this.props.showInvestment ? "class_hidden" : "class_show hidden-xs hidden-sm hidden-md"}>
                    <InvestTable/>
                </div>

                <div className={this.props.showInvestment ? "class_hidden" : "class_show hidden-xs hidden-sm hidden-md"}>
                    <ReservationTable/>
                </div>

                <div className="visible-xs visible-sm visible-md">
                    <Slider/>
                </div>

            </div>
        )
    }
}


export default connect((store) => {
    return {
        investments: store.investments.investments,
        showInvestment: store.investments.showInvestment,
    }
})(Detail);