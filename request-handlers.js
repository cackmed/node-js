// const querystring = require('querystring'),
import { rename, unlink, createReadStream } from 'fs';
import { IncomingForm } from 'formidable';

function start(response) {
    console.log("Request handler 'start' was called.");

    const body = '<html>' +
'<head>' + 
'<meta http-equiv="Content-Type" ' +
 'content="text/html; charset=UTF-8" />' +
 '</head>' +
'<body>' +
 '<form action="/upload" enctype="multipart/form-data" ' +
 'method="post">' +
 '<input type="file" name="upload" multiple="multiple">' +
 '<input type="submit" value="Upload file" />' +
 '</form>' +
 '</body>' +
 '</html>';

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    const form = new IncomingForm();
    console.log('about to parse');
    form.parse(request, function(error, fields, files) {
        console.log('parsing done');

        rename(files.upload.path, '/tmp/test.png', function(error) {
            if(error) {
                unlink('/tmp/test.png');
                rename(files.upload.path, '/tmp/test.png');
            }
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('received image:<br/>');
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log('Request handler show was called.');
    response.writeHead(200, { 'Content-Type': 'image/png' });
    createReadStream('/tmp/test.png').pipe(response);
}

const _start = start;
export { _start as start };
const _upload = upload;
export { _upload as upload };
const _show = show;
export { _show as show };