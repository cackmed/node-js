const server = require('./server');
const router = require('./router');
const requestHandlers = require('./request-handlers');

const handle = {};
handle['/'] = requestHandlers('./server');
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

server.start(router.route, handle);