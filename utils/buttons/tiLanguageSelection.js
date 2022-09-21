const { MessageActionRow, MessageButton } = require("discord.js");

const button_fr = () => {
    return new MessageButton()
        .setCustomId(`fr`)
        .setLabel("Français")
        .setStyle("PRIMARY")
        .setEmoji("🇫🇷");
};

const button_en = () => {
    return new MessageButton()
        .setCustomId(`en`)
        .setLabel("English")
        .setStyle("PRIMARY")
        .setEmoji("🇬🇧");
};

const tiLanguageSelection = () => {
    return new MessageActionRow()
        .addComponents(button_fr())
        .addComponents(button_en());
};
module.exports = { tiLanguageSelection };
