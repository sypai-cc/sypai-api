const http = require('http');

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/validate') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const { username, password } = JSON.parse(body);
                const validationResponse = await fetch('https://sypai.cc/wp-json/custom/v1/validate-credentials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const validationResult = await validationResponse.json();
                res.writeHead(validationResponse.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(validationResult));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
}).listen(5565, () => console.log('Server A running at http://localhost:5565/'));