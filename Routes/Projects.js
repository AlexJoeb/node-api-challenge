const router = require('express').Router();

const db = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    return db.get()
        .then(resp => {
            res.status(200).json(resp);
        })
        .catch(error => res.status(500).json(error));
})

router.get('/:id', validateProject, (req, res) => {
    return res.status(200).json(req.project);
})

router.get('/:id/actions', validateProject, (req, res) => {
    return res.status(200).json(req.project.actions);
})

router.post('/', validateProjectPost, (req, res) => {
    return db.insert(req.project)
        .then(resp => res.status(201).json(resp))
        .catch(error => res.status(500).json(error));
});

router.put('/:id', validateProject, (req, res) => {
    if (!req.body) return res.status(400).json({ message: `Please add information to update to the body of the request.` });
    console.log(req.project);
    return db.update(req.project.id, req.body)
        .then(resp => res.status(200).json(resp))
        .catch(error => res.status(500).json(error));
})

router.delete('/:id', validateProject, (req, res) => {
    return db.remove(req.project.id)
        .then(resp => res.status(200).json(resp))
        .catch(error => res.status(500).json(error));
})

function validateProjectPost(req, res, next) {
    if (!req.body || !req.body.name || !req.body.description) return res.status(400).json({ message: `Please provide 'name' and 'description' in the boy of the request.` });
    const { name, description } = req.body;
    req.project = { name, description };
    next();
}

function validateProject(req, res, next) {
    if (!req.params.id) return res.status(500).json({ message: `Internal server error. ID Param not found.` });
    else {
        const id = parseInt(req.params.id);
        return db.get(id)
            .then(resp => {
                if (!resp) return res.status(404).json({ message: `Project was not found.` });
                req.project = resp;
                next();
            })
            .catch(error => {
                console.log(error);
                req.project = null;
                next();
            })
    }
}

module.exports = router;