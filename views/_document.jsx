import React from 'react';
import {
  Document,
  Head,
  Main,
} from '@react-ssr/express';
import ScriptTag from 'react-script-tag';


export default class extends Document {
  render() {
    return (
      <html dir="rtl" lang="he">
        <Head>
            <meta charset="utf-8" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8" />  
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="viewport" content="width=device-width" />

            <meta name="robots" content="index, follow, noodp, noydir" />
            <meta name="googlebot" content="index, follow, noodp, noydir" />
            <meta name="bingbot" content="index, follow, noodp, noydir" />
            <meta name="generator" content="slidify" />
            <meta name="google" content="notranslate" />

            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
        </Head>
        <body>
          <Main />
          <ScriptTag isHydrating={false} type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
          <ScriptTag isHydrating={false} type="text/javascript" src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></ScriptTag>
          <ScriptTag isHydrating={false} type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" />
        </body>
      </html>
    );
  }
};
