const MessageFactory = require("./EmbedMessageFactory");

class Message {

    static success(content) {
        return new MessageFactory(content).success().embed;
    }
    static error({ code = 0, message = "" } = {}) {
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
        const rawBanList = array.map(u => `${u.player},${u.duration},${u.reason}`).join("\n")
        array.map(ban => `- Utilisateur ${ban.player} ${this.textBuilder(ban.duration)}`);
        const content = `Vous avez actuellement ${nbEntreeBan == 0 ? nbEntreeBan + " enregistré" : nbEntreeBan + " enregistrés"} :\n${rawBanList}\n\nVoulez vous ajouter une sanction à un autre utilisateur ?`;
        return new MessageFactory(content).embed;
    }

    static requestRaison(pseudo) {
        const content = `Merci d'indiquer la raison du banissement de l'utilisateur : ${pseudo}`;
        return new MessageFactory(content).embed;
    }

    static requestBanDuration(pseudo) {
        const content = `Merci d'indiquer la durée du banissement de l'utilisateur : ${pseudo}\nVous pouvez utiliser les boutons pour bannir de manière permanente ou inscrire la durée`;
        return new MessageFactory(content).embed;
    }

    static banLog(nbEntreeBan, array, userid, ticketName = null) {
        return new MessageFactory().banLog(nbEntreeBan, array, userid, ticketName).embed;
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

    static takeTicketSelection() {
        const content = `Choose you language
        Choisissez votre langue`;
        return new MessageFactory(content, "Hello ! Bonjour !").embed;
    }

    static takeTicket(modo, lang) {
        let content = "";
        let title = "";
        if (lang == "en") {
            title = "Hello !";
            content = `Your ticket has been handled by <@!${modo}>.
                Please send us any information that may help us process your ticket faster.`;
        } else {
            title = "Bonjour !";
            content = `Votre ticket a été pris en charge par <@!${modo}>.
                Merci de nous envoyer toutes les informations qui pourraient nous aider à traiter votre ticket plus rapidement.`;
        }
        return new MessageFactory(content, title).embed;
    }

    /**
     * 
     * @param {String} ticketName Ticket name - ticket-XXXX
     * @returns 
     */
    static closeTicket(ticketName) {
        return new MessageFactory(`Le ${ticketName} a bien été fermé`).embed;
    }

    static statsModerateurList(moderateurArray) {
        return new MessageFactory("List de tout les modérateurs", 'Statistiques des modérateurs')
            .setAddFields(moderateurArray)
            .embed;
    }

    /**
     * 
     * @param {string} pseudo - pseudo de l'accuse
     * @param {list[sanction]} sanctionArray - array of sanction<duration, reason>
     * @returns embed list of sanction
     */
    static accuseInfoList(pseudo, sanctionArray) {
        if (sanctionArray.length == 0) return new MessageFactory(`Aucune sanction n'a été enregistrée pour l'utilisateur ${pseudo}`).embed;
        const rawSactionArray = sanctionArray.map(sanction => `- ${this.textBuilder(sanction.duree)} | ${sanction.raison}`).join("\n");
        let content = `L'utilisateur ${pseudo} a déjà été report pour les raisons suivantes :\n${rawSactionArray}`;
        return new MessageFactory(content).embed;
    }


    /**
     * 
     * @param {String} pseudo - pseudo de l'accuse
     * @param {String} sanctionArray - array of sanction<duration, reason>
     * @param {int} position - position of the sanction in the array
     * @returns embed saction info at pos
     */
    static accuseInfoListCarrousel(pseudo, sanctionArray, position) {
        if (sanctionArray.length == 0) return new MessageFactory(`Aucune sanction n'a été enregistrée pour l'utilisateur ${pseudo}`).embed;
        const content = `L'utilisateur a déjà été report pour les raisons suivantes :`;
        const sanctionDesc = [{
            name: "Appliqué le :",
            value: new Date(sanctionArray[position].timecode * 1000).toLocaleString(),
        },
        {
            name: "Durée :",
            value: `${this.textBuilder(sanctionArray[position].duree)}`,
        },
        {
            name: "Raison :",
            value: sanctionArray[position].raison,
        },
        {
            name: "Modérateur :",
            value: sanctionArray[position].Pseudo,
        },
        {
            name: "Ticket :",
            value: sanctionArray[position].Nom,
        }
        ];
        return new MessageFactory(content)
            .setTitle(pseudo)
            .setTitleUrl(`https://www.faceit.com/fr/players/${pseudo}`)
            .setAddFields(sanctionDesc)
            .embed;
    }

    /**
     * 
     * @param {int} ban - ban duration
     * @returns Human readable ban duration
     */
    static textBuilder(ban) {
        if (ban == 99999) return "perm";
        if (ban == 0) return "averti";
        return `${ban}j`;
    }
}
module.exports = Message;
