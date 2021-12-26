import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import Businesspanel from "./Businesspanel";
import "../../styles/style.css";

export default function BusinessEditor(props) {
    const [err, setErr] = useState(null)
    const [cities, setCities] = useState(null)
    const [types, setTypes] = useState([]);
    const [list, setList] = useState([]);

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

    const newBusinessPanel = (val) => {
        if (val == false && list[0]?.gsx$new == true) {
            let arr = [...list];
            arr.shift();
            setList(arr);
        }

        else if (val == true && list[0]?.gsx$new != true) {
            var obj = {
                gsx$new: true,
                "gsx$type": "61183dfc6a1cf80ca85fbe66",
                "gsx$name": "מיסטר דונאטס",
                "gsx$logo": "https://res.cloudinary.com/foodies/image/upload/v1624734522/Github/3e654910-26fb-40e7-b7ee-0ec5cee146c4.jpg",
                "gsx$logoheight": 200,
                "gsx$logowidth": 200,
                "gsx$city": "נוף הגליל",
                "gsx$address": "גלבוע 1", 
                "gsx$email": "mr.donuts.n@gmail.com",
                "gsx$phone": "0504488719",
                "gsx$facebook": "https://www.facebook.com/%D7%9E%D7%99%D7%A1%D7%98%D7%A8-%D7%93%D7%95%D7%A0%D7%90%D7%98%D7%A1-%D7%A1%D7%A0%D7%99%D7%A3-%D7%A0%D7%95%D7%A3-%D7%94%D7%92%D7%9C%D7%99%D7%9C-100366768147503/",
                "gsx$desc": "חנות קינוחים יוגורט וגלידה",                
                "gsx$link": "2",
            }
            
            let arr = [];
            arr = arr.concat(obj).concat(list);
            setList (arr);
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

    const addNewBusiness = async (data) => {        
        delete data.gsx$new
        const dataEntries = Object.entries(data);
        const filtered = dataEntries.filter(([key, value]) => value != undefined && value != null && value);
        data = Object.fromEntries(filtered);
        data.gsx$active = true;
        data.gsx$link = String(list.length);
        
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

        else if (list?.length==0 || cities?.length==0 || types?.length==0) {

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

            getCities ();
            setTypes (props.types.sort((a, b) => a.gsx$type.localeCompare(b.gsx$type)))
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
            <li title="עסק חדש"><a href="javascript:void(0)" onClick={e => newBusinessPanel (true) }>עסק חדש</a></li>
            <li title="דף הבית"><a href="/"><i className="glyphicon glyphicon-home active"></i> דף הבית</a></li>
            </ul>
        </div>
        </nav>
        
        <div className="container" style={{ marginTop: '0', paddingTop: '0' }}>
            <div className="row">
            {
                list.map((e,i) => 
                <Businesspanel key={e.gsx$name} index={i} types={types} business={e} cities={cities}
                updateBusiness={updateBusiness} addNewBusiness={addNewBusiness}
                cancel={newBusinessPanel}>
                </Businesspanel>)
            }            
            </div>
        </div>
    </React.Fragment>
    )
}