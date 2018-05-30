/**
 * Created by shenlin on 6/13/17.
 */
//react
import React from 'react';

//redux
import {connect} from "react-redux";
//css
import './projectsSuivi.css';
//components
import ProjectsSuivi from "./projectsSuivi";

import { lang } from "../../global";

class Tableau extends React.Component {

    render() {
        return (
            <div>
                <div className={(this.props.projects.length > 0) ? 'class_show' : 'class_hidden'}>
                    <ProjectsSuivi/>
                </div>
                {
                    (()=>{
                        if(!this.props.projects.length > 0){
                            return lang["projetsSuivi.noProject"]
                        }
                    })()
                }
            </div>
        )
    }
}

export default connect((store) => {
    return {
        projects: store.projectsSuivi.projects,
    }
})(Tableau);


