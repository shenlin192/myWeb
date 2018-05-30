/**
 * Created by shenlin on 6/13/17.
 */
// react
import React from 'react';
import {FormattedMessage} from 'react-intl';

//redux
import {connect} from "react-redux";

//bootstrap
import {Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

//css
import './menu.css';

//media
import tableauDeBordIcon from './media/tableau_de_bord_icon.svg'
import entrepriseIcon from './media/entreprise_icon.svg'
import portefeuilleIcon from './media/portefeuille_icon.svg'
import messagesIcon from './media/messages_icon.png'


//
import ReactImageFallback from "react-image-fallback";
import fallbackAvatar from "./media/fallback_avatar.png";

//global
import {serverName} from '../../global'


class MenuMobile extends React.Component {

    // handleSelect(selectedKey) {
    //     this.props.dispatch(changePath(selectedKey));
    // }

    render() {
        return (
            <div className="menuMobile">
                <Nav bsStyle="tabs" activeKey={this.props.activeKey} /*onSelect={this.handleSelect.bind(this)}*/>

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
                    {/*<span>Gérer mes événements</span>*/}
                    {/*</NavItem>*/}
                    {/*</LinkContainer>*/}
                    <LinkContainer eventKey={1} to="/profile">
                        <NavItem>
                            <ReactImageFallback
                                src={serverName + this.props.photo}
                                fallbackImage={fallbackAvatar}
                                alt="profile"
                                className="img-profile responsive"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%"
                                }}/>
                            <FormattedMessage id="menu.profile">
                                {(message) => <span>{message}</span>}
                            </FormattedMessage>
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </div>
        )
    }
}


export default connect((store) => {
    return {
        activeKey: store.routerPath.activeKey,
        photo: store.userProfile.user.basicInfo.photo,
        slug: store.event.slug,
        // eventSlug: store.
    }
})(MenuMobile);