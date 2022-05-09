const MessageFactory = require("./EmbedMessageFactory");

class Message {
    static { }

    static success(content) {
        return new MessageFactory(content).success().embed();
    }
    static error(code = 0, message = "") {
        return new MessageFactory().error(code, message).embed();
    }

    static requestGameLink() {
        return new MessageFactory(`Merci de mettre le lien faceit de **la partie**.`).embed();
    }

    static requestUserLink() {
        return new MessageFactory(`Merci de mettre le lien faceit de **l'utilisateur a bannir**.`).embed();
    }

    static requestMoveToMp() {
        return new MessageFactory(`Merci d'aller voir vos messages privés`).rappelUnban().embed();
    }

    static requestOtherBans(nbEntreeBan, array) {
        const isAvertissement = banDuration == 0 ? "averti" : `banni pendant ${ban[1]} jours`;
        array.map(ban => `- Utilisateur ${ban[0]} ${ban[1] == 99999
            ? "ban permanent"
            : isAvertissement
            }`)
        const content = `Vous avez actuellement ${nbEntreeBan} enregistrés :\n${array.join("\n")}\n\nVoulez vous ajouter une sanction à un autre utilisateur ?`;
        return new MessageFactory(content);
    }

    static requestRaison(pseudo) {
        const content = `Merci d'indiquer la raison du banissement de l'utilisateur : ${pseudo}`;
        return new MessageFactory(content).embed();
    }

    static requestBanDuration(pseudo) {
        const content = `Merci d'indiquer la durée du banissement de l'utilisateur : ${pseudo}\nVous pouvez utiliser les boutons pour bannir de manière permanente ou inscrire la durée`;
        return new MessageFactory(content).embed();
    }

    static banLog(nbEntreeBan, array, userid, unban) {
        return new MessageFactory().banLog(nbEntreeBan, array, userid, unban).embed();
    }
}
module.exports = Message;