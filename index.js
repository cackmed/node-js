import { start } from './server';
import { route } from './router';
import requestHandlers, { start as _start, upload, show } from './request-handlers';

const handle = {};
handle['/'] = requestHandlers('./server');
handle['/start'] = _start;
handle['/upload'] = upload;
handle['/show'] = show;

start(route, handle);