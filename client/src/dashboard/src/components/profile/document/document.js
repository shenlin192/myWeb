import React from 'react';
import {FormattedMessage} from 'react-intl';

//css
import './document.css';

//media
import idCardIcon from './media/idCardIcon.svg';
import domicileIcon from './media/domicileIcon.svg';
import enCours from './media/enCours.png';
import verifie from './media/verifie.png';
import refuse from './media/refuse.png';

// component
import IdCardModal from './idCardModal';

//redux
import {connect} from "react-redux";
import {setDocumentModal, setJustificatifDomicile} from "../../../actions/documentActions"
import {setSecondNub} from "../../../actions/userProfileActions"

// global
import {serverName, hasDocument, lang} from '../../../global';
import {getCookie} from "../../../actions/getCookie";

//antd
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Modal from 'antd/lib/modal';
import Upload from 'antd/lib/upload';

// iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


class Document extends React.Component {

    switchModal(type) {
        if (type === 1) {
            if (!(this.props.passport_valid === 1 || this.props.passport_valid === 2
                || this.props.papier_identite_valid === 1 || this.props.papier_identite_valid === 2)) {
                this.props.dispatch(setDocumentModal())
            }
        } else if (type === 2) {
            this.props.dispatch(setDocumentModal())
        }
    }

    uploadSuccess(src) {
        this.props.dispatch(setJustificatifDomicile(src))
    }

    componentDidUpdate() {
        let count = this.completePersent(1);
        this.props.dispatch(setSecondNub(
            (() => {
                if (count === 0) {
                    return 0;
                } else if (count === 49) {
                    return 1;
                } else if (count === 50 || 98) {
                    return 2;
                } else if (count === 99) {
                    return 3;
                } else if (count === 100) {
                    return 4;
                }
            })()
        ));
    }

    handleChange (info) {

        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });
        return 0;

        const status = info.file.status;
        if (status !== 'uploading') {

        }

        let content = lang["document.upload_status"];

        if (status === 'done') {
            console.log(info)
            iziToast.success({
                title: 'Success',
                message: content[0],
                position: 'topCenter',
            });

            this.uploadSuccess(info.file.response)

        } else if (status === 'error') {
            console.log(info)
            iziToast.error({
                title: 'Error',
                message: content[1],
                position: 'topCenter',
            });
        }
    };

    completePersent(type) {
        let identiteFlag = hasDocument(this.props.papier_identite_passport) || (hasDocument(this.props.papier_identite_idCard_recto) && hasDocument(this.props.papier_identite_idCard_verso))
        let justificatifFlag = hasDocument(this.props.justificatif_domicile);

        if (type === 0) {
            let count = 3;
            if (this.props.papier_identite_valid === 1 && this.props.justificatif_domicile_valid === 1) {
                return 100
            } else {
                // not both valid
                if (identiteFlag) {
                    count += 48;
                }
                if (justificatifFlag) {
                    count += 48;
                }
                return count
            }
        }

        if (type === 1) {
            let count = 0;
            if (this.props.papier_identite_valid === 1 && this.props.justificatif_domicile_valid === 1) {
                return 100
            } else {
                // not both valid
                if (this.props.papier_identite_valid === 1 || this.props.justificatif_domicile_valid === 1) {
                    count += 1
                }

                if (identiteFlag) {
                    count += 49;
                }
                if (justificatifFlag) {
                    count += 49;
                }
                return count
            }
        }
    }

    render() {

        const Dragger = Upload.Dragger;

        const draggerProps = {
            name: 'file',
            multiple: false,
            showUploadList: false,
            action: `${serverName}dashboard/addDocument/justificatif_domicile/${this.props.userId}`,
            headers: {'X-CSRFToken': getCookie("csrftoken")},
            accept: 'application/pdf, image/jpg, image/jpeg, image/png',
            disabled: (() => {
                return (this.props.justificatif_domicile_valid === 1 || this.props.justificatif_domicile_valid === 2)
            })()
        };

        return (
            <div className="document">
                <h2 className="section-title2">
                    <FormattedMessage
                        id='document.documents_justificatifs'
                    />
                </h2>

                <p className="progress-title">
                    <FormattedMessage
                        id='COMPLETE'
                    /> {(this.completePersent.bind(this, 1))()}%</p>
                <Progress percent={(this.completePersent.bind(this, 0))()} status="active" showInfo={false}
                          strokeWidth={12} className="progress-doc"/>

                <Row type="flex" justify="space-around">
                    <Col xs={{span: 23}} sm={{span: 9}} className="document-card"
                         onClick={this.switchModal.bind(this, 1)}>
                        <img src={idCardIcon} alt="id card icon"
                             style={{marginTop: '53px', marginBottom: '31px', height: '59px'}}/>
                        <FormattedMessage id="document.identite">
                            {(message) =>
                                <h4>{message}</h4>}
                        </FormattedMessage>
                        {
                            (() => {
                                if (this.props.papier_identite_valid === 0 && this.props.passport_valid === 0) {
                                    return (
                                        <FormattedMessage id="document.add">
                                            {(message) =>
                                                <p style={{paddingBottom: '30px'}}>{message}</p>}
                                        </FormattedMessage>
                                    )
                                } else if (this.props.papier_identite_valid === 1 || this.props.passport_valid === 1) {
                                    return (
                                        <Row>
                                            <img src={enCours} alt="enCours" style={{
                                                display: "inline-block",
                                                width: "8px",
                                                marginRight: "5px",
                                                marginBottom: "2px"
                                            }}/>
                                            <FormattedMessage id="document.en_verifier">
                                                {(message) =>
                                                    <p style={{
                                                        paddingBottom: '30px',
                                                        color: '#FC981D',
                                                        display: "inline-block"
                                                    }}>{message}</p>}
                                            </FormattedMessage>
                                        </Row>
                                    )
                                } else if (this.props.papier_identite_valid === 2 || this.props.passport_valid === 2) {
                                    return (
                                        <Row>
                                            <img src={verifie} alt="verifie" style={{
                                                display: "inline-block",
                                                width: "14px",
                                                marginRight: "5px",
                                                marginBottom: "2px"
                                            }}/>
                                            <FormattedMessage id="document.verifier">
                                                {(message) =>
                                                    <p style={{
                                                        paddingBottom: '30px',
                                                        color: '#1AC92F',
                                                        display: "inline-block"
                                                    }}>{message}</p>}
                                            </FormattedMessage>
                                        </Row>
                                    )
                                } else if (this.props.papier_identite_valid === 3 || this.props.passport_valid === 3) {
                                    return (
                                        <Row>
                                            <img src={refuse} alt="refuse" style={{
                                                display: "inline-block",
                                                width: "8px",
                                                marginRight: "5px",
                                                marginBottom: "2px"
                                            }}/>
                                            <FormattedMessage id="document.reject">
                                                {(message) =>
                                                    <p style={{
                                                        paddingBottom: '30px',
                                                        color: '#F41010',
                                                        display: "inline-block"
                                                    }}>{message}</p>}
                                            </FormattedMessage>
                                        </Row>
                                    )
                                }
                            })()
                        }
                    </Col>


                    <Col xs={{span: 23}} sm={{span: 9}} className="document-card">
                        <div style={{width: '100%'}}>
                            <Dragger {...draggerProps}
                                     onChange={this.handleChange}
                            >
                                <img src={domicileIcon} alt="domicile icon"
                                     style={{marginTop: '38px', marginBottom: '15px', height: '90px'}}/>
                                <FormattedMessage id="document.justificatif">
                                    {(message) =>
                                        <h4>{message}</h4>
                                    }
                                </FormattedMessage>
                                {/* optimise this if have time */}
                                {
                                    (() => {
                                        if (this.props.justificatif_domicile_valid === 0) {
                                            return (
                                                <FormattedMessage id="document.add">
                                                    {(message) =>
                                                        <p style={{paddingBottom: '30px'}}>{message}</p>}
                                                </FormattedMessage>
                                            )
                                        } else if (this.props.justificatif_domicile_valid === 1) {
                                            return (
                                                <Row>
                                                    <img src={enCours} alt="enCours" style={{
                                                        display: "inline-block",
                                                        width: "8px",
                                                        marginRight: "5px",
                                                        marginBottom: "2px"
                                                    }}/>
                                                    <FormattedMessage id="document.en_verifier">
                                                        {(message) =>
                                                            <p style={{
                                                                paddingBottom: '30px',
                                                                color: '#FC981D',
                                                                display: "inline-block"
                                                            }}>{message}</p>}
                                                    </FormattedMessage>
                                                </Row>
                                            )
                                        } else if (this.props.justificatif_domicile_valid === 2) {
                                            return (
                                                <Row>
                                                    <img src={verifie} alt="verifie" style={{
                                                        display: "inline-block",
                                                        width: "14px",
                                                        marginRight: "5px",
                                                        marginBottom: "2px"
                                                    }}/>
                                                    <FormattedMessage id="document.verifier">
                                                        {(message) =>
                                                            <p style={{
                                                                paddingBottom: '30px',
                                                                color: '#1AC92F',
                                                                display: "inline-block"
                                                            }}>{message}</p>}
                                                    </FormattedMessage>
                                                </Row>
                                            )
                                        } else if (this.props.justificatif_domicile_valid === 3) {
                                            return (
                                                <Row>
                                                    <img src={refuse} alt="refuse" style={{
                                                        display: "inline-block",
                                                        width: "8px",
                                                        marginRight: "5px",
                                                        marginBottom: "2px"
                                                    }}/>
                                                    <FormattedMessage id="document.reject">
                                                        {(message) =>
                                                            <p style={{
                                                                paddingBottom: '30px',
                                                                color: '#F41010',
                                                                display: "inline-block"
                                                            }}>{message}</p>}
                                                    </FormattedMessage>
                                                </Row>
                                            )
                                        }
                                    })()
                                }
                            </Dragger>
                        </div>
                    </Col>
                </Row>
                <Modal
                    wrapClassName="documentCard"
                    title="document d'identite modal"
                    visible={this.props.showModal}
                    onCancel={ this.switchModal.bind(this, 2)}
                    footer={null}
                >
                    <IdCardModal/>
                </Modal>
                {/*<Modal*/}
                    {/*wrapClassName="documentCard"*/}
                    {/*title="document d'identite modal"*/}
                    {/*visible={this.props.showModal}*/}
                    {/*onCancel={ this.switchModal.bind(this, 2)}*/}
                    {/*footer={null}*/}
                {/*>*/}
                    {/*<DomicileModal/>*/}
                {/*</Modal>*/}
            </div>
        )
    }
}


export default connect((store) => {
    return {
        showModal: store.userProfile.documentControl.showModal,
        userId: store.userProfile.user.basicInfo.userId,

        papier_identite_idCard_recto: store.userProfile.user.papier_identite_idCard_recto,
        papier_identite_idCard_verso: store.userProfile.user.papier_identite_idCard_verso,
        papier_identite_passport: store.userProfile.user.papier_identite_passport,
        papier_identite_valid: store.userProfile.user.papier_identite_valid,
        passport_valid: store.userProfile.user.passport_valid,

        justificatif_domicile: store.userProfile.user.justificatif_domicile,
        justificatif_domicile_valid: store.userProfile.user.justificatif_domicile_valid,
    }
})(Document)