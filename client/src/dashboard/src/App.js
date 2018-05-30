//react tools
import React, {Component} from 'react';

// router
import {HashRouter, Route} from 'react-router-dom';

//redux
import {connect} from "react-redux";

//resource
import './App.css';

//components
import Header from "./components/base/header";
import MenuWeb from './components/menu/menuWeb'
import MenuMobile from './components/menu/menuMobile';
import ExperienceStep from  './components/profile/experience/experienceStep';

import Profile from './components/profile/profile';
import Tableau from './components/tableau/tableau';
import Portefeuille from './components/portefeuille/portefeuille';
import Entreprises from './components/entreprises/entreprises';


//actions
import {fetchUserProfile} from  "./actions/userProfileActions";
import {fetchProjectsSuivi} from "./actions/projectsSuiviActions";
import {fetchOwnProject} from  './actions/ownProjectActions';
import {fetchInvestment} from  './actions/investmentActions';
// import {fetchEvent} from './actions/eventActions';
import {fetchResa} from './actions/resaAction';


//bootstrap
import {Grid, Row, Col} from 'react-bootstrap'

//antd
import 'antd/dist/antd.css';


class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchUserProfile());
        this.props.dispatch(fetchResa());
        this.props.dispatch(fetchProjectsSuivi());
        this.props.dispatch(fetchOwnProject());
        this.props.dispatch(fetchInvestment());
    }

    render() {

        return (
            <div>
                <Header/>
                <HashRouter>
                    <Grid fluid={true} className="App">
                        <Row>
                            <Col smHidden={true} mdHidden={true} lgHidden={true}>
                                <MenuMobile/>
                            </Col>
                        </Row>
                        {/* style={{display:"flex", flexWrap: "wrap"}} */}

                        <Row style={{display: "flex"}}>
                            <Col xsHidden={true} sm={4}
                                 style={{paddingLeft: 0, paddingRight: 0, marginRight: "15px", background: "#FFFFFF"}}>
                                <MenuWeb/>
                            </Col>
                            <Col xs={12} sm={8} style={{overflow: "hidden", flex: '1 0 25%'}} className="mainContent">
                                <Route exact path="/" component={Tableau}/>
                                <Route exact path="/profile" component={Profile}/>
                                <Route exact path="/profile/experienceStep" component={ExperienceStep}/>

                                <Route exact path="/tableau_de_bord" component={Tableau}/>
                                <Route exact path="/portefeuille" component={Portefeuille}/>
                                <Route exact path="/entreprises" component={Entreprises}/>

                            </Col>
                        </Row>
                    </Grid>
                </HashRouter>
            </div>
        );
    }
}


export default connect((store) => {
    return {
        routerPath: store.routerPath.routerPath
    }
})(App);


