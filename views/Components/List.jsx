import React, { useState, useEffect } from 'react';
import Item from "./Item"
import "../../styles/style.css";

export default function List(props) {

    const UI = (attr) => 
        (props.filterFunc(attr, props.list).length != 0) ?
        <React.Fragment>
        <h1 className="pageTitle">{attr}</h1>
        <div className="row" id={attr}>
        {
            props.filterFunc(attr, props.list).map((item, i) => <Item key={item.gsx$link} data={item} ua={props.ua} isLinkable={true}
            className="maxWidth col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right"></Item>)
        }
        </div>
        </React.Fragment> : '';

    return (
        <React.Fragment>
        {
            (props.search !== '') ? <h1 className="pageTitle searchText">תוצאות החיפוש של "{ props.search }"</h1>: ''
        }
        {
            (props.list.length == 0) ? "" : 
            (props.filterBy == undefined) ?             
            <div className="row">
            {
                props.list.map((item, i) => <Item key={i} data={item} ua={props.ua} isLinkable={true}
                className="maxWidth col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right"></Item> )
            } 
            </div> : <div style={{ marginTop: "-2%"}}>{props.filterBy.map(attr => UI(attr))}</div>
        }
        </React.Fragment>
    )
}
