import React from 'react';
import {FormattedMessage} from 'react-intl';

//bootstrap
import {Row, Col, ProgressBar} from 'react-bootstrap'

//media
import ImageEntreprise from './media/projet-hoolders.jpeg'

//redux
import {connect} from "react-redux";

// Truncate
import Truncate from 'react-truncate';

// CSS
import './ownProject.css'

import { Button } from 'antd';

//global
import {addSpace, serverName, lang} from '../../global'

class OwnProject extends React.Component {

    getDynamicClass(domain) {
        if (domain === "Objets Connectés")
            return "objets-connectes";
        if (domain === "Silver Economie")
            return "silver-economie";
        if (domain === "Santé")
            return "sante";
        if (domain === "Autres")
            return "autres";
    }




    render() {
        return (

            <div className="ownProject">
                <FormattedMessage id="ownProjet.title">
                    {(message) => <h2 className="section-title">{message}</h2>}
                </FormattedMessage>
                {
                    (() => {
                        if (this.props.ownProject.id !== -1) {
                            return (
                                <div>
                                    <Row className={"thumb " + this.getDynamicClass(this.props.ownProject.activity_domain)}
                                         style={{marginBottom: "30px"}}
                                        >
                                        <Col xs={12} sm={4} md={4} lg={4} className="background"
                                             style={{
                                                 backgroundImage: `url('${this.props.ownProject.imageResponsive}')
                                            ,url("${ImageEntreprise}")`
                                             }}>
                                            <Row className="tags">
                                                {
                                                    this.props.ownProject.defisc.map((defisc, index) => {
                                                        return (
                                                            <div className="tag" key={index}>
                                                                {defisc.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Row>
                                            <Row className="domain">
                                                <div className="left">
                                                    <span>{this.props.ownProject.activity_domain}</span>
                                                </div>
                                                <div className="right">
                                                    <span>{this.props.ownProject.status}</span>
                                                </div>
                                            </Row>
                                        </Col>

                                        <Col xs={12} sm={8} md={8} lg={8} className="caption">
                                            <h3>{this.props.ownProject.name}</h3>
                                            <h4>
                                                par {this.props.ownProject.contractor.firstName}&nbsp;{this.props.ownProject.contractor.lastName}</h4>

                                            <div className="content">
                                                <Truncate lines={2} ellipsis={<span>...</span>}>
                                                    <p dangerouslySetInnerHTML={{__html: this.props.ownProject.invadeQuestion}}></p>
                                                </Truncate>
                                            </div>

                                            <ProgressBar
                                                now={(this.props.ownProject.sum_reservations) / (this.props.ownProject.searchedAmount) * 100}/>
                                            <Row className="chiffre">
                                                <Col xs={4} className="chiffres">
                                            <span>
                                                {(() => {
                                                    let present = this.props.ownProject.sum_reservations / this.props.ownProject.searchedAmount
                                                    if (present > 1) {
                                                        return 100
                                                    } else {
                                                        return Math.round(present * 100)
                                                    }
                                                })()}%
                                            </span>
                                                    <FormattedMessage id="ownProjet.tag1">
                                                        {(message) => <p>{message}</p>}
                                                    </FormattedMessage></Col>
                                                <Col xs={4} className="chiffres">
                                                    <span>{addSpace(this.props.ownProject.sum_reservations)}€</span>
                                                    <FormattedMessage id="ownProjet.tag2">
                                                        {(message) => <p>{message}</p>}
                                                    </FormattedMessage>
                                                </Col>
                                                {/*<Col xsHidden={true} smHidden={true} mdHidden={true} lg={3} className="chiffres">*/}
                                                {/*<span>{this.props.ownProject.end_date>0? this.props.ownProject.end_date: 0 }</span>*/}
                                                {/*<FormattedMessage id="ownProjet.tag3">*/}
                                                {/*{(message)=><p>{message}</p>}*/}
                                                {/*</FormattedMessage>*/}
                                                {/*</Col>*/}
                                                <Col xs={4} className="chiffres">
                                                    <span>{this.props.ownProject.supporter_collection}</span>
                                                    <FormattedMessage id="ownProjet.tag4">
                                                        {(message) => <p>{message}</p>}
                                                    </FormattedMessage>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>

                            )
                        }
                    })()
                }

            </div>
        )
    }
}


export default connect((store) => {
    return {
        ownProject: store.ownProject.project,
        fetched: store.ownProject.fetched,
    }
})(OwnProject);
