import React from 'react';
import {FormattedMessage} from 'react-intl';

import {setShowDocsInv} from '../../actions/investmentActions';

//css
import './tableShow.css';


//antd
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

//redux
import {connect} from "react-redux";

//global
import {serverName, addSpace} from '../../global'
import fallback_background from '../tableau/media/fallback_background.jpg'

class InvestTable extends React.Component {

    showDocs(id) {
        this.props.dispatch(setShowDocsInv(id))
    }

    showProject() {

        const subtitleStyle = {
            borderRight: "1px solid rgba(40, 30, 29, 0.35)",
            height: "45px"
        };

        if (this.props.investmentsBackup.length > 0) {
            const tableInvest = this.props.investmentsBackup.map((investment) =>
                <div key={investment.id}>
                    <Row type="flex" align="middle" className="proj">
                        <Col className="gutter-row" span={3}>
                            <div className="gutter-box"
                                 style={{
                                     height: "78px",
                                     backgroundImage: `url('${investment.project.image}'), url('${fallback_background}')`,
                                     backgroundSize: "cover"
                                 }}>
                            </div>
                        </Col>

                        <Col className="gutter-row" span={4} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>{investment.project.project_name}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={3} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>{addSpace(investment.amount)}€</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>
                                    {(() => {
                                        let date = new Date(`${investment.date_investment}`);
                                        return `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`
                                    })()}
                                </p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>{addSpace(investment.project.valorisation)}€</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={3} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>{investment.project.montage}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={2}>
                            <div className="gutter-box">
                                <p>{(() => {
                                    let present = Number(investment.amount) / investment.project.total_amount_requested;
                                    if (present > 1) {
                                        return 100
                                    } else {
                                        return (present * 100).toFixed(2)
                                    }
                                })()}%
                                </p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={1}>
                            <div className="gutter-box">
                                <Button onClick={this.showDocs.bind(this, investment.project.project_id)}
                                        className={(investment.showDocs) ? "class_hidden_important" : "class_show"}>
                                    <Icon type="down"
                                          className={(investment.showDocs) ? "class_hidden_important" : "class_show"}/>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {(() => {
                            if (investment.showDocs) {
                                return (
                                    <div className="doc">
                                        <Row>
                                            <Col sm={{span: 21, offset: 3}}>
                                                <FormattedMessage id="investTable.title">
                                                    {(message) =>
                                                        <p style={{
                                                            color: "rgba(40, 30, 29, 0.5",
                                                            fontSize: "14px",
                                                            fontWeight: "600"
                                                        }}>{message}</p>}
                                                </FormattedMessage>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle">
                                            <Col sm={{span: 12, offset: 2}}>
                                                {(() => {
                                                    const documents = investment.project.documents.map((document, index) => {
                                                        return (
                                                            <Col sm={8} key={index}
                                                                 style={{textAlign: "center", marginTop: "20px"}}>
                                                                <a href={`/dashboard/telecharge/?name=${document.name}&path=${document.path}`} target="_blank" tabIndex="-1">
                                                                    <Icon type="file-text" style={{
                                                                        fontSize: "35px",
                                                                        width: "36px",
                                                                        height: "43px",
                                                                        display: "block",
                                                                        marginLeft: "auto",
                                                                        marginRight: "auto"
                                                                    }}/>
                                                                    {document.name}
                                                                </a>
                                                            </Col>
                                                        )
                                                    })
                                                    return documents
                                                })()}
                                            </Col>
                                            {(() => {
                                                const documentStyle = {
                                                    whiteSpace: "pre-line",
                                                    color: "rgba(40, 30, 29, 0.5",
                                                    textAlign: "center",
                                                    fontWeight: "500"
                                                }

                                                if (investment.project.documents.length > 0) {
                                                    return (
                                                        <Col sm={8}>
                                                            <FormattedMessage id="investTable.descibe1">
                                                                {(message) =>
                                                                    <p style={documentStyle}>{message}</p>}
                                                            </FormattedMessage>
                                                            <FormattedMessage id="investTable.descibe2">
                                                                {(message) =>
                                                                    <p style={documentStyle}>{message}</p>}
                                                            </FormattedMessage>
                                                        </Col>
                                                    )
                                                } else {
                                                    return (
                                                        <Col sm={8}>
                                                            <FormattedMessage id="investTable.descibe3">
                                                                {(message) =>
                                                                    <p style={documentStyle}>{message}</p>}
                                                            </FormattedMessage>
                                                            <FormattedMessage id="investTable.descibe4">
                                                                {(message) =>
                                                                    <p style={documentStyle}>{message}</p>}
                                                            </FormattedMessage>
                                                        </Col>
                                                    )
                                                }
                                            })()}
                                            <Col sm={{span: 1, offset: 1}}>
                                                <Button
                                                    onClick={this.showDocs.bind(this, investment.project.project_id)}>
                                                    <Icon type="up"/>
                                                </Button>
                                            </Col>
                                        </Row>

                                    </div>
                                )
                            } else {
                                return null
                            }
                        })()}
                    </Row>
                </div>
            )
            return tableInvest
        } else {
            return (<FormattedMessage id="investTable.descibe5">
                {(message) =>
                    <p>{message}</p>}
            </FormattedMessage>)

        }

    }

    render() {

        const boxStyle = {
            position: 'fix',
            top: '83px',
            background: 'transparent',
            marginTop: '25px',
        };

        return (
            <div className="tableContent" style={boxStyle}>
                <Row id="title" type="flex" justify="space-between" align="middle">
                    <Col className="gutter-row" span={3}>
                        <div className="gutter-box"
                             style={{borderRight: "1px solid rgba(40, 30, 29, 0.35)", height: "40px"}}>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <FormattedMessage id="investTable.th1">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={2}>
                        <div className="gutter-box">
                            <FormattedMessage id="investTable.th2">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <FormattedMessage id="investTable.th3">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                            <FormattedMessage id="investTable.th4">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <div className="gutter-box">
                            <FormattedMessage id="investTable.th5">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={2}>
                        <div className="gutter-box">
                            <FormattedMessage id="investTable.th6">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={1}>
                        <div className="gutter-box">

                        </div>
                    </Col>
                </Row>

                {(this.showProject.bind(this))()}

            </div>
        )
    }
}

export default connect((store) => {
    return {
        investmentsBackup: store.investments.investmentsBackup
    }
})(InvestTable);