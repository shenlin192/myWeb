/**
 * Created by shenlin on 6/8/17.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

import {Navbar, NavItem, Nav} from 'react-bootstrap'
// import logo from './media/ipoomeLogo_white.png'
import './base.css';

export default class Header extends React.Component {

    logout() {
        window.location.href = '/logout/'
    }

    render() {
        return (
            <header>
                <Navbar collapseOnSelect fixedTop id="navBar" className="navbar navbar-default">
                    <Navbar.Header className="navbar-header">
                        <Navbar.Brand>
                            <a href="/">
                                <img alt="Brand" style={{maxWidth: "35px", marginLeft: "5vw"}} src="/images/logo.png"/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {/*<FormattedMessage id="header.tag1">*/}
                                {/*{(message) => <NavItem eventKey={1} href="/collections">{message}</NavItem>}*/}
                            {/*</FormattedMessage>*/}
                            {/*<FormattedMessage id="header.tag2">*/}
                                {/*{(message) => <NavItem eventKey={2}*/}
                                                       {/*href="/cv">{message}</NavItem>}*/}
                            {/*</FormattedMessage>*/}
                            {/*<FormattedMessage id="header.tag3">*/}
                            {/*{(message)=> <NavItem eventKey={3} href="">{message}</NavItem>}*/}
                            {/*</FormattedMessage>*/}
                            <FormattedMessage id="header.tag4">
                                {(message) => <NavItem eventKey={1} href="/account/logout/">{message}</NavItem>}
                            </FormattedMessage>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>

        )
    }
}