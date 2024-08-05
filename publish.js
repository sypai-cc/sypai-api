const http = require('http');
const querystring = require('querystring');
const fetch = require('node-fetch');

http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const { username, password, post_title, post_content, post_category, tag } = JSON.parse(body);
                const validationResponse = await fetch('http://localhost:5565/validate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const { success } = await validationResponse.json();
                if (success) {
                    const formData = querystring.stringify({
                        post_title,
                        post_content,
                        post_category,
                        tag,
                        post_author: username // 使用从程序C传来的username作为post_author
                    });
                    const response = await fetch('https://sypai.cc/Locoy.php/?action=save&secret={你的在Locoy.php的密钥}', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: formData
                    });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(await response.text());
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid credentials' }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
}).listen(5566, () => console.log('Server B running at http://localhost:5566/'));
