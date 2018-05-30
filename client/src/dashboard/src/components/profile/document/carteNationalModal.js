/**
 * Created by shenlin on 7/13/17.
 */

import React from 'react';
import {FormattedMessage} from 'react-intl';

//redux
import {connect} from "react-redux";
import {setRecto, setVerso} from "../../../actions/documentActions"

//css
import './carteNationalModal.css';


//component
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';

//global
import {serverName, lang} from '../../../global'

import {getCookie} from "../../../actions/getCookie";

// iziToast
import iziToast from 'izitoast';

const Dragger = Upload.Dragger;

class CarteNationalModal extends React.Component {


    handleChange (type, info) {

        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });
        return 0;

        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        let content = lang["document.upload_status"];
        if (status === 'done') {
            iziToast.success({
                title: 'Success',
                message: content[0],
                position: 'topCenter',
            });
            if (type === "recto") {
                this.props.dispatch(setRecto(info.file.response))
            } else {
                this.props.dispatch(setVerso(info.file.response))
            }
        } else if (status === 'error') {
            iziToast.error({
                title: 'Error',
                message: content[1],
                position: 'topCenter',
            });
        }
    };


    render() {
        const propsRecto = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            headers: {'X-CSRFToken': getCookie("csrftoken")},
            accept: 'application/pdf, image/jpg, image/jpeg, image/png',
            action: `${serverName}dashboard/addDocument/papier_identite_idCard_recto/${this.props.userId}`,
            beforeUpload(file) {
                // file.name = "rename"
                console.log(file)
            }
        };

        const propsVerso = {
            ...propsRecto,
            action: `${serverName}dashboard/addDocument/papier_identite_idCard_verso/${this.props.userId}`,
        }


        return (
            <div className="national-card-modal">
                <Col xs={{span: 24}} sm={{span: 16, offset: 4}}>
                    <FormattedMessage id="carteNationalModal.title">
                        {(message) =>
                            <h3 className="title">
                                {message}
                            </h3>}
                    </FormattedMessage>

                    <h4 className="sub-title">
                        <FormattedMessage
                            id='idCardModal.subtitle'
                        /> <br/>
                        <FormattedMessage
                            id='idCardModal.maximum_size'
                        />
                    </h4>
                    <Row>
                        <Col xs={{span: 22, offset: 1}} sm={{span: 10}}>
                            <div className="upload-card">
                                <Dragger {...propsRecto}
                                         onChange={this.handleChange.bind(this, "recto")}
                                         style={{
                                             backgroundImage: `url("${serverName}media/${this.props.recto}")`,
                                             backgroundRepeat: 'no-repeat',
                                             backgroundSize: 'cover',
                                         }}>
                                    <Icon type="plus"/>
                                    <FormattedMessage id="carteNationalModal.recto">
                                        {(message) =>
                                            <p className="upload-text">{message}</p>}
                                    </FormattedMessage>
                                </Dragger>
                            </div>
                        </Col>
                        <Col xs={{span: 22, offset: 1}} sm={{span: 10, offset: 2}}>
                            <div className="upload-card">
                                <Dragger {...propsVerso}
                                         onChange={this.handleChange.bind(this, "verso")}
                                         style={{
                                             backgroundImage: `url("${serverName}media/${this.props.verso}")`,
                                             backgroundRepeat: 'no-repeat',
                                             backgroundSize: 'cover',
                                         }}>
                                    <Icon type="plus"/>
                                    <FormattedMessage id="carteNationalModal.verso">
                                        {(message) =>
                                            <p className="upload-text">{message}</p>}
                                    </FormattedMessage>
                                </Dragger>
                            </div>
                        </Col>
                    </Row>

                    <hr/>
                    <Row>
                        <Col xs={{span: 1}} className="start">
                            *
                        </Col>
                        <FormattedMessage id="idCardModal.description">
                            {(message) =>
                                <Col xs={{span: 23}} className="footer-text">
                                    {message}
                                </Col>}
                        </FormattedMessage>
                    </Row>
                </Col>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        showModal2: store.userProfile.documentControl.showModal2,
        userId: store.userProfile.user.basicInfo.userId,
        verso: store.userProfile.user.papier_identite_idCard_verso,
        recto: store.userProfile.user.papier_identite_idCard_recto,
    }
})(CarteNationalModal)