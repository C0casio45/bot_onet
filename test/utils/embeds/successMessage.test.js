const Message = require("../../../utils/embeds/MessagesLibrary");
const { EmbedBuilder } = require("discord.js");

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

test('test Message.success return success embed message', () => {
    const content = "test succès";
    const sampleTest = new EmbedBuilder()
        .setColor("#34EBA1")
        .setAuthor({ name: "Utilitaire de banissement" })
        .setDescription(content)
        .setTitle(null)
        .setURL(null)
        .addFields([])
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();

    expect(Message.success(content)).toEqual(sampleTest);
});

test('test Message.success without content throw error', () => {
    expect(() => { Message.success() }).toThrow();
});