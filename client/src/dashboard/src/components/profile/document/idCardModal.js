/**
 * Created by shenlin on 7/13/17.
 */

import React from 'react';
import {FormattedMessage} from 'react-intl';

//redux
import {connect} from "react-redux";
import {setDocumentModal, setPassport, setCarteNationalModal} from "../../../actions/documentActions"


//css
import './idCardModal.css';

//media
import idCard from './media/idCard.png'
import passport from './media/passport.png'

//component
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Upload from 'antd/lib/upload';
import Modal from 'antd/lib/modal';
import CarteNationalModal from './carteNationalModal';

//global
import {getCookie} from "../../../actions/getCookie";

import {serverName, lang} from '../../../global'


// iziToast
import iziToast from 'izitoast';

const Dragger = Upload.Dragger;

class IdCardModal extends React.Component {

    switchModal() {
        this.props.dispatch(setCarteNationalModal());
    }

    uploadSuccess(src) {
        this.props.dispatch(setPassport(src))
    }

    handleChange(info) {
        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });
        return 0

        const status = info.file.status;
        if (status !== 'uploading') {

        }

        let content = lang["document.upload_status"];

        if (status === 'done') {
            iziToast.success({
                title: 'Success',
                message: content[0],
                position: 'topCenter',
            });
            this.uploadSuccess(info.file.response)

        } else if (status === 'error') {
            iziToast.error({
                title: 'Error',
                message: content[1],
                position: 'topCenter',
            });
        }
    };

    render() {

        const props = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            headers: {'X-CSRFToken': getCookie("csrftoken")},
            action: `${serverName}dashboard/addDocument/papier_identite_passport/${this.props.userId}`,
            accept: 'application/pdf, image/jpg, image/jpeg, image/png',
            disabled: (() => {
                return Boolean(this.props.verso && this.props.recto)
            })()
        };

        return (
            <div className="id-card-modal">

                <Col xs={{span: 24}} sm={{span: 16, offset: 4}}>
                    <FormattedMessage id="idCardModal.title">
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
                                <div className="card-container"
                                     onClick={() => {
                                         if (!this.props.papier_identite_passport) {
                                             this.props.dispatch(setDocumentModal());
                                             this.props.dispatch(setCarteNationalModal());
                                         }
                                     }}>
                                    <img src={idCard} alt="id_card"/>
                                    <FormattedMessage id="idCardModal.card">
                                        {(message) =>
                                            <p className="upload-text">{message}</p>}
                                    </FormattedMessage>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{span: 22, offset: 1}} sm={{span: 10, offset: 2}}>
                            <div className="upload-card">
                                <Dragger {...props} onChange={this.handleChange} style={{
                                    backgroundImage: `url("${serverName}media/${this.props.papier_identite_passport}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}>
                                    <img src={passport} alt="passport"/>
                                    <FormattedMessage id="idCardModal.passport">
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


                <Modal
                    title="Id card modal"
                    visible={this.props.showModal2}
                    onCancel={this.switchModal.bind(this)}
                    wrapClassName="documentCard"
                    footer={null}
                >
                    <CarteNationalModal/>
                </Modal>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        showModal2: store.userProfile.documentControl.showModal2,
        userId: store.userProfile.user.basicInfo.userId,
        papier_identite_passport: store.userProfile.user.papier_identite_passport,
        verso: store.userProfile.user.papier_identite_idCard_verso,
        recto: store.userProfile.user.papier_identite_idCard_recto,

    }
})(IdCardModal)