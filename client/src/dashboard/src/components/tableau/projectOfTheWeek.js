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

//global
import {addSpace, lang} from '../../global'

class ProjectOfTheWeek extends React.Component {

    dynamicClass() {

        if (this.props.projectOfTheWeek.activity_domain === "Silver Economie") {
            return "SilverEconomie"
        }
        else if (this.props.projectOfTheWeek.activity_domain === "Objets Connectés") {
            return "objetConnecte"
        }
        else if (this.props.projectOfTheWeek.activity_domain === "Santé") {
            return "sante"
        }
    }

    render() {

        return (
            <div className={this.dynamicClass()}>
                <FormattedMessage id="projectOfTheWeeks.title">
                    {(message) =>
                        <h2 className="section-title">{message}</h2>}
                </FormattedMessage>

                {/*<Row className="buttons-top">*/}
                {/*<Col xs={5} sm={5} className="buttons">*/}
                {/*<Button className="btn">*/}
                {/*<p>Silver Economie</p>*/}
                {/*</Button>*/}
                {/*</Col>*/}
                {/*<Col xs={5} sm={5} className="buttons" >*/}
                {/*<Button className="btn">*/}
                {/*<p>Objets Connectés</p>*/}
                {/*</Button>*/}
                {/*</Col>*/}
                {/*<Col xs={2} sm={2} className="buttons">*/}
                {/*<Button className="btn">*/}
                {/*<p>Santé</p>*/}
                {/*</Button>*/}
                {/*</Col>*/}
                {/*</Row>*/}


                <Row className="thumb">
                    <Col xs={12} sm={4} md={4} lg={4} className="background"
                         style={{backgroundImage: `url("${ImageEntreprise}")`}}>
                        <Row className="tags">
                            {
                                this.props.projectOfTheWeek.defisc.map((defisc, index) => {
                                    return (
                                        <div className="tag" key={index}>
                                            {defisc}
                                        </div>
                                    )
                                })
                            }
                        </Row>
                        <Row className="domain">
                            <div className="left">
                                <span>{this.props.projectOfTheWeek.activity_domain}</span>
                            </div>
                            <div className="right">
                                <span>{this.props.projectOfTheWeek.status}</span>
                            </div>
                        </Row>
                    </Col>

                    <Col xs={12} sm={8} className="caption">
                        <h3>{this.props.projectOfTheWeek.name}</h3>
                        <h4>par {this.props.projectOfTheWeek.owner}</h4>

                        <div className="content">
                            <Truncate lines={2} ellipsis={<span>...</span>}>
                                <p dangerouslySetInnerHTML={{__html: this.props.projectOfTheWeek.description_short}}></p>
                            </Truncate>
                        </div>

                        <ProgressBar
                            now={(this.props.projectOfTheWeek.sum_reservations) / (this.props.projectOfTheWeek.total_amount_requested) * 100}/>
                        <Row className="chiffre">
                            <Col xs={4} sm={4} md={3} className="chiffres">
                            <span>{Math.round((this.props.projectOfTheWeek.sum_reservations) / (this.props.projectOfTheWeek.total_amount_requested) * 100)}
                                {' '}%</span>
                                <p>{lang["ownProjet.tag1"]}</p>
                            </Col>
                            <Col xs={4} sm={4} md={3} className="chiffres">
                                <span>{addSpace(this.props.projectOfTheWeek.sum_reservations)}€</span>
                                <p>{lang["ownProjet.tag2"]}</p>
                            </Col>
                            <Col xs={4} md={3} className="chiffres">
                                <span>{this.props.projectOfTheWeek.endDate < 0 ? 0 : this.props.projectOfTheWeek.endDate }</span>
                                <p>{lang["ownProjet.tag3"]}</p>
                            </Col>
                            <Col xs={4} sm={4} md={3} className="chiffres">
                                <span>{this.props.projectOfTheWeek.investisseur}</span>
                                <p>{lang["ownProjet.tag4"]}</p>
                            </Col>
                        </Row>
                    </Col>
                    {/*<Col xsHidden={true} sm={2} md={2} lg={2}>*/}
                    {/*<div className="buttons">*/}
                    {/*<Button className="btn">*/}
                    {/*<p>Silver</p>*/}
                    {/*<p>Economie</p>*/}
                    {/*</Button>*/}
                    {/*<Button className="btn">*/}
                    {/*<p>Objets</p>*/}
                    {/*<p>Connectés</p>*/}
                    {/*</Button>*/}
                    {/*<Button className="btn">*/}
                    {/*<p>Santé</p>*/}
                    {/*</Button>*/}
                    {/*</div>*/}
                    {/*</Col>*/}
                </Row>
            </div>
        )
    }
}


export default connect((store) => {
    return {
        projectOfTheWeek: store.projectOfTheWeek.project,
        fetched: store.projectOfTheWeek.fetched,
        selectedProject: store.projectOfTheWeek.selectedProject,
    }
})(ProjectOfTheWeek);
