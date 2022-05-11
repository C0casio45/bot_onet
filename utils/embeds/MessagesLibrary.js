const MessageFactory = require("./EmbedMessageFactory");

class Message {

    static success(content) {
        return new MessageFactory(content).success().embed;
    }
    static error(code = 0, message = "") {
        return new MessageFactory().error(code, message).embed;
    }

    static requestGameLink() {
        return new MessageFactory(`Merci de mettre le lien faceit de **la partie**.`).embed;
    }

    static requestUserLink() {
        return new MessageFactory(`Merci de mettre le lien faceit de **l'utilisateur a bannir**.`).embed;
    }

    static requestMoveToMp() {
        return new MessageFactory(`Merci d'aller voir vos messages privés`).rappelUnban().embed;
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
        return new MessageFactory(content).embed;
    }

    static requestBanDuration(pseudo) {
        const content = `Merci d'indiquer la durée du banissement de l'utilisateur : ${pseudo}\nVous pouvez utiliser les boutons pour bannir de manière permanente ou inscrire la durée`;
        return new MessageFactory(content).embed;
    }

    static banLog(nbEntreeBan, array, userid, unban) {
        return new MessageFactory().banLog(nbEntreeBan, array, userid, unban).embed;
    }

    /***
   * @param pseudo {string}
   * @param modo {string} - discord modo id
   */
    unbanLogAuto(pseudo, modoId) {
        const content = `Le joueur ${pseudo} a été débanni par <@!${modoId}>.`;
        return new MessageFactory(content).embed;
    }

    /**
     * 
     * @param {string} pseudo - pseudo de l'accuse
     * @param {string} modoId - discord modo id
     */
    static unbanLog(pseudo, duree, date) {
        const content = `Le joueur **${pseudo}** a été banni pour une durée de **${duree} jours** le ${date}.
        Il a été débanni a ce jour.`;
        return new MessageFactory(content, "Rappel Unban").embed;
    }

    static takeTicket(modo) {
        const content = `Ton ticket a été pris en charge par <@!${modo}>.
        Merci de nous transmettre toutes les informations qui pourraient nous aider a traiter votre ticket plus rapidement.`;
        return new MessageFactory(content, "Bonjour !").embed;
    }

    static closeTicket(ticketName) {
        return new MessageFactory(`Le ${ticketName} a bien été fermé`).embed;
    }
}
module.exports = Message;