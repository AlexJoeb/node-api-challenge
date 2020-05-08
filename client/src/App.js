import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import "./reset.css";

import Projects from './Components/Projects';
import Project from './Components/Project';

export default function() {
  return (
    <div className='app' css={css`
      background: skyblue;
      height: 100vh; width: 100vw;

      padding: 3vw;
    `}>
      <Router>
        <Switch>
          <Route exact path='/' component={Projects} />
          <Route path='/:id' component={Project} />
        </Switch>
      </Router>
    </div>
  )
}
