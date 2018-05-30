/**
 * Created by shenlin on 6/13/17.
 */
import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';


// or 'antd/dist/antd.less'
export default class Messages extends React.Component {
    render() {
        return (
            <div>
                <h1>Messages</h1>
                <Jumbotron>
                    <h1>Hello, AngularJS!</h1>
                    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
                        featured content or information.</p>
                    <p><Button bsStyle="primary">Learn more</Button></p>
                    <DatePicker />
                </Jumbotron>
                {/*<img src="https://angularjs.org/img/AngularJS-large.png"></img>*/}
            </div>
        )
    }
}
