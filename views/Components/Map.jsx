import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { document as Document, Head, Main } from "@react-ssr/express";
import { ReactBingmaps } from 'react-bingmaps';
import "../../styles/App.css";
import "../../styles/style.css";

export default function Map() {
    useEffect(() => {
        console.log (window);
    }, [])

	return (
        [
		<ReactBingmaps 
			bingmapKey = "AgGE7oTc0iPUElUa-F4NpzkLZ6tlkuqWzel6S_bEssF0KggqjWafg3AZxeXkwDxl" > 
		</ReactBingmaps>, <p>{12}</p>]
	);
  }
