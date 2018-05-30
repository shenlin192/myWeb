/**
 * Created by shenlin on 6/14/17.
 */
import React, {Component} from 'react'
import Slider from 'react-slick'
import {FormattedMessage} from 'react-intl';

//redux
import {connect} from "react-redux";

// Truncate
import Truncate from 'react-truncate';
import sanitizeHtml from 'sanitize-html';

// import './projectOfTheWeek.css';

//bootstrap
import {Row, Col, ProgressBar} from 'react-bootstrap'


//ImageFallback
import ReactImageFallback from "react-image-fallback"
import fallback_profile from "./media/fallback_profile.jpg";
import fallback_background from "./media/fallback_background.jpg";
import ArrowRight from "./media/arrow-right.svg"


//global
import {serverName, addSpace} from '../../global'


function PrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                height: "30px",
                left: "-10px",
                zIndex: 1,
                display: 'block',
                transform: 'rotateY(180deg) translateY(-10px)',
                background: `url('${ArrowRight}') no-repeat`,
            }}
            onClick={onClick}
        >

        </div>
    );
}


function NextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                height: "30px",
                right: "-10px",
                display: 'block',
                transform: 'rotateY(0deg) translateY(-10px)',
                background: `url('${ArrowRight}') no-repeat`
            }}
            onClick={onClick}
        >
        </div>
    );
}


class ProjectsSuivi extends Component {

    getDynamicClass(domain) {
        if (domain === "Objets Connectés")
            return "thumbnail-container objets-connectes";
        if (domain === "Silver Economie")
            return "thumbnail-container silver-economie";
        if (domain === "Santé")
            return "thumbnail-container sante";
        if (domain === "Autres")
            return "thumbnail-container autres";
    }

    render() {

        const settings = {
            className: 'center',
            // centerMode: true,
            dots: true,
            infinite: true,
            centerPadding: '60px',
            slidesToShow: 3,
            speed: 500,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {breakpoint: 768, settings: {slidesToShow: 1}},
                {breakpoint: 1280, settings: {slidesToShow: 2}},
            ]
        };

        // const serverName = "http://dev2.hoolders.com";

        return (
            <div className="slider-container">
                <p>{this.props.fetched}</p>
                <FormattedMessage id="projetsSuivi.title">
                    {(message) =>
                        <h2 className="section-title" style={{marginBottom: "-5px"}}>{message}</h2>}
                </FormattedMessage>


                <Slider {...settings}>
                    {this.props.projects.map((project, index) =>

                        <div key={index} >

                            <div data-index={index} className={
                                this.getDynamicClass(project.activity_domain)
                            }>
                                <div className="thumbnail">
                                    <div className="background img-background"
                                         style={{
                                             backgroundImage: `url('${project.imageResponsive}'),
                                             url('${fallback_background}')`
                                         }}
                                    >
                                        <div className="masque">
                                            <h3>{project.contractor.firstName} {project.contractor.lastName}</h3>

                                            {/*<div>*/}
                                            {/*{(()=>{*/}
                                            {/*let dirty = '<p>just for test</p>';*/}
                                            {/*let clean = sanitizeHtml(dirty);*/}
                                            {/*return {clean}*/}
                                            {/*})()}*/}
                                            {/*</div>*/}

                                            <Truncate lines={1} ellipsis={<span>...</span>}>
                                                <p dangerouslySetInnerHTML={{__html: project.invadeQuestion}}></p>
                                            </Truncate>
                                        </div>
                                    </div>

                                    <ReactImageFallback
                                        src={serverName + project.contractor.photo}
                                        fallbackImage={fallback_profile}
                                        alt="profile"
                                        className="img-profile"/>


                                    <Row className="tags">
                                        {
                                            project.defisc.map((defisc, index) =>
                                                <div className="tag" key={index}>
                                                    {defisc.name}
                                                </div>
                                            )
                                        }
                                    </Row>


                                    <div className="metiers">
                                        {project.activity_domain}
                                    </div>


                                    <div className="caption">
                                        <h3>{project.name}</h3>
                                        <div className="content">
                                            <Truncate lines={2} ellipsis={<span>...</span>}>
                                                <p dangerouslySetInnerHTML={{__html: project.invadeQuestion}}></p>
                                            </Truncate>
                                        </div>

                                        <hr/>

                                        <FormattedMessage id="projetsSuivi.tag1">
                                            {(message) =>
                                                <h4>
                                                    {addSpace(project.searchedAmount)}
                                                    {message}
                                                </h4>}
                                        </FormattedMessage>

                                        <ProgressBar now={project.sum_reservations / project.searchedAmount * 100}/>
                                        <Row className="chiffre">
                                            <FormattedMessage id="projetsSuivi.tag2">
                                                {(message) =>
                                                    <Col xs={6} sm={6} md={6} lg={6} className="chiffres">
                                                        <span>{addSpace(Math.round(project.sum_reservations))}€</span>
                                                        <br/> {message} </Col>}
                                            </FormattedMessage>
                                            <FormattedMessage id="projetsSuivi.tag3">
                                                {(message) =>
                                                    <Col xs={6} sm={6} md={6} lg={6} className="chiffres">
                                                        <span>{project.supporter_collection}</span>
                                                        <br/> {message} </Col>}
                                            </FormattedMessage>
                                        </Row>
                                    </div>

                                    <div className="etat">
                                        <div className="etat-content">{project.status}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </Slider>
            </div>
        );
    }
}

export default connect((store) => {
    return {
        projects: store.projectsSuivi.projects,
        fetched: store.projectsSuivi.fetched,
    }
})(ProjectsSuivi);
