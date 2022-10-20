const Message = require("../../../utils/embeds/MessagesLibrary");
const { EmbedBuilder } = require("discord.js");

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

test('test Message.requestGameLink return success embed message', () => {
    const sampleTest = new EmbedBuilder()
        .setColor("#FAE100")
        .setAuthor({ name: "Utilitaire de banissement" })
        .setDescription(`Merci de mettre le lien faceit de **la partie**.`)
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.requestGameLink()).toEqual(sampleTest);
});

test('test Message.requestUserLink return success embed message', () => {
    const sampleTest = new EmbedBuilder()
        .setColor("#FAE100")
        .setAuthor({ name: "Utilitaire de banissement" })
        .setDescription(`Merci de mettre le lien faceit de **l'utilisateur a bannir**.`)
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.requestUserLink()).toEqual(sampleTest);
});

test('test Message.requestMoveToMp return success embed message', () => {
    const sampleTest = new EmbedBuilder()
        .setColor("#FAE100")
        .setAuthor({ name: "Nouvelle entrée de banissement" })
        .setDescription(`Merci d'aller voir vos messages privés`)
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.requestMoveToMp()).toEqual(sampleTest);
});

