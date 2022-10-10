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
        .setCustomId(`setPageInfo ${pseudo} ${i}`)
        .setLabel(`${i}`)
        .setStyle(ButtonStyle.Primary);
};

const show_more = (pseudo) => {
    return new ButtonBuilder()
        .setCustomId(`showMoreInfo ${pseudo} `)
        .setLabel(`Show more`)
        .setStyle(ButtonStyle.Secondary);
};

const info = (number, pseudo, pos = 0) => {
    if (number < 2) return [];
    let btn_list = [];
    let showMore = number > 4 ? true : false;
    number = showMore ? 4 : number;
    for (let i = 0; i < number; i++) {
        if (i == pos) {
            btn_list.push(disabled_button(i, pseudo));
        } else {
            btn_list.push(enabled_button(i, pseudo));
        }
    }
    return [new ActionRowBuilder()
        .addComponents(btn_list)
        .addComponents(showMore ? show_more(pseudo) : null)];
};
module.exports = {
    info,
};
