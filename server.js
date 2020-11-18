const express = require('express');
const app = express()
app.use(express.static('./dist/duka-app'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: './dist/duka-app' }
    );
});
app.listen(process.env.PORT || 8080);
