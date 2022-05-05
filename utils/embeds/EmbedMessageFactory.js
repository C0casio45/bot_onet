const { MessageEmbed } = require('discord.js');

class Message {
    constructor(content, author = "Utilitaire de banissement", color = "#e34c3b") {
        this.description = content;
        this.author = author;
        this.color = color;
    }
    error(){
        this.setColor("#F58B00");
    }
    success(){
        this.setColor("#00ff00");
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
        return new MessageEmbed()
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