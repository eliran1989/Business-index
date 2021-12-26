import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import window from 'global'

import '../../styles/App.css';
import '../../styles/style.css';
import '../../styles/bootstrap-social.css'

export default function Item(props) {

    //console.log (props.data);

    const whatsappURL = () => {
        return (props.ua.match(/Android/i)
            || props.ua.match(/webOS/i)
            || props.ua.match(/iPhone/i)
            || props.ua.match(/iPad/i)
            || props.ua.match(/iPod/i)
            || props.ua.match(/BlackBerry/i)
            || props.ua.match(/Windows Phone/i)
        ) ? 'whatsapp://' : 'https://web.whatsapp.com/';
    }

    const fullAddress = () => 
        (props.data?.gsx$address == undefined) ? props.data.gsx$city :
        props.data.gsx$address + ", " + props.data.gsx$city;

    //------------------------------------------------------------------------        
    const setBg = () => {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }
      
    return (
        <div className={(props.className == '' ? '' : props.className)}>
            <div className="panel panel-info">
                <div className="panel-heading" style={{paddingTop: ".5em", paddingBottom: ".5em"}}>
                    {
                        (props.isLinkable) ? 
                        <a href={"/page/" + props.data.gsx$link} ><h3 className="title text-center">{props.data.gsx$name}</h3></a>:
                        <h3 className="title text-center">{props.data.gsx$name}</h3>
                    }
                </div>
                <div className="panel-body">
                    <div className="has-success has-feedback" style={{ height: '200px', textAlign: "center" }}>
                        <img className="logo" src={props.data.gsx$logo} style={{ width: props.data.gsx$logowidth + "px", height: props.data.gsx$logoheight + "px" }} />
                    </div>
                    <h1 className="text caption" style={{ fontSize: "medium", width: "100%" }}>{props.data.gsx$desc}</h1>
                    
                    <div className="row" style={{ height: '35px' }}>
                        <div className="buttonDiv col-lg-3 col-md-3 col-xs-3">
                            <a title="אתר" href={(props.data.gsx$website == '') ? 'javascript:void(0)' : props.data.gsx$website} className="btn btn-social-icon btn-facebook">
                                <span className="fa fa-fw fa-globe"></span>
                            </a>
                        </div>
                        <div className="buttonDiv col-lg-3 col-md-3 col-xs-3">
                            <a title="דף פייסבוק" href={props.data.gsx$facebook == '' ? 'javascript:void(0)' : props.data.gsx$facebook} className="btn btn-social-icon btn-facebook">
                                <span className="fa fa-fw fa-facebook"></span>
                            </a>
                        </div>
                        <div className="buttonDiv col-lg-3 col-md-3 col-xs-3">
                            <a title="דף אינסטגרם" href={props.data.gsx$instagram == '' ? 'javascript:void(0)' : props.data.gsx$instagram} className="btn btn-social-icon btn-instagram">
                                <span className="fa fa-fw fa-instagram"></span>
                            </a>
                        </div>
                        <div className="buttonDiv col-lg-3 col-md-3 col-xs-3">
                            <a title="ווטסאפ" href={props.data.gsx$whatsapp == '' ? 'javascript:void(0)' : whatsappURL() + "send?phone=+972" + props.data.gsx$whatsapp} className="btn btn-social-icon btn-instagram" style={{ backgroundColor: "#06d755" }}>
                                <span className="fa fa-fw fa-whatsapp"></span>
                            </a>
                        </div>
                    </div>
                    <hr />
                    <div id="properties" style={{ direction: "ltr", maxHeight: '260px', minHeight:'200px', height: '260px' }}>                     
                        {
                            ['', '2', '3'].map((e,i)=>
                            [<a title={"טלפון"+e} key={i} href={props.data['gsx$phone'+e] == undefined ? 'javascript:void(0)' : "tel:" + props.data['gsx$phone'+e].split(' ')[0]}>
                            <span>{(props.data['gsx$phone'+e] == undefined) ? '' : props.data['gsx$phone'+e]}</span><i className="fa fa-fw fa-phone"></i></a>, <hr/>]
                            )
                        }
                        
                        <a title="כתובת" href={(props.data.gsx$address == '' || props.data.gsx$address == undefined) ? 'javascript:void(0)' : 'http://maps.google.com/maps?q=' + encodeURIComponent(fullAddress().trim().replace(/\r?\n/, ',').replace(/\s+/g, ' ')) }><span>{ fullAddress() }</span><i className="fa fa-fw fa-map-marker"></i></a><hr />
                        <a title="אימייל" href={(props.data.gsx$email == undefined || props.data.gsx$email == '')  ? 'javascript:void(0)' : "mailto:" + props.data.gsx$email}><span>{props.data.gsx$email == '' ? '' : props.data.gsx$email}</span><i className="fa fa-fw fa-envelope-o"></i></a><hr />

                        {
                            (props.data.gsx$time == undefined) ? '' : 
                            props.data.gsx$time.split("@@").map((e, i) => <a key={i} className="time" href="javascript:void(0)" title="שעות פעילות"><span style={{ textAlign: 'left' }}>{e}</span><i className="fa fa-fw fa-clock-o"></i><hr /></a>)
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
