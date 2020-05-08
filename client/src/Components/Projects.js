import React, { useState, useEffect } from 'react'
import axios from '../Axios';
import { useHistory } from 'react-router-dom';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export default function Projects() {

    const [projects, setProjects] = useState([])

    const history = useHistory();

    useEffect(() => {
        axios.get('/projects')
            .then(({ data }) => {
                setProjects(data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleClick = id => {
        history.push(`/${id}`);
    }

    return (
        <div css={css`
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
        `}>
            <h1 css={css`font-size:2rem; font-weight:bold; color:white;`}>Lambda Projects</h1>
            <hr css={css`border:0;border:2px solid white;width:90%;margin-left:0;`}/>
            {
                projects.map(project => (
                    <div css={css`
                        flex-basis: 100%;
                        color: white;
                        margin-top: 15px;
                        padding: 5px;
                        border: 2px solid white;
                        &:hover{
                            cursor: pointer;
                        }
                    `} onClick={() => handleClick(project.id)} key={project.id}>
                        <p
                            css={css`
                                font-weight:bold;
                            `}
                        >{project.name}</p>
                        <p
                            css={css`
                                display: block;
                                background: white;
                                color: skyblue;
                                padding: 5px;
                                margin-top: 5px;
                            `}
                        >Description: {project.description}</p>
                    </div>
                ))
            }
        </div>
    )
}
