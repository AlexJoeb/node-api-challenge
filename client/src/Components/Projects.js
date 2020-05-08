import React, { useState, useEffect } from 'react'
import axios from '../Axios';

export default function Projects() {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get('/projects')
            .then(resp => {
                console.log(resp);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            
        </div>
    )
}
