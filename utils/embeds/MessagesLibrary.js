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
        return new MessageFactory(`Merci d'aller voir vos messages privés`).newBan().embed;
    }

    static requestOtherBans(nbEntreeBan, array) {
        array.map(ban => `- Utilisateur ${ban[0]} ${textBuilder(ban[1])}`);
        const content = `Vous avez actuellement ${nbEntreeBan == 1 ? nbEntreeBan + "enregistré" : nbEntreeBan + "enregistrés"} :\n${array.join("\n")}\n\nVoulez vous ajouter une sanction à un autre utilisateur ?`;
        return new MessageFactory(content);

        function textBuilder(ban) {
            if (ban == 99999) return "ban permanent";
            if (ban == 0) return "averti";
            return `banni pendant ${ban} jours`;
        }
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
    static unbanLogAuto(pseudo, modoId) {
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

    /**
     * 
     * @param {string} pseudo - pseudo de l'accuse
     * @param {list[sanction]} sanctionArray - array of sanction<duration, reason>
     * @returns 
     */
    static accuseInfo(pseudo, sanctionArray) {
        if (sanctionArray.length == 0) return new MessageFactory(`Aucune sanction n'a été enregistrée pour l'utilisateur ${pseudo}`).embed;
        const rawSactionArray = sanctionArray.map(sanction => `- ${textBuilder(sanction.duree)} | ${sanction.raison}`).join("\n");
        let content = `L'utilisateur ${pseudo} a déjà été report pour les raisons suivantes :\n${rawSactionArray}`;
        return new MessageFactory(content).embed;

        function textBuilder(ban) {
            if (ban == 99999) return "perm";
            if (ban == 0) return "averti";
            return `${ban}j`;
        }
    }
}
module.exports = Message;