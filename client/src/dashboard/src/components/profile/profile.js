/**
 * Created by shenlin on 6/13/17.
 */
import React from 'react';
// import { spring } from 'react-motion';

// css
import './profile.css'

//redux
import {connect} from "react-redux";

//components
import BasicInfo from './basicInfo/basicInfo';
import SocialCompte from './socialCompte/socialCompte';
import Document from './document/document';
import Experience from './experience/experience';


class Profile extends React.Component {

    constructor() {
        super();
        this.state = {items: [{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}]}
    }

    componentDidMount() {
        this.setState({
            items: [{key: 'a', size: 10}, {key: 'b', size: 20}], // remove c.
        });
    }

    render() {
        return (
            <div className="profile">
                <BasicInfo />
                <SocialCompte />
                {this.props.kyc === "kyc2" ? null : <Document />}
                <Experience />
            </div>
        )
    }
}


export default connect((store) => {
    return {
        kyc: store.userProfile.user.kyc,
    }
})(Profile)
