import React, { Fragment, useState, useEffect } from 'react'
import axios from '../Axios';
import { useParams, useHistory } from 'react-router-dom';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ReactComponent as Arrow } from '../Assets/Arrow.svg';

import Actions from './Actions';

export default function Projects() {

    const [project, setProject] = useState({})

    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        axios.get(`/projects/${params.id}`)
            .then(({ data }) => { 
                setProject(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    const returnHome = () => { 
        history.push('/');
    }

    return (
        <div css={css`color:white;`}>
            {project && (
                <Fragment>
                    <div>
                        <div css={css`
                            display: flex;
                            align-items: center;
                        `}>
                            <Arrow css={css`
                                &:hover{ cursor: pointer;}
                            `}
                            onClick={returnHome}
                            />
                            <h1 css={css`font-size:2rem; font-weight:bold; color:white; margin-left: 15px;`}>{project.name}</h1>
                        </div>
                        <hr css={css`border:0;border:2px solid white;width:90%;margin-left:0;`} />
                    </div>
                    <p css={css`margin-top: 15px;`}>
                        <span css={css`font-weight: bold;`}>Description:</span> {project.description}
                    </p>
                    {project && <Actions actions={project.actions} />}
                </Fragment>
            )}
        </div>
    )
}
