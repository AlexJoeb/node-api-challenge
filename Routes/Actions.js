const router = require('express').Router();

const projects = require('../data/helpers/projectModel');
const actions = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    return actions.get()
        .then(resp => res.status(200).json(resp))
        .catch(error => res.status(500).json(error));
})

router.get('/:id', validateAction, (req, res) => {
    return actions.get(req.actionObject.id)
        .then(resp => res.status(200).json(resp))
        .catch(error => res.status(500).json(error));
})

router.post('/', validateActionPost, (req, res) => {
    actions.insert(req.actionObject)
        .then(resp => res.status(201).json(resp))
        .catch(error => res.status(500).json(error));
});

router.put('/:id', validateAction, (req, res) => {
    return actions.update(req.actionObject.id, req.body)
        .then(resp => res.status(200).json(resp))
        .catch(error => res.status(500).json(error));
})

router.delete('/:id', validateAction, (req, res) => {
    return actions.remove(req.actionObject.id)
        .then(resp => res.status(200).json(resp))
        .catch(error => res.status(500).json(error));
})

function validateActionPost(req, res, next) {
    if (!req.body || !req.body.project_id || !req.body.description || !req.body.notes) return res.status(400).json({ message: `Please provide 'project_id', 'description', and 'notes' in the boy of the request.` });
    if (req.body.description.length > 128) return res.status(400).json({ message: 'Description must be shorter than 128 characters.' });
    const project_id = parseInt(req.body.project_id);

    return projects.get(project_id)
        .then(resp => {
            if (!resp) return res.status(404).json({ message: `Project (project_id) was not found.` });
            else {
                // Project is valid.
                const { notes, description } = req.body;
                req.actionObject = {
                    project_id,
                    notes,
                    description
                };
                next();
            }
        })
        .catch(error => res.status(500).json(error));
}

function validateAction(req, res, next) {
    if (!req.params.id) return res.status(500).json({ message: `Internal server error. ID Param not found.` });
    else {
        const id = parseInt(req.params.id);
        return actions.get(id)
            .then(resp => {
                if (!resp) return res.status(404).json({ message: `Action was not found.` });
                req.actionObject = resp;
                next();
            })
            .catch(error => {
                console.log(error);
                req.action = null;
                next();
            })
    }
}


module.exports = router;