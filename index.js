const express = require('express');
const server = express();

const ProjectsRouter = require('./Routes/Projects');
const ActionsRouter = require('./Routes/Actions');

server.use(express.json());

server.use('/api/projects', ProjectsRouter);
server.use('/api/actions', ActionsRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}.`));