/**
 * Created by shenlin on 6/13/17.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

//redux
import {connect} from "react-redux";
import {Button} from 'antd';
import {serverName} from '../../global'

//components
import MonProjet from './ownProject';

class Entreprises extends React.Component {
    render() {
        return (
            <div>
                <div className={(this.props.id === -1) ? "class_hidden" : "class_show"}>
                    <MonProjet/>
                </div>
                <div className={(this.props.id === -1) ? "class_show" : "class_hidden"}>
                    <FormattedMessage id="entreprises.warning_title">
                        {(message) =>
                            <h2 className="section-title">{message}</h2>}
                    </FormattedMessage>
                    {/*<div>*/}
                        {/*<Button type="primary"*/}
                                {/*onClick={() => window.open(`${serverName}cofunding/ipoome/registerevent/`,"_self")}>Créez votre*/}
                            {/*entreprise</Button>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}
export default connect((store) => {
    return {
        id: store.ownProject.project.id,
    }
})(Entreprises);

