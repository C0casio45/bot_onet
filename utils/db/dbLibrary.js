const DatabaseFactory = require("./dbFactory");

class DbLibrary {

    /**
     * 
     * @param {string} ticketName - name of the ticket
     * @param {string} pseudo - name of the moderator
     * @param {string} discordId - discord id of the moderator
     * @returns - moderator id
     */
    static takeTicket(ticketName, pseudo, discordId) {
        const query = `call bot_onet.create_ticket('${ticketName}', '${pseudo}', '${discordId}');`;
        return new DatabaseFactory(query, function (err, result) {
            if (err) throw err;
            return result
        });
    }

    static closeAutomatically() {
        return new DatabaseFactory(`call bot_onet.close_auto();`, function (err, result) {
            if (err) throw err;
            return result
        });
    }

    /**
     * 
     * @param {number} ticketId - id of the ticket
     * @param {string} pseudoAccuse - name of the accused user
     * @param {string} idFaceit - faceit id of the accused user
     * @param {string} lienPartie - link to the game
     * @param {number} dureeJours - 0 avertissement, 99999 permanent, 1-99998 nombre de jours
     * @param {string} raison - ban reason
     * @returns
     */
    static async closeTicket(ticketId, pseudoAccuse, idAccuse, lienPartie, dureeJours, raison) {
        return new Promise((resolve, reject) => {
            const query = `call bot_onet.close_ticket(${ticketId}, '${pseudoAccuse}', 'https://www.faceit.com/fr/players/${pseudoAccuse}','${idAccuse}', '${lienPartie}', ${dureeJours}, '${raison}', TRUE);`;
            return new DatabaseFactory(query, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    /**
     * 
     * @param {number} ticketId 
     * @returns
     */
    static closeTicketSimp(ticketId) {
        return new Promise((resolve, reject) => {
            return new DatabaseFactory(`call bot_onet.close_ticket_simp(${ticketId});`, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    /**
     * 
     * @returns {Promise} - list of tickets
     */
    static getTicketList() {
        return new Promise((resolve, reject) => {
            return new DatabaseFactory(`call bot_onet.ticket_list();`, function (err, result) {
                if (err) reject(err);
                let tickets = []
                result[0].forEach(ticket => {
                    tickets.push({ name: ticket.Nom, value: `${ticket.idTicket}` });
                })
                resolve(tickets);
            })
        });
    }

    /**
     * 
     * @returns {Promise} - list of banned users
     */
    static getBannedList() {
        return new Promise((resolve, reject) => {
            return new DatabaseFactory(`call bot_onet.banned_list();`, function (err, result) {
                if (err) reject(err);
                let user = []
                result[0].forEach(accuse => {
                    user.push({ name: accuse.Pseudo, value: `${accuse.Pseudo},${accuse.idt},${accuse.ida}` });
                })
                resolve(user);
            })
        });
    }

    /**
     * 
     * @returns {Promise} - list of user to unban
     */
    static getRappelUnbanList() {
        return new Promise((resolve, reject) => {
            return new DatabaseFactory(`call bot_onet.rappel_unban();`, function (err, result) {
                if (err) reject(err);
                resolve(result[0]);
            })
        });
    }

    /**
     * 
     * @returns {Promise} - moderators stats
     */
    static getStats() {
        return new Promise((resolve, reject) => {
            return new DatabaseFactory(`call bot_onet.stats_all();`, function (err, result) {
                if (err) reject(err);
                let stats = {};
                result[0].forEach(ticket => {
                    if (isNaN(stats[ticket.Pseudo])) stats[ticket.Pseudo] = 0;
                    stats[ticket.Pseudo]++;
                });
                resolve(stats);
            });
        });
    }

    /**
     * 
     * @param {number} userId - id of the user
     * @param {string} ticketId - id of the ticket
     * @returns {Promise} - result of the query
     */
    static unbanUser(userId, ticketId) {
        return new Promise((resolve, reject) => {
            return new DatabaseFactory(`call bot_onet.unban(${userId},${ticketId});`, function (err, result) {
                if (err) reject(err);
                resolve(result[0]);
            })
        });
    }

    /**
     * 
     * @param {string} idFaceit Faceit identifier
     * @returns 
     */
    static getAccuseInfo(idFaceit) {
        return new Promise((resolve, reject) => {
            return new DatabaseFactory(`call bot_onet.info_accuse('${idFaceit}');`, function (err, result) {
                if (err) reject(err);
                resolve(result[0]);
            })
        });
    }

}

module.exports = DbLibrary;