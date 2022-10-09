const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const disabled_button = (i, pseudo) => {
    return new ButtonBuilder()
        .setCustomId(`setPageInfo ${pseudo} ${i}`)
        .setLabel(`${i}`)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)
};

const enabled_button = (i, pseudo) => {
    return new ButtonBuilder()
        .setCustomId(`setPageStats ${pseudo} ${i}`)
        .setLabel(`${i}`)
        .setStyle(ButtonStyle.Primary);
};

const stats = (number, pseudo, pos = 0) => {
    let btn_list = [];
    for (let i = 0; i < number; i++) {
        if (i == pos) {
            btn_list.push(disabled_button(i, pseudo));
        } else {
            btn_list.push(enabled_button(i, pseudo));
        }
    }
    return new ActionRowBuilder()
        .addComponents(btn_list);
};
module.exports = {
    stats,
};
