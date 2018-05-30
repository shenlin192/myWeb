import React from 'react';
import {FormattedMessage} from 'react-intl';

import {setShowDocsResa} from '../../actions/resaAction';

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


class ReservationTable extends React.Component {

    showDocsResa(id) {
        this.props.dispatch(setShowDocsResa(id))
    }

    showProject() {

        const subtitleStyle = {
            borderRight: "1px solid rgba(40, 30, 29, 0.35)",
            height: "45px"
        }

        if (this.props.resasBackup.length > 0) {
            const tableResa = this.props.resasBackup.map((resa) =>
                <div key={resa.id}>
                    <Row type="flex" align="middle" className="proj">
                        <Col className="gutter-row" span={3}>
                            <div className="gutter-box"
                                 style={{
                                     height: "78px",
                                     backgroundImage: `url('${resa.project.image}'), url('${fallback_background}')`,
                                     backgroundSize: "cover"
                                 }}>
                            </div>
                        </Col>

                        <Col className="gutter-row" span={4} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>{resa.project.project_name}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>{addSpace(resa.project.total_amount_requested)}€</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={3} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>
                                    {(resa.date_investment > 0) ? resa.date_investment : 0} j
                                </p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={5} style={subtitleStyle}>
                            <div className="gutter-box">
                                <p>{addSpace(resa.project.supporter_collection)}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={3}>
                            <div className="gutter-box">
                                <p>{(() => {
                                    let present = Number(resa.amount) / resa.project.total_amount_requested;
                                    if (present > 1) {
                                        return 100
                                    } else {
                                        return (present * 100).toFixed(2)
                                    }
                                })()}%</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={1} offset={1}>
                            <div className="gutter-box">
                                <Button onClick={this.showDocsResa.bind(this, resa.id)}
                                        className={(resa.showDocs) ? "class_hidden_important" : "class_show"}>
                                    <Icon type="down"
                                          className={(resa.showDocs) ? "class_hidden_important" : "class_show"}/>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {(() => {
                            if (resa.showDocs) {
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
                                                    const documents = resa.project.documents.map((document, index) => {
                                                        return (
                                                            <Col sm={8} key={index}
                                                                 style={{textAlign: "center", marginTop: "20px"}}>
                                                                <a href={`/dashboard/telecharge/?name=${document.name}&path=${document.path}`}
                                                                   target="_blank"  tabIndex="-1">
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
                                                if (resa.project.documents.length > 0) {
                                                    return (
                                                        <Col sm={8}>
                                                            <FormattedMessage id="investTable.descibe1">
                                                                {(message) =>
                                                                    <p style={{}}>{message}</p>}
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
                                                <Button onClick={this.showDocsResa.bind(this, resa.id)}>
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
            return tableResa
        } else {
            return (<FormattedMessage id="reservationTable.th6">
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
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <FormattedMessage id="investTable.th2">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <div className="gutter-box">
                            <FormattedMessage id="reservationTable.th3">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                            <FormattedMessage id="reservationTable.th4">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <div className="gutter-box">
                            <FormattedMessage id="reservationTable.th5">
                                {(message) =>
                                    <p>{message}</p>}
                            </FormattedMessage>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={2}>
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
        resasBackup: store.resa.projectsBackup
    }
})(ReservationTable);