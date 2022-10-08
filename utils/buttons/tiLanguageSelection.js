const { MessageActionRow, MessageButton } = require("discord.js");

const button_fr = (idModo) => {
    return new MessageButton()
        .setCustomId(`fr ${idModo}`)
        .setLabel("Français")
        .setStyle("PRIMARY")
        .setEmoji("🇫🇷");
};

const button_en = (idModo) => {
    return new MessageButton()
        .setCustomId(`en ${idModo}`)
        .setLabel("English")
        .setStyle("PRIMARY")
        .setEmoji("🇬🇧");
};

const tiLanguageSelection = (idModo) => {
    return new MessageActionRow()
        .addComponents(button_fr(idModo))
        .addComponents(button_en(idModo));
};
module.exports = { tiLanguageSelection };
