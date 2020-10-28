describe('Running before all test', () => {
     //Wait for the DB to be started before executing the tests
     before(function (done) {
        app.on("dbStarted", function(){
            done();
        });
    });
})
