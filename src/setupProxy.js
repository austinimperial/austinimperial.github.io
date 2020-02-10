const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    try {
        app.use(proxy('/api/*', 
            { 
                target: 'http://localhost:5001/', 
                secure:false
            }
        ));
    } catch(err) {
        console.log(err)
    }
}