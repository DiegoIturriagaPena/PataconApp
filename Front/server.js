const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = 10002 || process.env.PORT;
app.use(express.static(__dirname+'/dist/pataconfront'));
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname));
});
const server = http.createServer(app);
server.listen(port);