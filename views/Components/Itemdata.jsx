import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch} from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import Item from "./Item";
import '../../styles/App.css';
import '../../styles/style.css';
import '../../styles/bootstrap-social.css'


export default function Itemdata(props) {
  return (
    <React.Fragment>
      <Head>
        <link rel="canonical" href="Businessindex.herokuapp.com" />
        <meta name="description" content={props.data.gsx$desc + props.data.gsx$desc2} />
        <meta name="author" content="https://www.facebook.com/RonenBr60/" />

        <meta property="og:description" content={props.data.gsx$desc + props.data.gsx$desc2} />
        <meta property="og:url" content="Businessindex.herokuapp.com" />
        <meta property="og:title" content={props.data.gsx$name} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="אינדקס עסקים" />
        <meta property="og:image" content={props.data.gsx$logo} />
        
        <title>{props.data.gsx$name}</title>
      </Head>
      <nav className="navbar navbar-inverse" style={{ textAlign: 'left', margin: "0 -0.1% 0 0", padding: "0" }}>
        <div className="container-fluid">
          <ul className="nav navbar-nav navbar-right">
            <li title="דף הבית"><a href="/"><i className="glyphicon glyphicon-home active"></i> דף הבית</a></li>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ textAlign: 'right', direction: 'rtl' }}>
        <Item className="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4 col-sm-12 col-xs-12" 
        data={props.data } ua={props.ua} isLinkable={false} />
      </div>
    </React.Fragment>
  );
}
