import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import "../../styles/style.css";

export default function Q1(props) {
    const [def, setDef] = useState(props.type.gsx$type);
    const [val, setVal] = useState('');

    const changeVal = (txt) => {
        if (txt != val) setVal(txt);
    }

    const loadData = () => {
        //alert (def);        
        setVal (def);        
    }

    useEffect(() => {
       if (val == undefined || val == '') loadData();
    }, [])

    return (
     <div className="input-group types-input-group" style={{direction: "ltr", marginBottom: "1%"}}>
        <input type="text" className="form-control input-sm" placeholder="הכנס ערך"
        value={val} onChange={e => changeVal (e.target.value)} />
       <span className="input-group-addon">{val}</span>
     </div>       
    )
}