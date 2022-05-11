const con = require("../dbconnect.js");
const db = con.database();

class DatabaseFactory {
    /**
     * 
     * @param {string} query - mysql query to execute
     * @param {function} callback - callback function
     */
    constructor(query, callback) {
        if (!db._connectCalled) {
            db.connect();
        }

        db.query(query, function (err, result) {
            if (err) throw err;
            callback(err, result);
        }
        );
    }


}

module.exports = DatabaseFactory;