const initDb = require("./mongodb/db").initDb;
const getDb = require("./mongodb/db").getDb;
const app = require("express")();
const port = 3001;

app.use("/", exampleRoute);

initDb(function (err) {
    app.listen(port, function (err) {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port " + port);
    });
});

function exampleRoute(req, res) {
    const db = getDb();
    //Do things with your database connection
    res.json(results);
};
