import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import Businesspanel from "./Businesspanel";
import "../../styles/style.css";

export default function BusinessEditor(props) {
    const [err, setErr] = useState(null)
    const [cities, setCities] = useState([])
    const [types, setTypes] = useState([]);
    const [list, setList] = useState();

    const getCities = () => {
        var url="https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=2500"
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //data = data.result.records;
                var addedCities = data.result.records.map (e => {
                    var city = String(e["שם_ישוב"]).trim();
                    //if (city.includes(["שבט","יישוב"]))
                    if (city=="נצרת עילית") city="נוף הגליל"
                    return city.replace(")", "QW").replace("(", ")").replace("QW", "(");
                    
                });
                addedCities = addedCities.sort((a, b) => a.localeCompare(b))
                addedCities = addedCities.filter (e => e != "לא רשום")
                setCities (addedCities);
            },
            (currError) => {
                console.log (currError);
            });
    }

    const cancelNewBusinessPanel = () => {
        if (list[list.length - 1]?.gsx$new == true) {
            let arr = [...list];
            arr.pop();
            setList(arr);
        }
    }

    const updateBusiness = async (val, index) => {                    
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { val: val, id: val._id} })
        };

        let res = await fetch('./businessUpdate', requestOptions)
        let json = await res.json();
        
        if (res?.ok == false || res?.ok == undefined || res?.ok == null) {
            console.log (json);
            alert ("לא ניתן לעדכן את הערך");
            return res;
        }
        
        let arr = [...list];
        arr[index] = val;
        setList(arr);

        alert ("העסק עודכן");
        return true;       
    }

    const saveNewBusiness = async (data) => {
        
        delete data.gsx$new
        const dataEntries = Object.entries(data);
        const filtered = dataEntries.filter(([key, value]) => value != undefined && value != null && value);
        data = Object.fromEntries(filtered);

        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: data })
        };
        
        let res = await fetch('./businessCreate', requestOptions)
        let json = await res.json();
        if (res?.ok == false || res?.ok == undefined || res?.ok == null) {
            console.log (json);
            alert ("לא ליצור עסק חדש");
            return res;
        }

        let arr = [...list];
        arr[arr.length - 1] = json;
        setList(arr);

        alert ("העסק " + json.gsx$name + " נוצר");
        console.log (data) 
        return [true, json];       

    } 

    useEffect(() => {
        if (props.err) {
            setErr (props.err);
        }

        else if (list==undefined || list==null ) {
            getCities ();
            setTypes (props.types.sort((a, b) => a.gsx$type.localeCompare(b.gsx$type)))

            var obj = {
                gsx$new: true,
                "gsx$type": "61183dfc6a1cf80ca85fbe66",
                "gsx$name": "עוגלונה",
                "gsx$logo": "https://res.cloudinary.com/foodies/image/upload/v1626119823/Github/62617534_2261881480718332_8696719483412152320_n.png",
                "gsx$logoheight": 200,
                "gsx$logowidth": 300,
                "gsx$city": "נוף הגליל",
                "gsx$phone": "0508106269",
                "gsx$whatsapp": "0508106269",
                "gsx$facebook": "https://www.facebook.com/alona1222/",
                "gsx$instagram": "https://www.instagram.com/alonanaftt_ugalona/",
                "gsx$website": "https://bcard.digital/alona/",
                "gsx$desc": "עוגות בעיצוב אישי * עוגות לכל אירוע * בר מתוקים * עיצוב שולחן מתוקים * עוגות מוס * קאפקייקס * עוגות אישיות * ביצי שוקולד בגדלים שונים * עוגות שמרים * ועוד...",                
                "gsx$link": "1",
                "gsx$active": true
            }
            //setList([...props.businesses, obj]);
            setList(props.businesses);
            //setList([obj]);

        }

    }, [])


    if (err) return <h1>{err}</h1>

    if (cities == undefined || types == undefined || list == undefined) return (<p>null</p>)
    return (
    <React.Fragment>
        <Head>       
        <link rel="canonical" href="https://romanbr87.github.io/index/index.html" />
        <meta name="description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
        <meta name="author" content="https://www.facebook.com/RonenBr60/" />

        <meta property="og:description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
        <meta property="og:url" content="https://romanbr87.github.io/index/index.html" />
        <meta property="og:title" content="אינדקס עסקים" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="אינדקס עסקים" />

        <title>עריכה/הוספת עסקים</title>
        </Head>
        <nav className="navbar navbar-inverse" style={{ textAlign: 'left', marginBottom: "0.05%" }}>
        <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
                <li title="דף הבית"><a href="/"><i className="glyphicon glyphicon-home active"></i> דף הבית</a></li>
                <li title="דף הבית"><a href="/"><i className="glyphicon glyphicon-home active"></i>12</a></li>
            </ul>
            </div>
        </nav>
        <div className="container" style={{ marginTop: '0', paddingTop: '0' }}>
            <div className="row">
            {
                list.map((e,i) => 
                <Businesspanel key={i} index={i} types={types} business={e} cities={cities}
                updateBusiness={updateBusiness} saveNewBusiness={saveNewBusiness}
                cancel={cancelNewBusinessPanel}>
                </Businesspanel>)
            }            
            </div>
        </div>
    </React.Fragment>
    )
}