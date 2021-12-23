import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import Q1 from "./Q1";
import "../../styles/style.css";

export default function Q(props) {
    const [types, setTypes] = useState([]);
    const [newVal, setNewVal] = useState('');

    /*const submitChange = (val, index) => {
        var arr = [...types];
        arr[index].gsx$type = val;
        setTypes (arr);
    }*/

    const addNewVal = () => {
        //let arr = [...types, { "__v": "0", "_id": "asdasddvssvffdfgdf", gsx$type: newVal}]
        let arr = JSON.parse(JSON.stringify(types));
        arr.push ({ "__v": "0", "_id": "asdasddvssvffdfgdf", gsx$type: newVal});

        let arr1 = arr.sort((a, b) => Math.sign(a.gsx$type.localeCompare(b.gsx$type)));
        arr1 = arr1.sort((a, b) => new Intl.Collator('heb').compare(a.gsx$type, b.gsx$type));
        let arr2 = arr1.map (e => e.gsx$type).join('\n');
        console.log (arr2);
        setTypes (arr);
        setNewVal ("")
    }

    const changeVal = (txt) => {
        setNewVal (txt);
    }

    const findIndexOfTypeById = (ID) => {
        let type = types.find (e => e._id == ID);
        return types.indexOf (type);
    }

    const deleteVal = async (id) => {

        let index = findIndexOfTypeById (id);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: id } )
        };
       
        let val = types[index].gsx$type;

        let res = await fetch('/deletetype', requestOptions)
        let json = await res.json();
        
        if (res.ok != true || res.ok == undefined || res.ok == null) {
            alert ("לא ניתן למחוק את הערך");
            console.log (res);
            return res;
        }
        
        let arr = [...types];
        arr = arr.filter ((e, i) => i != index); 
        //setTypes(undefined);
        setVal(arr);
        alert ("ערך " + val + " נמחק");
        return true;
    
    }

    const updateVal = async (val, id) => {

        let index = findIndexOfTypeById (id);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { val: val, id: id} })
        };
       
        let res = await fetch('./updatetype', requestOptions)
        let json = await res.json();
        
        if (res?.ok == false || res?.ok == undefined || res?.ok == null) {
            console.log (json);
            alert ("לא ניתן לעדכן את הערך");
            return res;
        }
        
        let arr = JSON.parse(JSON.stringify(types));
        arr = [...arr];
        arr[index].gsx$type = val;
        //setTypes(undefined);
        setTypes(arr);
        alert ("הערך עודכן");
        return true;
    
    }

    useEffect(() => {
        if (types==undefined || types==null || types?.length == 0) {
            let dbTypes = [
                { "__v": "0", "_id": "1", gsx$type: "מורה"},
                { "__v": "0", "_id": "2", gsx$type: "מאבטח"},
                { "__v": "0", "_id": "3", gsx$type: "מוזיקאי"},
            ]
            //setTypes (props.types)
            setTypes (dbTypes);
        }
        //else setTypes ([...types])
    }, [])

    return (
    <div>
        <Head>
        <link rel="canonical" href="https://romanbr87.github.io/index/index.html" />
        <meta name="description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
        <meta name="author" content="https://www.facebook.com/RonenBr60/" />

        <meta property="og:description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
        <meta property="og:url" content="https://romanbr87.github.io/index/index.html" />
        <meta property="og:title" content="אינדקס עסקים" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="אינדקס עסקים" />

        <title>"אינדקס עסקים"</title>
        </Head>
        <nav className="navbar navbar-inverse" style={{ textAlign: 'left', marginBottom: "0.05%" }}>
        <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
                <li title="דף הבית"><a href="/"><i className="glyphicon glyphicon-home active"></i> דף הבית</a></li>
            </ul>
            </div>
        </nav>
        <div className="container" style={{ marginTop: '0', paddingTop: '0', textAlign: 'right', direction: 'rtl' }}>
            <div className="maxWidth col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3 col-sm-12 col-xs-12"> 
            <div className="panel panel-info">
                
                <div className="panel-heading" style={{paddingTop: ".5em", paddingBottom: ".5em"}}>
                    <h4 className="title text-center">מסך עריכת סוגי עסקים</h4>
                </div>

                <div className="panel-body">
                {
                    types
                    .map (e => {
                    return <Q1 key={e.gsx$type} type={e}></Q1>
                    })

                }                   
                    
                    <div className="input-group" 
                    style={{direction: "ltr", marginBottom: "1%"}}>

                    <div className="input-group-btn" style={{direction: "ltr"}}>
                        <button className="btn btn-default btn-sm"
                        onClick={e=> { setNewVal('') }}>
                            <i className="glyphicon glyphicon-remove" style={{color: "red"}}></i>
                        </button>
                        <button className="btn btn-default btn-sm" onClick={e => addNewVal(newVal) }>
                            <i className="glyphicon glyphicon-ok" style={{color: "green"}}></i>
                        </button>
                    </div>

                    <input type="text" className="form-control input-sm" placeholder="הכנס ערך"
                    value={newVal} onChange={e => changeVal (e.target.value)} />
                    <span className="input-group-addon">ערך חדש</span>
                    </div>

                </div>

            </div>
            </div>

        </div>
    </div>
    )
}