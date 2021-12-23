import React from "react";
import { Head } from "@react-ssr/express";

const Error = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Error</title>
      </Head>
      <h1>{ props.message }</h1>
      <h2>{ props.error.status}</h2>
      <pre>{ props.error.stack}</pre>
    </React.Fragment>
  );
};

export default Error;
