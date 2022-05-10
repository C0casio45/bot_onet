const db = require("../dbconnect.js");

class DatabaseFactory {
    constructor(query, callback) {
        if (!database._connectCalled) {
            database.connect();
        }

        database.query(query, function (err, result) {
            if (err) throw err;
            callback(err, result);
        }
        );
    }


}

module.exports = DatabaseFactory;