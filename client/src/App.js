import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import "./reset.css";

import Projects from './Components/Projects';

export default function() {
  return (
    <div className='app' css={css`
      background: skyblue;
      height: 100vh; width: 100vw;

      padding: 3vw;
    `}>
      <Router>
        <h1 css={css`font-size:2rem; font-weight:bold; color:white;`}>Lambda Projects</h1>
        <hr css={css`border:0;border:2px solid white;width:90%;margin-left:0;`}/>
        <Switch>
          <Route exact path='/' component={Projects} />
        </Switch>
      </Router>
    </div>
  )
}
