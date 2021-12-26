import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import List from './List';
import "../../styles/style.css";

export default function HomePage(props) {
    const [err, setErr] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [list, setList] = useState([]);
    const [types, setTypes] = useState([]);
    const [k, setK] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [search, setSearch] = useState ('')
    const [cities, setCities] = useState()
    const [city, setCity] = useState()

        
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchText: searchText })
        };
        fetch('./getBusinessesBySearch', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log (data);
                setList(soryByAtrr(data, "gsx$name"))
                setErr(null)
                setIsLoaded(true)
                setSearch (searchText);
            },
                (currError) => {
                    setTypes(null)
                    setErr(currError)
                    setIsLoaded(false)
                    setSearch ('');
                });
    }

    const refresh = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(soryByAtrr(data.businesses, "gsx$name"))
                setList(soryByAtrr(data.businesses, "gsx$name"));
                setTypes(soryByAtrr(data.types, "gsx$type"))
                setIsLoaded(true)
                setErr(null)
                setSearch ('')
                setSearchText ('')
            },
                (currError) => {
                    setTypes(null)
                    setErr(currError)
                    setIsLoaded(false)
                    setSearch ('');
                });
    }

    const soryByAtrr = (arr, attr) => {
        arr = arr.sort((a, b) => {
            let res = a[attr].localeCompare(b[attr])
            return res;
        })
        return arr;
    }

    const findIndexOfTypeById = (ID) => {
        let type = types.find (e => e._id == ID);
        return type.gsx$type;
    }

    const filterAlphabeticaly = (l, arr) => { return arr.filter(item => item.gsx$name.charAt(0) === l) }
    const filterByType = (type, arr) => { return arr.filter(item => findIndexOfTypeById(item.gsx$type) === type) }

    const text = "ברוכים הבאים לפיילוט של אינדקס העסקים של נוף הגליל. כאן תוכלו למצוא מידע עדכני ומפורט ככל האפשר על העסקים השונים בנוף הגליל"



    useEffect(() => {
        setCities (getCities());

        if (props.err) {
            setIsLoaded (false);
            setErr (props.err);
        }

        else {
            var b = soryByAtrr(props.businesses, "gsx$name");
            for (let i = 0; i < 0; i++) 
                b.push(b[0])

            setList(b);
            setTypes(soryByAtrr(props.types, "gsx$type"))
            setIsLoaded(true)
        }
    }, [])


    if (err) return <h1>{err}</h1>
    else if (!isLoaded || cities == undefined) {
        return <div/>;
    } else {
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

            <title>"אינדקס עסקים"</title>
            </Head>
            <nav className="navbar navbar-inverse navbar-fixed-top" style={{ margin: '0', padding: '0' }}>
            <div className="container-fluid pull-right">
                <form className="nav navbar-nav navbar-form" role="search" onSubmit={handleSubmit}>
                    <div className="form-group input-group input-group-sm" style={{ direction: "ltr"}}>

                        <input type="text" className="form-control" placeholder="חיפוש" name="חיפוש" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <div className="input-group-btn" style={{ direction: 'ltr'}}>
                            <button className="btn btn-md" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                            <button className="btn btn-md" type="button" onClick={refresh} title="רענון הדף" style={{ margin: "0% 2% 0% 2%" }}><i className="glyphicon glyphicon-refresh"></i></button>
                        </div>
                    </div>
                </form>
            </div>
            </nav>
            
            <div className="container" style={{ marginTop: '0', paddingTop: '0', textAlign: 'right', direction: 'rtl' }}>
                <div className="jumbotron" style={{ padding: '0', borderRadius: '0' }}>
                    <h1 className="title" id="title" style={{ textAlign: 'center', textDecoration: 'underline' }}>אינדקס עסקים</h1>
                    <p>{text}</p>
                </div>

                {               
                (1==2) ? 
                <div className="form-group">
                <select className="form-control" style={{direction:"rtl"}}
                onChange={e => setCity(cities[e.target.value]) }
                value={cities.indexOf(city)}>
                {
                    cities.map((e, j) => {
                        return <option key={j} value={j}>{(j+1) + ". " + e}</option> 
                    })
                }
                </select>
                </div> : ''
                }
                
                {
                    (list.length == 0 && search != '') ? <h2 className="pageTitle">לא נמצאו תוצאות החיפוש של "{ search }" </h2> : 
                    <div className="row">
                    <div className="col-lg-4 col-md-4 col-lg-offset-8 col-md-offset-8">
                    <div className="form-group">
                    <label>חיפוש לפי </label>
                    <select className="form-control input-sm" onChange={(e) => setK(e.target.value)} style={{direction:"rtl"}}>
                        <option value="0">הצג את כל העסקים ביחד</option>
                        <option value="1">לפי סדר אלפבתי</option>
                        <option value="2">לפי קטגוריות</option>
                    </select>
                    </div>
                    </div>
                    </div>
                }
                {
                    (list.length == 0) ? '' :
                    (k == 0) ? <List key={0} list={list} filterBy={undefined} ua={props.ua} search={search}></List> :
                    (k == 1) ? <List key={1} list={list} filterBy={("אבגדהוזחטיכלמנסעפצקרשת").split('')} filterFunc={filterAlphabeticaly} ua={props.ua} search={search}></List> :
                    (k == 2) ? <List key={2} list={list} filterBy={types.map(t => t.gsx$type)} filterFunc={filterByType} ua={props.ua} search={search}></List> : ''
                }
            </div>
        </React.Fragment>
        )
    }
}
