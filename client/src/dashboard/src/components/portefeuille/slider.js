/**
 * Created by shenlin on 6/20/17.
 */
import React from 'react';
import {connect} from "react-redux";
import {FormattedMessage} from 'react-intl';

//antd
import Carousel from 'antd/lib/carousel';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import {setShowDocsInvSlider, changeShowDocInvSlider} from '../../actions/investmentActions';
import {setShowDocsResaSlider, changeShowDocResaSlider} from '../../actions/resaAction';


//global
import {serverName, addSpace, lang} from '../../global'
import fallback_background from '../tableau/media/fallback_background.jpg'

//style
import './investSlider.css'


class Slider extends React.Component {


    showDocsSlider(id) {
        this.props.dispatch(setShowDocsInvSlider(id))
    }

    onChangeShowDocInvSlider() {
        this.props.dispatch(changeShowDocInvSlider())
    }

    showDocsResaSlider(id) {
        this.props.dispatch(setShowDocsResaSlider(id))
    }

    onChangeShowDocsResaSlider() {
        this.props.dispatch(changeShowDocResaSlider())
    }

    render() {
        return (
            <div >
                <div className="invest-slider bigDiv"
                     style={{marginTop: "25px", background: "white", padding: "0", marginBottom: "100px"}}>
                    {(() => {
                        if (this.props.showInvestment) {
                            // show investment
                            if (this.props.investmentsBackup.length > 0) {
                                // has investment
                                const slide = this.props.investmentsBackup.map((investment) =>
                                    <div key={investment.project.project_id}>
                                        <Row className="slider-container">
                                            <Col span={8} className="background"
                                                 style={{
                                                     backgroundImage: `url('${investment.project.image}'),
                                                     url('${fallback_background}')`,
                                                     backgroundSize: "cover"
                                                 }}>
                                            </Col>
                                            <Col span={16} className="content">
                                                <div className="info">
                                                    <FormattedMessage id="investTable.th2">
                                                        {(message) =>
                                                            <p>{message}</p>}
                                                    </FormattedMessage>
                                                    <h4>{addSpace(Number(investment.amount))}€</h4>
                                                    <FormattedMessage id="investTable.th3">
                                                        {(message) =>
                                                            <p>{message}</p>}
                                                    </FormattedMessage>
                                                    <h4>{(() => {
                                                        let date = new Date(`${investment.date_investment}`);
                                                        return `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`
                                                    })()}</h4>
                                                    <FormattedMessage id="investTable.th4">
                                                        {(message) =>
                                                            <p>{message}</p>}
                                                    </FormattedMessage>
                                                    <h4>{addSpace(investment.project.valorisation)}€</h4>
                                                    <FormattedMessage id="investTable.th6">
                                                        {(message) =>
                                                            <p>{message}</p>}
                                                    </FormattedMessage>
                                                    <h4>
                                                        {(() => {
                                                            let present = Number(investment.amount) / investment.project.total_amount_requested;
                                                            if (present > 1) {
                                                                return 100
                                                            } else {
                                                                return (present * 100).toFixed(2)
                                                            }
                                                        })()}%
                                                    </h4>
                                                </div>

                                                <div className="show-docs">
                                                    <span>{investment.project.project_name}</span>
                                                    <button
                                                        onClick={this.showDocsSlider.bind(this, investment.project.project_id)}
                                                        style={{float: "right", marginRight: "6%"}}>
                                                        <Icon type="down"
                                                              className={(investment.showDocsSlider) ? "class_hidden_important" : "class_show"}/>
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {(() => {
                                                if (investment.showDocsSlider) {
                                                    return (

                                                        <div className="doc">
                                                            <Row>
                                                                <Col xs={{span: 20, offset: 2}}>
                                                                    <FormattedMessage id="investTable.title">
                                                                        {(message) =>
                                                                            <p style={{
                                                                                color: "rgba(40, 30, 29, 0.5",
                                                                                fontSize: "14px",
                                                                                fontWeight: "600"
                                                                            }}>{message}</p>}
                                                                    </FormattedMessage>

                                                                </Col>
                                                                <Col xs={{span: 1}}>
                                                                    <Button
                                                                        onClick={this.showDocsSlider.bind(this, investment.project.project_id)}>
                                                                        <Icon type="up"/>
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                            <Row type="flex" align="middle">

                                                                {(() => {
                                                                    if (investment.project.documents.length > 0) {
                                                                        return (
                                                                            <Col xs={{span: 24}}>
                                                                                {(() => {
                                                                                    const documents = investment.project.documents.map((document, index) => {
                                                                                        return (
                                                                                            <Col xs={12} sm={6}
                                                                                                 key={index} style={{
                                                                                                textAlign: "center",
                                                                                                marginTop: "20px"
                                                                                            }}>
                                                                                                <a href={`/dashboard/telecharge/?name=${document.name}&path=${document.path}`}
                                                                                                   target="_blank"
                                                                                                   tabIndex="-1">
                                                                                                    <Icon
                                                                                                        type="file-text"
                                                                                                        style={{
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
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <Col xs={{span: 20, offset: 2}}
                                                                                 style={{marginTop: "20px"}}>
                                                                                <FormattedMessage
                                                                                    id="investTable.descibe3">
                                                                                    {(message) =>
                                                                                        <p style={{
                                                                                            whiteSpace: "pre-line",
                                                                                            color: "rgba(40, 30, 29, 0.5",
                                                                                            textAlign: "center",
                                                                                            fontWeight: "500"
                                                                                        }}>{message}</p>}
                                                                                </FormattedMessage>
                                                                                <FormattedMessage
                                                                                    id="investTable.descibe4">
                                                                                    {(message) =>
                                                                                        <p style={{
                                                                                            whiteSpace: "pre-line",
                                                                                            color: "rgba(40, 30, 29, 0.5",
                                                                                            textAlign: "center",
                                                                                            fontWeight: "500"
                                                                                        }}>{message}</p>}
                                                                                </FormattedMessage>
                                                                            </Col>
                                                                        )
                                                                    }
                                                                })()}
                                                            </Row>

                                                        </div>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })()}
                                        </Row>
                                    </div>
                                );

                                return (
                                    <Carousel /*autoplay*/
                                        afterChange={
                                            this.onChangeShowDocInvSlider.bind(this)
                                        }
                                    >
                                        {slide}
                                    </Carousel>
                                )
                            } else {
                                return (
                                    <div>
                                        {lang["investTable.descibe5"]}
                                    </div>
                                )
                            }

                        }




                        //    show projects reservation
                        //    show projects reservation
                        //    show projects reservation


                        else {
                            if (this.props.projectsResaBackup.length > 0) {
                                const slide = this.props.projectsResaBackup.map((resa) =>
                                    <div key={resa.project.project_id}>
                                        <Row className="slider-container">
                                            <Col span={8} className="background"
                                                 style={{
                                                     backgroundImage: `url('${resa.project.image}'),
                                                     url('${fallback_background}')`,
                                                     backgroundSize: "cover"
                                                 }}>
                                            </Col>
                                            <Col span={16} className="content">
                                                <div className="info">
                                                    <FormattedMessage id="investTable.th2">
                                                        {(message) =>
                                                            <p>{message}</p>}
                                                    </FormattedMessage>
                                                    <h4>{addSpace(resa.amount)} &euro;</h4>
                                                    <FormattedMessage id="reservationTable.th3">
                                                        {(message) =>
                                                            <p>{message}</p>}
                                                    </FormattedMessage>
                                                    <h4>{resa.project.end_date < 0 ? 0 : resa.project.end_date} j</h4>
                                                    <FormattedMessage id="reservationTable.th4">
                                                        {(message) =>
                                                            <p>{message}</p>}
                                                    </FormattedMessage>
                                                    <h4>{addSpace(resa.project.supporter_collection)}</h4>
                                                    <FormattedMessage id="reservationTable.th5">
                                                        {(message) =>
                                                            <p>{message}</p>}
                                                    </FormattedMessage>
                                                    <h4>
                                                        {(() => {
                                                            let present = Number(resa.amount) / resa.project.total_amount_requested;
                                                            if (present > 1) {
                                                                return 100
                                                            } else {
                                                                return (present * 100).toFixed(2)
                                                            }
                                                        })()}%
                                                    </h4>
                                                </div>

                                                <div className="show-docs">
                                                    <span>{resa.project.project_name}</span>
                                                    <button onClick={this.showDocsResaSlider.bind(this, resa.id)}
                                                            style={{float: "right", marginRight: "6%"}}
                                                            className={(resa.showDocsSlider) ? "class_hidden" : "class_show"}>
                                                        <Icon type="down"
                                                              className={(resa.showDocsSlider) ? "class_hidden" : "class_show"}/>
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {(() => {
                                                if (resa.showDocsSlider) {
                                                    return (

                                                        <div className="doc">
                                                            <Row>
                                                                <Col xs={{span: 20, offset: 2}}>
                                                                    <FormattedMessage id="investTable.title">
                                                                        {(message) =>
                                                                            <p style={{
                                                                                color: "rgba(40, 30, 29, 0.5",
                                                                                fontSize: "14px",
                                                                                fontWeight: "600"
                                                                            }}>{message}</p>}
                                                                    </FormattedMessage>

                                                                </Col>
                                                                <Col xs={{span: 1}}>
                                                                    <Button
                                                                        onClick={this.showDocsResaSlider.bind(this, resa.id)}>
                                                                        <Icon type="up"/>
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                            <Row type="flex" align="middle">

                                                                {(() => {
                                                                    if (resa.project.documents.length > 0) {
                                                                        return (
                                                                            <Col xs={{span: 24}}>
                                                                                {(() => {
                                                                                    const documents = resa.project.documents.map((document, index) => {
                                                                                        return (
                                                                                            <Col xs={12} sm={6}
                                                                                                 key={index} style={{
                                                                                                textAlign: "center",
                                                                                                marginTop: "20px"
                                                                                            }}>
                                                                                                <a href={`/dashboard/telecharge/?name=${document.name}&path=${document.path}`}
                                                                                                   target="_blank"
                                                                                                   tabIndex="-1">
                                                                                                    <Icon
                                                                                                        type="file-text"
                                                                                                        style={{
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
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <Col xs={{span: 20, offset: 2}}
                                                                                 style={{marginTop: "20px"}}>
                                                                                <FormattedMessage
                                                                                    id="investTable.descibe3">
                                                                                    {(message) =>
                                                                                        <p style={{
                                                                                            whiteSpace: "pre-line",
                                                                                            color: "rgba(40, 30, 29, 0.5",
                                                                                            textAlign: "center",
                                                                                            fontWeight: "500"
                                                                                        }}>{message}</p>}
                                                                                </FormattedMessage>
                                                                                <FormattedMessage
                                                                                    id="investTable.descibe4">
                                                                                    {(message) =>
                                                                                        <p style={{
                                                                                            whiteSpace: "pre-line",
                                                                                            color: "rgba(40, 30, 29, 0.5",
                                                                                            textAlign: "center",
                                                                                            fontWeight: "500"
                                                                                        }}>{message}</p>}
                                                                                </FormattedMessage>
                                                                            </Col>
                                                                        )
                                                                    }
                                                                })()}
                                                            </Row>

                                                        </div>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })()}
                                        </Row>
                                    </div>
                                );
                                return (
                                    <Carousel afterChange={this.onChangeShowDocsResaSlider.bind(this)}>
                                        {slide}
                                    </Carousel>
                                )
                            } else {
                                return (
                                    <div>
                                        {lang["reservationTable.th6"]}
                                    </div>
                                )
                            }
                        }
                    })()}
                </div>
            </div>
        )
    }
}


export default connect((store) => {
    return {
        investmentsBackup: store.investments.investmentsBackup,
        projectsResaBackup: store.resa.projectsBackup,
        showInvestment: store.investments.showInvestment,
    }
})(Slider);