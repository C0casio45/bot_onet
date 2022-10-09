const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const button_fr = (idModo) => {
    return new ButtonBuilder()
        .setCustomId(`fr ${idModo}`)
        .setLabel("Français")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🇫🇷");
};

const button_en = (idModo) => {
    return new ButtonBuilder()
        .setCustomId(`en ${idModo}`)
        .setLabel("English")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🇬🇧");
};

const tiLanguageSelection = (idModo) => {
    return new ActionRowBuilder()
        .addComponents(button_fr(idModo))
        .addComponents(button_en(idModo));
};
module.exports = { tiLanguageSelection };
