const DatabaseFactory = require("./dbFactory");

class DbLibrary {

    /**
     * 
     * @param {string} ticketName 
     * @param {string} pseudo 
     * @param {string} discordId 
     */
    static takeTicket(ticketName, pseudo, discordId) {
        const query = `call bot_onet.create_ticket('${ticketName}', '${pseudo}', '${discordId}');`;
        new DatabaseFactory(query);
    }

    static closeAutomatically() {
        new DatabaseFactory(`call bot_onet.close_auto();`);
    }

    /**
     * 
     * @param {number} ticketId 
     * @param {string} pseudoAccuse 
     * @param {string} lienPartie 
     * @param {number} dureeJours - 0 avertissement, 99999 permanent
     * @param {string} raison 
     */
    static closeTicket(ticketId, pseudoAccuse, lienPartie, dureeJours, raison) {
        const query = `call bot_onet.close_ticket(${ticketId}, '${pseudoAccuse}', 'https://www.faceit.com/fr/players/${pseudoAccuse}', '${lienPartie}', ${dureeJours}, '${raison}', TRUE);`;
        new DatabaseFactory(query);
    }

    /**
     * 
     * @param {number} ticketId 
     */
    static closeTicketSimp(ticketId) {
        new DatabaseFactory(`call bot_onet.close_ticket_simp(${ticketId});`);
    }

    static getTicketList() {
        return new Promise((resolve, reject) => {
            new DatabaseFactory(`call bot_onet.ticket_list();`, function (err, result) {
                if (err) reject(err);
                let tickets = []
                result[0].forEach(ticket => {
                    tickets.push({ name: ticket.Nom, value: `${ticket.idTicket}` });
                })
                resolve(tickets);
            })
        });
    }

    static getBannedList() {
        return new Promise((resolve, reject) => {
            new DatabaseFactory(`call bot_onet.banned_list();`, function (err, result) {
                if (err) reject(err);
                let user = []
                result[0].forEach(accuse => {
                    user.push({ name: accuse.Pseudo, value: `${accuse.Pseudo},${accuse.idt},${accuse.ida}` });
                })
                resolve(user);
            })
        });
    }

    static getRappelUnbanList() {
        return new Promise((resolve, reject) => {
            new DatabaseFactory(`call bot_onet.rappel_unban();`, function (err, result) {
                if (err) reject(err);
                resolve(result[0]);
            })
        });
    }

    static getStats() {
        return new Promise((resolve, reject) => {
            new DatabaseFactory(`call bot_onet.stats_all();`, function (err, result) {
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

    static unbanUser(userId, ticketId) {
        return new Promise((resolve, reject) => {
            new DatabaseFactory(`call bot_onet.unban(${userId},${ticketId});`, function (err, result) {
                if (err) reject(err);
                resolve(result[0]);
            })
        });
    }


}

module.exports = DbLibrary;