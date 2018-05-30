/**
 * Created by shenlin on 6/21/17.
 */
import React from 'react';
import ReactHighcharts from 'react-highcharts';
import {FormattedMessage} from 'react-intl';


//redux
import {connect} from "react-redux";

//action
import {fetchInvestment} from "../../actions/investmentActions"


var config = {
    chart: {
        plotShadow: false,
    },
    title: {
        text: ' ',
    },
    credits: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },

    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                softConnector: false,
                enabled: true,
                distance: 40,
                style: {
                    color: '#3f5b67',
                    opacity: 0.85,
                    fontSize: '14px',
                }
            },
            startAngle: -180,
            endAngle: 180,
            center: ['50%', '50%']
        }
    },

    series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '60%',
        showInLegend: true,
        data: []
    }]
};

class Repartition extends React.Component {

    componentWillMount() {
        if (!this.props.fetched) {
            this.props.dispatch(fetchInvestment());
        }
    }

    testFunction() {
        if (this.props.fetched) {
            let data = [];
            this.props.investments.forEach((element) => {
                data.push([element.project.project_name, Number(element.amount)])
            });
            config.series[0].data = data
            return (
                <div className="bigDiv">
                    <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
                </div>
            )
        } else {
            return
            <FormattedMessage id="repartition.loading">
                {(message) =>
                    <div>{message}</div>}
            </FormattedMessage>
        }
    }

    render() {
        return (
            <div>
                <FormattedMessage id="repartition.title">
                    {(message) =>
                        <h2 className="section-title">{message}</h2>}
                </FormattedMessage>
                {(() => {
                    if (this.props.investments.length > 0) {
                        return this.testFunction()
                    } else {
                        return (
                            <FormattedMessage id="repartition.warning">
                                {(message) =>
                                    <div>{message}</div>}
                            </FormattedMessage>
                        )
                    }
                })()}

            </div>
        )
    }
}


export default connect((store) => {
    return {
        investments: store.investments.investments,
        fetched: store.investments.fetched,
    }
})(Repartition);