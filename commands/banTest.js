const ban = require("./ban.js");

module.exports = {
    name: "ban_test",
    description: "Méthode pour tester la méthode de banissement",
    async execute(interaction, client) {
        ban.execute(interaction, client, true);
    }
}