import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import "../../styles/style.css";

export default function TypesInputPanel(props) {
    const [val, setVal] = useState('');
    const [disableAccept, setDiasbleAccept] = useState()
    const [disableCancel, setDiasbleCancel] = useState()

    const changeVal = (txt) => {
        if (txt != val) setVal(txt);
        setDiasbleAccept ((txt == props.type.gsx$type) || (txt.trim() == ''))
        setDiasbleCancel (txt == props.type.gsx$type)
    }

    const loadData = () => {
        setDiasbleAccept(true);
        setDiasbleCancel(true);
        setVal (props.type.gsx$type);        
    }

    const deleteVal = async () => {       
        let con = confirm("האם ברצונך למחוק את הערך " + val + "?" );      
        if (con) {
            let res = await props.deleteVal(props.type._id);
        }
    }

    const updateVal = async () => {
        if (val.trim() == '') {
            alert ("לא ניתן לעדכן ערך ריק");
            return;
        }
        
        else {
            let res = await props.updateVal(val, props.type._id);
            if (res == true) {
                setDiasbleAccept(true);
                setDiasbleCancel(true);                    
            }   
        }
    }

    useEffect(() => {
       loadData();
    }, [])

    return (
    <React.Fragment>
     <div className="input-group types-input-group" style={{direction: "ltr", marginBottom: "1%"}}>
        <div className="input-group-btn" style={{direction: "ltr"}}>
            <button className="btn btn-default btn-sm" onClick={deleteVal}>
                <i className="glyphicon glyphicon-trash" style={{color: "blue"}}></i>
            </button>
            <button className="btn btn-default btn-sm" disabled={disableCancel} onClick={loadData}>
                <i className="glyphicon glyphicon-remove" style={{color: "red"}}></i>
            </button>
            <button className="btn btn-default btn-sm" disabled={disableAccept} 
            onClick={updateVal}>
                <i className="glyphicon glyphicon-ok" style={{color: "green"}}></i>
            </button>
        </div>
        <input type="text" className="form-control input-sm" placeholder="הכנס ערך"
        value={val} onChange={e => changeVal (e.target.value)} />
         <span className="input-group-addon">
        {(props.index < 9) ? '0'+(props.index+1) : props.index+1 }</span>
   </div>       
    </React.Fragment>
    )
}