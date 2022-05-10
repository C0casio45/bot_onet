import { database } from "../utils/dbconnext.js";
const db = database();

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