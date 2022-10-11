const Message = require("../../../utils/embeds/MessagesLibrary");
const { EmbedBuilder } = require("discord.js");

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));


test('test Message.error return success embed message', () => {
    const sampleTest = new EmbedBuilder()
        .setColor("#E0322B")
        .setAuthor({ name: "Utilitaire de banissement" })
        .setDescription('Erreur inconnue')
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.error()).toEqual(sampleTest);
});

test('test Message.error with code return success embed message', () => {
    const sampleTest = new EmbedBuilder()
        .setColor("#E0322B")
        .setAuthor({ name: "Utilitaire de banissement" })
        .setDescription('Erreur inconnue')
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.error({ code: 0 })).toEqual(sampleTest);
});

test('test Message.error with code return success embed message', () => {
    const sampleTest = new EmbedBuilder()
        .setColor("#E0322B")
        .setAuthor({ name: "Utilitaire de banissement" })
        .setDescription('Vous avez mis trop de temps a répondre, merci de recommencer la démarche en écrivant /ban [ticket]')
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.error({ code: 1 })).toEqual(sampleTest);
});

test('test Message.error with code return success embed message', () => {
    const sampleTest = new EmbedBuilder()
        .setColor("#E0322B")
        .setAuthor({ name: "Utilitaire de banissement" })
        .setDescription('Merci de relancer une demande d\'unban en indiquant un numéro la prochaine fois')
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.error({ code: 2 })).toEqual(sampleTest);
});

test('test Message.error with message return success embed message', () => {
    const sampleTest = new EmbedBuilder()
        .setColor("#E0322B")
        .setAuthor({ name: "Utilitaire de banissement" })
        .setDescription('test')
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.error({ message: "test" })).toEqual(sampleTest);
});

test('test Message.error without content throw error', () => {
    expect(() => { Message.success({ code: "" }) }).toThrow();
});