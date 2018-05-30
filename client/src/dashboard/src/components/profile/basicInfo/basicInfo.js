import React from 'react';
import {FormattedMessage} from 'react-intl';

//css
import './basicInfo.css';
import '../../../App.css';
//bootstrap
import {Row, Col, Image} from 'react-bootstrap'

//redux
import {connect} from "react-redux";
import {setModifyMode} from '../../../actions/userProfileActions';


//media
import Modify from './media/modify.png'


// Components
import BasicShow from './basicShow';
import BasicEdit from './basicEdit';


class BasicInfo extends React.Component {

    modify() {
        this.props.dispatch(setModifyMode())
    }

    render() {
        const boxStyle = {
            position: 'fix',
            top: '83px',
            background: 'white',
            padding: '25px',
            marginTop: '25px',
            boxShadow: '3px 3px 5px 0px rgba(161, 151, 151, 0.2)',
        };


        return (
            <div style={boxStyle}>
                <Row>
                    <Col xs={10}>
                        <h2 className="section-title2">
                            <FormattedMessage
                                id='INFORMATION_DE_BASE'
                            />
                        </h2>
                    </Col>
                    <Col xs={2} style={{textAlign: 'right'}}>
                        <Image src={Modify}
                               className={!this.props.modifyMode ? 'class_show' : 'class_hidden'}
                               style={{height: '25px', width: '25px', cursor: 'pointer'}}
                               onClick={this.modify.bind(this)}/>
                    </Col>
                </Row>

                <div>
                    {this.props.modifyMode}
                </div>

                {/*show information*/}
                {/*<div style={this.props.modifyMode?{ visibility: 'hidden', height:'0px',overflow:'hidden',*/}
                {/*opacity: 0, transition: 'all 0.5s linear'}:{height:'auto',visibility: 'visible',*/}
                {/*opacity: 1}}>*/}
                {/*<BasicShow/>*/}
                {/*</div>*/}


                <div className={this.props.modifyMode ? 'class_hidden' : 'class_show'}>
                    <BasicShow/>
                </div>

                {/*edit information*/}
                <div className={this.props.modifyMode ? 'class_show' : 'class_hidden'}>
                    <BasicEdit/>
                </div>
            </div>

        )
    }
}


export default connect((store) => {
    return {
        modifyMode: store.userProfile.modifyMode,
    }
})(BasicInfo);