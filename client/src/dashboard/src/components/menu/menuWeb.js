// react
import React from 'react';
import {FormattedMessage} from 'react-intl';

//redux
import store from "../../store";
import {connect} from "react-redux";

//bootstrap
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, NavItem, Row, Col, ProgressBar} from 'react-bootstrap'

//
import ReactImageFallback from "react-image-fallback";
import fallbackAvatar from "./media/fallback_avatar.png";

//browser
import createHistory from 'history/createBrowserHistory'

//css
import './menu.css';

//media
import tableauDeBordIcon from './media/tableau_de_bord_icon.svg'
import entrepriseIcon from './media/entreprise_icon.svg'
import portefeuilleIcon from './media/portefeuille_icon.svg'
import messagesIcon from './media/messages_icon.png'
import facebook from './media/facebook.svg'
import linkedin from './media/linkedin.svg'
import twitter from './media/twitter.svg'
import tele from './media/tele.svg'
import mail from './media/mail.svg'
import location from './media/location.svg'

// global
import {serverName} from '../../global'

const history = createHistory();

function changePath(location) {
    if (location.hash === '#/profile') {
        store.dispatch({type: 'CHANGE_PATH', payload: 1});

        localStorage.setItem('currentPath', 1)
    }
    else if (location.hash === '#/experience') {
        store.dispatch({type: 'CHANGE_PATH', payload: 1});
    }
    else if (location.hash === '#/tableau_de_bord' || location.hash === '#/') {
        store.dispatch({type: 'CHANGE_PATH', payload: 2});

        localStorage.setItem('currentPath', 2)
    }
    else if (location.hash === '#/portefeuille') {
        store.dispatch({type: 'CHANGE_PATH', payload: 3});
        localStorage.setItem('currentPath', 3)

    }
    else if (location.hash === '#/entreprises') {
        store.dispatch({type: 'CHANGE_PATH', payload: 4});
        localStorage.setItem('currentPath', 4)

    }
    else if (location.hash === '#/messages') {
        store.dispatch({type: 'CHANGE_PATH', payload: 5});
        localStorage.setItem('currentPath', 5)
    }
}

history.listen(location => {
    changePath(location);
});

//
// window.addEventListener("beforeunload", function (e) {
//     changePath(window.location);
//
//     // alert(123)
//
//     (e || window.event).returnValue = null;
//     return null;
// });


// store.subscribe(()=>{
//     console.log(store.getState())
// });


const divStyle = {
    color: "#000"
};


class MenuWeb extends React.Component {


    getPercentage(type) {
        let percentageOne = 0;
        let percentageTwo = 0;
        let percentageThree = 0;
        let total = this.props.firstNub + this.props.secondNub + this.props.thirdNub;

        if (total <= 11) {
            percentageOne = parseInt((total / 11) * 100, 10);
            percentageTwo = 0;
            percentageThree = 0;
        } else {
            percentageOne = 100;
            if (total <= 22) {
                percentageTwo = parseInt(((total - 11) / 11 * 100), 10);
            } else {
                percentageTwo = 100;
                percentageThree = parseInt(((total - 22) / 12 * 100), 10);
            }
        }

        if (type === 0) {
            return parseInt((total / 34 * 100), 10)
        } else if (type === 1) {
            return percentageOne
        } else if (type === 2) {
            return percentageTwo
        } else if (type === 3) {
            return percentageThree
        }
    }


    render() {
        const profileImage = {
            width: '100%',
            height: '100%',
        };

        const profileName = {
            fontSize: '24px',
            fontWeight: '600',
            color: '#281E1D',
            marginBottom: '15px',
            marginTop: '15px',
        };

        const profileText = {
            fontSize: '14px',
            fontWeight: '300',
            color: '#281E1D',
            marginBottom: '0',
            display: 'block',
            width: "85%",
            wordWrap: "break-word",

        };
        const profileChiffre = {
            fontFamilie: '',
            fontSize: '24px',
            fontWeight: '400',
            color: '#395561',
            textAlign: 'center',
            marginBottom: '5px',
        };
        const profileTag = {
            fontSize: '14px',
            fontWeight: '300',
            color: '#281E1D',
            opacity: '0.35',
            textAlign: 'center',
            marginTop: '0',
        };
        const socialIcon = {
            width: '15px',
            height: '15px',
            marginRight: '10px',
        };
        const petitIcon = {
            display: 'inline-block',
            width: '16px',
            height: '20px',
            marginRight: "5%",
        };
        const flexRow = {
            display: "flex",
            marginBottom: "0.4vw",
            alignItems: "center",
            // margin: "auto",
        };
        const progress = {
            height: '14px',
            width: '32.5%',
            borderRadius: '0',
            float: 'left',
            boxShadow: 'none',
            background: 'EAEAEA',
        };


        return (
            <div className="menuWeb">
                <Nav bsStyle="pills" stacked
                     activeKey={this.props.activeKey} /*onSelect={this.handleSelect.bind(this)}*/>
                    <LinkContainer eventKey={1} to="/profile">
                        <NavItem>
                            <div style={{...divStyle, width: "100%"}}>
                                <h2 style={profileName}>{this.props.basicInfo.lastName} {this.props.basicInfo.firstName}</h2>
                                <Row>
                                    <Col sm={5} style={{paddingRight: 0}}>
                                        {/*<ReactImageFallback*/}
                                        {/*src={serverName+project.owner}*/}
                                        {/*fallbackImage={fallback_profile}*/}
                                        {/*alt="profile"*/}
                                        {/*className="img-profile" />*/}
                                        <ReactImageFallback
                                            src={serverName + this.props.basicInfo.photo}
                                            fallbackImage={fallbackAvatar}
                                            alt="profile"
                                            className="img-profile responsive"
                                            style={{...profileImage, maxHeight: "250px"}}/>
                                    </Col>
                                    <Col sm={7}>
                                        <div style={{marginTop: "0.5vw"}}>
                                            <p style={{
                                                ...profileText,
                                                fontWeight: '400'
                                            }}>{this.props.basicInfo.profession}</p>
                                            <p style={{
                                                ...profileText,
                                                fontWeight: '400'
                                            }}>{this.props.basicInfo.company_name}</p>
                                        </div>

                                        {/*<div>*/}
                                        {/*<p style={profileText}></p>*/}
                                        {/*</div>*/}

                                        <div style={{flex: "1", marginBottom: "1.5vw"}}>
                                            <img src={linkedin} alt="linkedin" style={socialIcon}/>
                                            <img src={facebook} alt="facebook" style={socialIcon}/>
                                            <img src={twitter} alt="twitter" style={socialIcon}/>
                                        </div>

                                        <div className="Small" style={{marginTop: "0.5vw"}}>
                                            <div style={flexRow}>
                                                <img src={tele} alt="tele" style={petitIcon}/>
                                                <p style={profileText}>{this.props.basicInfo.telephone}</p>
                                            </div>
                                            <div style={flexRow}>
                                                <img src={location} alt="location" style={petitIcon}/>
                                                <p style={profileText}>{this.props.basicInfo.address}, {this.props.basicInfo.city}, {this.props.basicInfo.zip_code}</p>
                                            </div>
                                            <div style={flexRow}>
                                                <img src={mail} alt="mail" style={petitIcon}/>
                                                <p style={profileText}>{this.props.basicInfo.email}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="Big">
                                    <Col sm={12}>
                                        <div style={flexRow}>
                                            <img src={tele} alt="tele" style={petitIcon}/>
                                            <p style={profileText}>{this.props.basicInfo.telephone}</p>
                                        </div>
                                        <div style={flexRow}>
                                            <img src={location} alt="location" style={petitIcon}/>
                                            <p style={profileText}>{this.props.basicInfo.address}, {this.props.basicInfo.city}, {this.props.basicInfo.zip_code}</p>
                                        </div>
                                        <div style={flexRow}>
                                            <img src={mail} alt="mail" style={petitIcon}/>
                                            <p style={profileText}>{this.props.basicInfo.email}</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="mainDiv" sm={3} style={{padding: '0'}}>
                                        <div className="border-right" style={{position: 'relative'}}>
                                            <h2 style={profileChiffre}>{this.props.voteNum}</h2>
                                            <FormattedMessage id="menu.vote">
                                                {(message) => <h3 style={profileTag}>{message}</h3>}
                                            </FormattedMessage>
                                        </div>
                                    </Col>

                                    <Col className="mainDiv" sm={5} style={{padding: '0'}}>
                                        <div className="border-right">
                                            <h2 style={profileChiffre}>{this.props.investmentsNum}</h2>

                                            <FormattedMessage id="menu.investment">
                                                {(message) => <h3 style={profileTag}>{message}</h3>}
                                            </FormattedMessage>

                                        </div>
                                    </Col>

                                    <Col sm={4}>
                                        <div>
                                            <h2 style={profileChiffre}>{this.props.projectSuiviNum}</h2>
                                            <FormattedMessage id="menu.project_suivi">
                                                {(message) => <h3 style={profileTag}>{message}</h3>}
                                            </FormattedMessage>

                                        </div>
                                    </Col>
                                </Row>

                                <FormattedMessage id="menu.profile_complete">
                                    {(message) => <p style={{
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: '#395561',
                                        marginTop: '20px',
                                        marginBottom: '10px'
                                    }}>
                                        {message}
                                        {(this.getPercentage.bind(this, 0))()}%
                                    </p>}
                                </FormattedMessage>


                                <div className="prog">
                                    <ProgressBar style={progress} now={(this.getPercentage.bind(this, 1))()}/>
                                    <ProgressBar style={{...progress, marginRight: '1%', marginLeft: '1%'}}
                                                 now={(this.getPercentage.bind(this, 2))()}/>
                                    <ProgressBar style={progress} now={(this.getPercentage.bind(this, 3))()}/>
                                </div>

                            </div>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer eventKey={2} to="/tableau_de_bord">
                        <NavItem>
                            <img src={tableauDeBordIcon} alt="Tableau de bord"/>
                            <FormattedMessage id="menu.dashboard">
                                {(message) => <span>{message}</span>}
                            </FormattedMessage>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer eventKey={3} to="/portefeuille">
                        <NavItem>
                            <img src={portefeuilleIcon} alt="Portefeuille"/>
                            <FormattedMessage id="menu.portefeuille">
                                {(message) => <span>{message}</span>}
                            </FormattedMessage>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer eventKey={4} to="/entreprises">
                        <NavItem>
                            <img src={entrepriseIcon} alt="Entreprises"/>
                            <FormattedMessage id="menu.entreprise">
                                {(message) => <span>{message}</span>}
                            </FormattedMessage>
                        </NavItem>
                    </LinkContainer>
                    {(() => {
                        if (this.props.slug) {
                            return (
                                <li>
                                    <a href={`${serverName}cofunding/${this.props.slug}/gerereventchoices/`}>
                                        <img src={messagesIcon} alt="evenement"/>
                                        <FormattedMessage id="menu.gerer">
                                            {(message) => <span>{message}</span>}
                                        </FormattedMessage>
                                    </a>
                                </li>
                            )
                        }
                    })()}

                    {/*<LinkContainer eventKey={5} to="/messages">*/}
                    {/*<NavItem>*/}
                    {/*<img src={messagesIcon} alt="Messages"/>*/}
                    {/*<span>Messages</span>*/}
                    {/*</NavItem>*/}
                    {/*</LinkContainer>*/}
                </Nav>
                <div className="placeHolder">
                </div>
            </div>
        )
    }
}


export default connect((store) => {
    return {
        activeKey: store.routerPath.activeKey,
        basicInfo: store.userProfile.user.basicInfo,
        projectSuiviNum: store.projectsSuivi.projects.length,
        investmentsNum: store.investments.investments.length,
        voteNum: store.ownProject.project.supporter_collection,
        slug: store.event.slug,

        firstNub: store.userProfile.firstNub,
        secondNub: store.userProfile.secondNub,
        thirdNub: store.userProfile.thirdNub,
    }
})(MenuWeb);
