/**
 * Created by shenlin on 6/20/17.
 */
import React from 'react';
import {connect} from "react-redux";
import {FormattedMessage} from 'react-intl';

//components
import Detail from './detail';

//style
import './investmentAndResa.css'

//antd
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';

//global
import {lang} from '../../global';

// actions
import {
    setSelectLocation, setSelectDomain, setSelectName,
    initializeInvestements, filterByNameInv, filterByLocationInv, filterByDomainInv,
    initializeResa, filterByLocationResa, filterByDomainResa, filterByNameResa

} from '../../actions/selectActions'

const Option = Select.Option;

class InvestmentAndResa extends React.Component {

    selectLocation(value) {
        this.props.dispatch(setSelectLocation(value));
    }

    selectActivate(value) {
        this.props.dispatch(setSelectDomain(value));
    }

    selectName(value) {
        this.props.dispatch(setSelectName(value));
    }

    searchProjects() {
        if (this.props.showInvestment) {
            this.props.dispatch(initializeInvestements());
            this.props.dispatch(filterByLocationInv(this.props.selectedLocation));
            this.props.dispatch(filterByDomainInv(this.props.selectedDomain));
            this.props.dispatch(filterByNameInv(this.props.selectedName));
        } else {
            this.props.dispatch(initializeResa());
            this.props.dispatch(filterByLocationResa(this.props.selectedLocation));
            this.props.dispatch(filterByDomainResa(this.props.selectedDomain));
            this.props.dispatch(filterByNameResa(this.props.selectedName));
        }
    }


    optionGenerator(type) {
        let list = [];

        if (this.props.showInvestment) {
            this.props.investments.forEach((investment) => {
                if (type === 1) {
                    list.push(investment.project.adresse_societe);
                } else if (type === 2) {
                    list.push(investment.project.activity_domain);
                } else if (type === 3) {
                    list.push(investment.project.project_name);
                }
            });

        } else {
            this.props.projectsResa.forEach((resa) => {
                if (type === 1) {
                    list.push(resa.project.adresse_societe);
                } else if (type === 2) {
                    list.push(resa.project.activity_domain);
                } else if (type === 3) {
                    list.push(resa.project.project_name);
                }
            });
        }

        // delete redundancy
        list = list.filter(function (item, pos) {
            return list.indexOf(item) == pos;
        });

        // construct options
        const optionItems = list.map((e) =>
            <Option value={e} key={e}>
                {e}
            </Option>
        );
        return optionItems
    }

    render() {
        return (
            <div>
                <div className="search-box">
                    <Row gutter={16}>
                        <Col className="gutter-row" xs={0} sm={7}>
                            <div className="gutter-box">
                                <FormattedMessage id="investment.label1">
                                    {(message) =>
                                        <label htmlFor="searchByLocation">{message}</label>}
                                </FormattedMessage>

                                <Select defaultValue="tous" onChange={this.selectLocation.bind(this)}
                                        name="searchByLocation">
                                    <Option value="tous">{lang["investment.option_tous"]}</Option>
                                    {
                                        (this.optionGenerator.bind(this, 1))()
                                    }
                                </Select>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={0} sm={7}>
                            <div className="gutter-box">
                                <FormattedMessage id="investment.label2">
                                    {(message) =>
                                        <label htmlFor="searchByActivate">{message}</label>}
                                </FormattedMessage>

                                <Select defaultValue="tous" onChange={this.selectActivate.bind(this)}
                                        name="searchByActivate">
                                    <Option value="tous">{lang["investment.option_tous"]}</Option>
                                    {
                                        (this.optionGenerator.bind(this, 2))()
                                    }
                                </Select>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={0} sm={10}>
                            <div className="gutter-box">
                                <FormattedMessage id="investment.label3">
                                    {(message) =>
                                        <label htmlFor="searchByName">{message}</label>}
                                </FormattedMessage>

                                <Row>
                                    <Col sm={14} md={16}>
                                        <Select defaultValue="tous" onChange={this.selectName.bind(this)}
                                                name="searchByName">
                                            <Option value="tous">{lang["investment.option_tous"]}</Option>
                                            {
                                                (this.optionGenerator.bind(this, 3))()
                                            }
                                        </Select>
                                    </Col>
                                    <Col sm={10} md={8}>
                                        <FormattedMessage id="investment.button">
                                            {(message) =>
                                                <button onClick={this.searchProjects.bind(this)}>{message}</button>}
                                        </FormattedMessage>

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Detail/>
                </div>
            </div>
        )
    }
}


export default connect((store) => {
    return {
        investments: store.investments.investments,
        projectsResa: store.resa.projects,
        showInvestment: store.investments.showInvestment,

        //selected values
        selectedLocation: store.selectSearch.selectedLocation,
        selectedDomain: store.selectSearch.selectedDomain,
        selectedName: store.selectSearch.selectedName,
    }
})(InvestmentAndResa);