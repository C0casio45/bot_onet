class Message {
    constructor(content, author = "Utilitaire de banissement", color = "normal") {
        this.description = content;
        this.author = author;

        switch (color) {
            case "error":
                this.color = "#F58B00";
                break;
            case "success":
                this.color = "#00ff00";
                break;
            default:
                this.color = "#e34c3b";
                break;
        }

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