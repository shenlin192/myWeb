/**
 * Created by shenlin on 6/8/17.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {lang, emailCheck, serverName} from '../../global';
import {getCookie} from '../../actions/getCookie'
import axios from "axios";
import iziToast from 'izitoast'

import './base.css';
import facebookLogo from './media/facebook.png';
import twitterLogo from './media/twitter.png';
import linkedinLogo from './media/linkedin.png';
import googleLogo from './media/google.png';
import youtubeLogo from './media/youtube.png';
import amfLogo from './media/amfLogo.png';

axios.defaults.headers.post['X-CSRFToken'] = getCookie("csrftoken");

export default class Footer extends React.Component {

    handleClick() {
        let email = window.document.getElementById("emailInscriptionNews").value;
        let messages = lang["footer.izi"];
        if (emailCheck(email) === 0) {
            axios.post(`${serverName}inscription/news/ajax/`, {'email': email}, {}).then((response) => {
                iziToast.success({
                    title: 'OK',
                    message: messages[0],
                    position: 'topCenter',
                });
            }).catch((err) => {
                iziToast.error({
                    title: 'Error',
                    message: messages[1],
                    position: 'topCenter',
                });
            })
        } else {
            iziToast.error({
                title: 'Error',
                message: messages[2],
                position: 'topCenter',
            });
        }
    }

    render() {
        return (
            <footer className="container-fluid" style={{paddingTop: '40px', paddingBottom: '80px'}}>
                <div className="liens">
                    <div className="compress">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="lab col-lg-6">
                                        <FormattedMessage id="footer.top1">
                                            {(message) => <label> {message}</label>}
                                        </FormattedMessage>
                                    </div>
                                    <div className="inscris col-lg-6">
                                        <div className="row">
                                            <div className="inscris-bar col-xs-7">
                                                <FormattedMessage id="footer.top2">
                                                    {(message) => <input id="emailInscriptionNews" type="email"
                                                                         className="form-control"
                                                                         placeholder={message}/>}
                                                </FormattedMessage>
                                            </div>
                                            <div className="inscris-button col-xs-5">
                                                <FormattedMessage id="footer.top3">
                                                    {(message) => <button className="btn btn-warning" type="button"
                                                                          id="inscriptionNewsValidation"
                                                                          onClick={this.handleClick.bind(this)}>{message}</button>}
                                                </FormattedMessage>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="lab col-lg-6">
                                        <FormattedMessage id="footer.top3">
                                            {(message) => <label className="lab2">{message}</label>}
                                        </FormattedMessage>
                                    </div>
                                    <div className="social-button col-lg-6">
                                        <a href="https://www.facebook.com/Hoolders?fref=ts" target="new"><img
                                            alt="facebookLogo" src={facebookLogo}/></a>
                                        <a href="https://twitter.com/Hoolders" target="new"><img alt="facebookLogo"
                                                                                                 src={twitterLogo}/></a>
                                        <a href="https://www.linkedin.com/company-beta/2940363/" target="new"><img
                                            alt="linkedinLogo" src={linkedinLogo}/></a>
                                        <a href="https://plus.google.com/117122131005916945539" target="new"><img
                                            alt="googleLogo" src={googleLogo}/></a>
                                        <a href="https://www.youtube.com/user/Hoolders/videos" target="new"><img
                                            alt="youtubeLogo" src={youtubeLogo}/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="compress">
                    <div className="contact col-lg-4">
                        {
                            (() => {
                                let content = [];
                                lang["footer.contact"].forEach((e) => {
                                    content.push(
                                        <h4 style={{color: '#656a6d', marginTop: '10px', marginBottom: '10px'}}>{e}</h4>
                                    );
                                });
                                return content
                            })()
                        }
                        <div className="contact-image-container">
                            <img src={amfLogo} alt="M"/>
                        </div>
                        <h6 style={{color: '#656a6d', marginTop: '10px', marginBottom: '10px'}}>
                            {lang["footer.contact.tag1"]}
                        </h6>
                        <h5 style={{
                            color: '#656a6d',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}>{lang["footer.contact.tag2"]} <br/> {lang["footer.contact.tag3"]}</h5>
                    </div>

                    <div className="info col-lg-2">
                        <h3 style={{marginTop: '20px', marginBottom: '10px'}}>{lang["footer.hoolders"]}</h3>
                        <br/>
                        <a href="/qui_sommes_nous_hoolders_plateforme_co_funding/">
                            <h4>{lang["footer.hoolders.items"][0]}</h4></a>
                        <a href="/view/crowdfunding/"><h4>{lang["footer.hoolders.items"][1]}</h4></a>
                        <a href="/team-presentation/"><h4>{lang["footer.hoolders.items"][2]}</h4></a>
                        <a href="/hooldersclub/"><h4>{lang["footer.hoolders.items"][3]}</h4></a>
                        <a href="/hooldersSante/"><h4>{lang["footer.hoolders.items"][4]}</h4></a>
                        <a href="/jury-presentation/"><h4>{lang["footer.hoolders.items"][5]}</h4></a>
                        <a href="/contact/"><h4>{lang["footer.hoolders.items"][6]}</h4></a>
                        <a href="/view/legal/"><h4>{lang["footer.hoolders.items"][7]}</h4></a>
                    </div>

                    <div className="info col-lg-2">
                        <h3 style={{marginTop: '20px', marginBottom: '10px'}}>{lang["footer.hoolders"]}</h3>
                        <br/>
                        <a href="/les_habitudes_des_francais_loterie_bourse_co_funding/">
                            <h4>{lang["footer.hoolders.items"][0]}</h4></a>
                        <a href="/devenir_investisseur/"><h4>{lang["footer.hoolders.items"][1]}</h4></a>
                        <a href="/defiscalisation_reduire_son_ir_en_investissant_sur_Hoolders/">
                            <h4>{lang["footer.hoolders.items"][2]}</h4></a>
                        <a href="/defiscalisation_reduire_son_isf_2016_en_investissant_sur_Hoolders/">
                            <h4>{lang["footer.hoolders.items"][3]}</h4></a>
                        <a href="/defiscalisation_reduire_ses_impots_grace_au_PEA_PME/">
                            <h4>{lang["footer.hoolders.items"][4]}</h4></a>
                        <a href="#amf" title="Avertissement" data-toggle="modal" data-target="#amf">
                            <h4>{lang["footer.hoolders.items"][5]}</h4></a>
                    </div>

                    <div className="info col-lg-2">
                        <h3 style={{marginTop: '20px', marginBottom: '10px'}}>{lang["footer.financer"]}</h3>
                        <br/>
                        <a href="/les_criteres_de_selections_pour_une_levee_de_fonds_en_co_funding_sur_hoolders/">
                            <h4>{lang["footer.financer.items"][0]}</h4></a>
                        <a href="/view/criteres-de-selection-pour-levee-de-fonds-sur-Hoolders/">
                            <h4>{lang["footer.financer.items"][1]}</h4></a>
                        <a href="/view/comment-reussir-sa-levee-de-fonds/"><h4>{lang["footer.financer.items"][2]}</h4>
                        </a>
                        <a href="http://eligibilite.hoolders.com/"><h4>{lang["footer.financer.items"][3]}</h4></a>
                    </div>

                    <div className="info col-lg-2">
                        <h3 style={{marginTop: '20px', marginBottom: '10px'}}>{lang["footer.aller"]}</h3>
                        <br/>
                        <a href="/crowdfunding_live_rencontre_investisseur_entrepreneur_hoolders_co_funding/">
                            <h4>{lang["footer.aller.items"][0]}</h4></a>
                        <a href="/presse/"><h4>{lang["footer.aller.items"][1]}</h4></a>
                        <a href="http://blog.hoolders.com/" target="new"><h4>{lang["footer.aller.items"][2]}</h4></a>
                        <a href="/glossaire/"><h4>{lang["footer.aller.items"][3]}</h4></a>
                        <a href="/view/faq/"><h4>{lang["footer.aller.items"][4]}</h4></a>
                        <a href="/media/image/cgvhoolders.pdf" target="new"><h4>{lang["footer.aller.items"][5]}</h4></a>
                        <h5>{lang["footer.aller.items"][6]} <br/><a>{lang["footer.aller.items"][7]}</a></h5>
                    </div>
                </div>
            </footer>
        )
    }
}