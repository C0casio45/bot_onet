class Message {
    constructor(content) {
        this.description = content;
        this.color = "#e34c3b";
        this.author = "Utilitaire de banissement";
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    setAuthor(author) {
        this.author = author;
        return this;
    }
    get embed() {
        new MessageEmbed()
        .setColor(this.color)
        .setAuthor({ name: this.author })
        .setDescription(this.description)
        .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
        .setTimestamp();
    }
    get raw() {
        return this.author + ": " + this.description;
    }
    
}
module.exports = Message;