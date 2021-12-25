import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import "../../styles/style.css";

export default function Businesspanel(props) {

    const [changed, setChanged] = useState ();
    const [defaultData, setDefaultData] = useState(props.business);
    const [localData, setLocalData] = useState();

    const [cities, setCities] = useState(props.cities)
    const [types, setTypes] = useState (props.types);

    const findIndexOfTypeById = (ID) => {
        let type = types.find (e => e._id == ID);
        return types.indexOf (type);
    }

    const onKeyChangeSelVal = (e) => {
        var i = parseInt(e.target.value);
        var key = e.key;
        var code = e.charCode;
        if (key >= 'א' && key <= 'ת') {
            if (key != "ך" && key != "ם" && key != "ן" && key != "ף" && key != "ץ") {
                if ( ((i+1) < cities.length) && (cities[i].startsWith(key) && cities[i+1].startsWith(key)) ) {
     
                    changeVal("gsx$city", cities[i+1]);   
                }           
                
                else {
                    //alert (key)
                    var str = cities.find (e => e.startsWith(key))
                    //changeVal("gsx$city", cities.indexOf(str));
                    changeVal("gsx$city", str);
                }

            }
        
        }

    }

    const loadDefaultValues = () => {
        var obj = {}
        Object.assign(obj, defaultData)        
        setLocalData (obj)
        setChanged (false);
    }
    
    const changeVal = (prop, val) => {      
        var obj = {}
        Object.assign(obj, localData)
        obj[prop] = val
        setLocalData (obj);
        checkValues(obj);
    }


    const checkValues = (data) => {
        var obj = {}
        Object.assign(obj, data)
        //obj.gsx$type = types[data.gsx$type];
        //obj.gsx$city = cities[data.gsx$city];
        
        //var change = (JSON.stringify(props.business) !== JSON.stringify(obj))   
        var change = (Object.entries(defaultData).toString() !== Object.entries(obj).toString());
        
        setChanged (change);
        return change;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        (defaultData?.gsx$new == true) ? 
        addNewBusiness (): updateBusiness ();
    }

    const updateBusiness = async (e) => {
        var res = await props.updateBusiness(localData, props.index);

        if (res) {
            setDefaultData (localData);
            setChanged (false);
        }
        
        else console.log (res);

        return false;
    }

    const addNewBusiness = async (e) => {
        var res = await props.addNewBusiness(localData);

        if (res[0]) {
            let data = {};
            Object.assign(data, res[1])        
            //data.gsx$type = types[data.gsx$type];
            setDefaultData ([]);
            setLocalData ([]);

            setDefaultData (data);
            setLocalData (data);
            setChanged (false);
            console.log (data);
        }

        else console.log (res);

        return false;
    }

    useEffect(() => {
            if ((changed == undefined || changed == null) && !props?.gsx$new) loadDefaultValues();
            /*else setChanged (checkValues(localData))
            loadDefaultValues();*/
            console.log (defaultData)
    }, [])

    if (cities == undefined || types == undefined || localData == undefined) return (<p>null</p>)
    return (
        <form className="col-lg-4 col-md-4  pull-right" onSubmit={ e=> handleSubmit(e) }>

        <div className="panel panel-info">
        <div className="panel-heading" style={{margin: "0", padding: ".25em", paddingBottom: ".5em"}}>
        {
            (defaultData?.gsx$new) ? 
            <h3 className="title text-center">עסק חדש</h3>:
            <h3 className="title text-center">{defaultData.gsx$name}</h3>
        }
        </div>       
        
        <div className="panel-body">

        <div className="formInput row">
        <div className="form-group" style={{ marginTop: "-3%"}}>
        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <label>סוג עסק</label>    
        <select className="form-control input-sm" style={{direction:"rtl"}}
        onChange={e => changeVal("gsx$type", types[e.target.value]._id) }
        value={ findIndexOfTypeById (localData.gsx$type) }>
        {
            types.map((e, j) => {
                return <option key={j} value={j}>{(j+1) + ". " + e.gsx$type}</option> 
            })
        }
        </select>
        </div>

        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <label>שם עסק</label>    
            <div className="input-group-sm">
                <input type="text" className="form-control input-sm" placeholder="שם עסק" 
                value={localData.gsx$name} onChange={e=>changeVal("gsx$name", e.target.value)} style={{direction:"rtl"}} 
                required />
            </div>
        </div>
        </div>
        </div>
   
        <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
            <span className="input-group-addon"><span className="fa fa-fw fa-file-image-o"></span></span>

            <input type="text" className="form-control input-sm" placeholder="קישור ללוגו" required 
            value={localData.gsx$logo} onChange={e=>changeVal("gsx$logo", e.target.value)} style={{direction:"ltr"}} />
        </div>

        <div className="formInput row">
        <div className="form-group">
            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                <input type="number" min="200" max="500" className="form-control input-sm" placeholder="אורך לוגו" required 
                value={localData.gsx$logowidth} onChange={e=>changeVal("gsx$logowidth", e.target.value)} style={{direction:"ltr"}}/>

                <span className="input-group-addon">אורך לוגו</span>
                </div>
            </div>

            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                <input type="number" min="200" max="500" className="form-control input-sm" placeholder="גובה לוגו" required 
                value={localData.gsx$logoheight} onChange={e=>changeVal("gsx$logoheight", e.target.value)} style={{direction:"ltr"}}/>

                <span className="input-group-addon">גובה לוגו</span>
                </div>
            </div>
        </div>
        </div>

        <div className="formInput row" style={{ marginTop: "-4%"}}>
        <div className="form-group">
        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <label>יישוב</label>    
        <select className="form-control input-sm" style={{direction:"rtl"}}
        onChange={e => changeVal("gsx$city", cities[e.target.value]) } onKeyPress={e => onKeyChangeSelVal(e)}
        value={cities.indexOf(localData.gsx$city)} >
            {
                cities.map((e, j) => {
                    return <option key={j} value={j}>{(j+1) + ". " + e}</option> 
                })
            }
            </select>
        </div>

        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <label>כתובת</label>    
            <div className="input-group-sm">
                <input type="text" className="form-control input-sm" placeholder="כתובת" 
                value={localData.gsx$address} onChange={e=>changeVal("gsx$address", e.target.value)} style={{direction:"rtl"}} />
            </div>
        </div>
        
        </div>
        </div>

        <div className="formInput row">
        <div className="form-group">
        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6 formInput">
            <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                <input type="text" className="form-control input-sm" placeholder="טלפון2" maxLength="11" 
                value={localData.gsx$phone2} onChange={e=>changeVal("gsx$phone2", e.target.value)} style={{direction:"rtl"}} />

                <span className="input-group-addon"><span className="fa fa-fw fa-phone"></span></span>
            </div>
        </div>
        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6 formInput">
            <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                <input type="text" className="form-control input-sm" placeholder="טלפון" maxLength="11" required 
                value={localData.gsx$phone} onChange={e=>changeVal("gsx$phone", e.target.value)} style={{direction:"rtl"}} />

                <span className="input-group-addon"><span className="fa fa-fw fa-phone"></span></span>
            </div>
        </div>
        </div>
        </div>

        <div className="formInput row" style={{marginTop: "-2%"}}>
        <div className="form-group">
        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                <input type="text" className="form-control input-sm" placeholder="ווטסאפ" maxLength="11" 
                value={localData.gsx$whatsapp} onChange={e=>changeVal("gsx$whatsapp", e.target.value)} style={{direction:"ltr"}} />

                <span className="input-group-addon"><span className="fa fa-fw fa-whatsapp"></span></span>
            </div>
        </div>
        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                <input type="text" className="form-control input-sm" placeholder="טלפון3" maxLength="11"
                value={localData.gsx$phone3} onChange={e=>changeVal("gsx$phone3", e.target.value)} style={{direction:"ltr"}} />

                <span className="input-group-addon"><span className="fa fa-fw fa-phone"></span></span>
            </div>
        </div>
        </div>
        </div>

        <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
            <span className="input-group-addon"><span className="fa fa-fw fa-envelope-o"></span></span>

            <input type="email" className="form-control input-sm" placeholder="אימייל" 
            value={localData.gsx$email} onChange={e=>changeVal("gsx$email", e.target.value)} style={{direction:"ltr"}} />
        </div>

        <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
            <span className="input-group-addon"><span className="fa fa-fw fa-facebook"></span></span>

            <input type="text" className="form-control input-sm" placeholder="קישור לפייסבוק" 
            value={localData.gsx$facebook} onChange={e=>changeVal("gsx$facebook", e.target.value)} style={{direction:"ltr"}} />
        </div>

        <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
            <span className="input-group-addon"><span className="fa fa-fw fa-instagram"></span></span>

            <input type="text" className="form-control input-sm" placeholder="קישור לאינסטגרם" 
            value={localData.gsx$instagram} onChange={e=>changeVal("gsx$nstagram", e.target.value)} style={{direction:"ltr"}} />
        </div>
        <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
            <span className="input-group-addon"><span className="fa fa-fw fa-globe"></span></span>

            <input type="text" className="form-control input-sm" placeholder="קישור לאתר" 
            value={localData.gsx$website} onChange={e=>changeVal("gsx$website", e.target.value)} style={{direction:"ltr"}} />
        </div>

        <div className="formInput form-group" style={{marginTop: "-2%"}}>
        <label>תיאור קצר</label>    
        <textarea className="form-control" rows="5" cols="111" placeholder="תיאור קצר" required 
        style={{resize: 'unset'}} value={localData.gsx$desc} onChange={e => changeVal("gsx$desc", e.target.value)}></textarea>
        </div>
        
        {
        (defaultData?.gsx$new) ?
        <div className="clearfix" style={{marginTop: "4%"}}>
        <button type="button" className="btn btn-primary btn-md pull-right" onClick={e=>props.cancel(false)}>סגירה</button>    
        <button type="submit" className="btn btn-warning btn-md pull-left" disabled={!changed}>שמירה</button>    
        </div>:
        
        <div className="clearfix" style={{marginTop: "4%"}}>
            <button type="button" className="btn btn-primary btn-md pull-right" onClick={loadDefaultValues}
            disabled={!changed}>ביטול</button>    
            <button type="submit" className="btn btn-warning btn-md pull-left" disabled={!changed}>שמירה</button>    
        </div>

        }           
        
        </div>
        </div>
        
        </form>
    )
}