var app = require('./config/express')();


app.listen(app.get('port'), function(){
    console.log(`Express Server on port ${app.get('port')}`);
})

module.exports = app;