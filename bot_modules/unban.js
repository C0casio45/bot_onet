const db = require("../utils/db/dbLibrary.js");

module.exports = {
    unban: function (interaction) {

        let ub = interaction.customId.split(" ");
        db.unbanUser(ub[0], ub[1])

    }
}