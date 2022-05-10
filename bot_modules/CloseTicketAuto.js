const db = require("../utils/db/dbLibrary.js");

module.exports = {
    ticket: function () {

        db.closeAutomatically();

    }
}