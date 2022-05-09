const { MessageEmbed } = require('discord.js');
const db = require("../utils/dbconnect.js");

module.exports = {
    ticket: function () {

        if (!db._connectCalled) {
            db.connect();
        }
        db.query(`call bot_onet.close_auto();`, function (err, result) {
            if (err) throw err;

        });


    }
}