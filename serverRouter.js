const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');

	const routeMap = {
		'': 'home.html',
		'about': 'about.html',
		'contact': 'contact.html',
        'index': 'index.html'
	}

	render(res, routeMap[req.url.slice(1)]);
});

function render(res, htmlFile) {
  	fs.stat(`./${htmlFile}`,  (err, stats) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');

  		if(stats) {
		  	fs.createReadStream(htmlFile).pipe(res);
  		} else {
  			res.statusCode = 404;
  			res.end('Sorry, page not found');
  		}
  	});
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});