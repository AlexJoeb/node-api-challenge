import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Axios from '../Axios';

export default function Actions({ actions }) {

    return (
        <div>
            <p css={css`
                border: 2px solid white;
                padding: 5px;
                margin: 15px 0;
                display: inline-block;
            `}>Directions</p>
            <ol css={css`
                list-style: upper-roman;
            `}>
                {actions && actions.map(action => <li css={css`& + &{ margin-top: 5px;} ${action.completed ? 'text-decoration: strike-through;' : ''}`} key={action.id}>{action.description}</li>)}
            </ol>
        </div>
    )
}
