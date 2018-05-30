/**
 * Created by shenlin on 6/27/17.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

//css
import './basicInfo.css';

//bootstrap
import {Row, Col} from 'react-bootstrap'

//fallback
import ReactImageFallback from "react-image-fallback";
import fallbackAvatar from "../../menu/media/fallback_avatar.png";

//redux
import {connect} from "react-redux";

// Global
import {serverName, lang} from '../../../global'


class BasicSHOW extends React.Component {

    render() {

        return (
            <div className="infoShow">
                <Row>
                    <Col xs={5} sm={5} md={4} lg={3} className="avatar-container">
                        <ReactImageFallback
                            src={serverName + this.props.basicInfo.photo}
                            fallbackImage={fallbackAvatar}
                            alt="profile"
                            className="img-profile responsive"
                            thumbnail
                            responsive
                            style={{width: '100%'}}/>
                    </Col>

                    <Col className="showInfo" xs={7} sm={7} md={8} lg={9}>
                        <Row>
                            <Col sm={12} md={4} lg={4}>
                                <h4>
                                    <FormattedMessage
                                        id='IDENTITE'
                                    />
                                </h4>
                            </Col>
                            <Col sm={12} md={8} lg={8}>
                                <div>
                                    <p className="identityName">
                                        {this.props.basicInfo.lastName}&nbsp;{this.props.basicInfo.firstName}
                                    </p>
                                    <p className="identityCompany">{this.props.basicInfo.profession}
                                        &nbsp;
                                        {
                                            (() => {
                                                if (this.props.basicInfo.profession && this.props.basicInfo.company_name) {
                                                    return lang["basicShow.in"]
                                                }
                                            })()
                                        }
                                        &nbsp;
                                        {this.props.basicInfo.company_name}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={4} lg={4}><h4>
                                <FormattedMessage
                                    id='DATE_DE_NAISSANCE'
                                />
                            </h4></Col>
                            <Col sm={12} md={8} lg={8}>
                                <div>
                                    <p><span className="hidden-xs">Né(e) le &nbsp;</span>
                                        {this.props.basicInfo.birthdayDate}/
                                        {this.props.basicInfo.birthdayMonth}/
                                        {this.props.basicInfo.birthdayYear}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={4} lg={4}><h4>
                                <FormattedMessage
                                    id='TELEPHONE_MOBILE'
                                />
                            </h4></Col>
                            <Col sm={12} md={8} lg={8}>
                                <div>
                                    <p>{this.props.basicInfo.telephone}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="showSmall">
                            <Col sm={12} md={4} lg={4}><h4>
                                <FormattedMessage
                                    id='EMAIL'
                                />
                            </h4></Col>
                            <Col sm={12} md={8} lg={8}>
                                <div>
                                    <p>{this.props.basicInfo.email}</p>

                                </div>
                            </Col>
                        </Row>


                        {
                            (() => {
                                if (this.props.basicInfo.address ||
                                    this.props.basicInfo.city ||
                                    this.props.basicInfo.zip_code
                                ) {
                                    return (
                                        <Row className="showSmall">
                                            <Col sm={12} md={4} lg={4}><h4>
                                                <FormattedMessage
                                                    id='ADRESSE_FISCALE'
                                                />
                                            </h4></Col>
                                            <Col sm={12} md={8} lg={8}>
                                                <div>

                                                    <p>{this.props.basicInfo.address} &nbsp;
                                                        {this.props.basicInfo.city} &nbsp;
                                                        {this.props.basicInfo.zip_code}
                                                    </p>

                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })()
                        }


                        {
                            (() => {
                                if (this.props.basicInfo.description) {
                                    return (
                                        <Row className="showSmall">
                                            <Col sm={12} md={4} lg={4}><h4>
                                                <FormattedMessage
                                                    id='PRESENTEZ_VOUS'
                                                />
                                            </h4></Col>
                                            <Col sm={12} md={8} lg={8}>
                                                <div>
                                                    <p>{this.props.basicInfo.description}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })()
                        }


                    </Col>
                </Row>


                {
                    (() => {
                        if (this.props.basicInfo.email) {
                            return (
                                <Row className="showBig">
                                    <Col sm={12} md={4} lg={4}><h4>
                                        <FormattedMessage
                                            id='EMAIL'
                                        />
                                    </h4></Col>
                                    <Col sm={12} md={8} lg={8}>
                                        <div>
                                            <p>{this.props.basicInfo.email}</p>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        }
                    })()
                }


                {
                    (() => {
                        if (
                            this.props.basicInfo.address ||
                            this.props.basicInfo.city ||
                            this.props.basicInfo.zip_code
                        ) {
                            return (
                                <Row className="showBig">
                                    <Col sm={12} md={4} lg={4}><h4>
                                        <FormattedMessage
                                            id='ADRESSE_FISCALE'
                                        />
                                    </h4></Col>
                                    <Col sm={12} md={8} lg={8}>
                                        <div>
                                            <p>
                                                {this.props.basicInfo.address} &nbsp;
                                                {this.props.basicInfo.city} &nbsp;
                                                {this.props.basicInfo.zip_code}</p>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        }
                    })()
                }


                {
                    (() => {
                        if (this.props.basicInfo.description) {
                            return (
                                <Row className="showBig">
                                    <Col sm={12} md={4} lg={4}><h4>
                                        <FormattedMessage
                                            id='PRESENTEZ_VOUS'
                                        />
                                    </h4>
                                    </Col>
                                    <Col sm={12} md={8} lg={8}>
                                        <div>
                                            <p>{this.props.basicInfo.description}</p>
                                        </div>
                                    </Col>
                                </Row>
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
        basicInfo: store.userProfile.user.basicInfo,
    }
})(BasicSHOW);