const { BaseRepository } = require("./base_repository");
const { faceit } = require("../../config.json");

class FaceitRepository extends BaseRepository {
    constructor() {
        super({
            hostname: "api.faceit.com",
            headers: {
                "Authorization": `Bearer ${faceit.token}`,
                "Content-Type": "application/json",
            },
        });
    }

    /**
     * 
     * @param {string} userId - user id
     * @param {string} reason - reason of the ban
     * @returns {Promize<bool>} - return true if user has been banned
     */
    async banPlayer(userId, reason) {
        // POST https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        // Content-Type: application/json
        // Content-Length: {length}
        // Body:
        // {"hubId":"HUB_ID","reason":"REASON","userId":"USER_ID"}

        return new Promise(async (resolve, rejects) => {
            const data = JSON.stringify({
                hubId: faceit.hubId,
                reason: reason,
                userId: userId,
            });
            super.post(`/hubs/v1/hub/${faceit.hubId}/ban/${userId}`, data);

            let message = Buffer.concat(chunks).toString();
            const r = JSON.parse(message);
            if (r.error == "invalid_token") {
                console.log(r);
                rejects("invalid token");
            }
            if (typeof r.errors != "undefined") {
                console.log(r);
                rejects(`Le joueur ${userNickname} est déjà banni`);
            }
            resolve(r);
        });


    }
    /**
     * 
     * @param {string} userId - user id
     * @param {string} pseudo - user nickname
     * @returns {Promise<bool>} - return true if user has been unbanned
     */
    async unbanPlayer(userId, pseudo) {
        // DELETE https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        return new Promise(async (resolve, rejects) => {
            let deleteResponse = await super.delete(`/hubs/v1/hub/${faceit.hubId}/ban/${userId}`);

            if (deleteResponse == "") return resolve(true);

            deleteResponse = JSON.parse(deleteResponse);
            if (deleteResponse.errors[0].message.startsWith("The ban with guid user:")) {
                rejects(`Le joueur ${pseudo} n'est actuellement pas banni.`);
            } else {
                rejects("Erreur inconnue");
            }
        });
    }

    async SpecificBan() {
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?userNickname={nickname}&offset=0&limit=1
        // Authorization: Bearer {token}
    }
    async BanList() {
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?offset=0&limit=50
        // Authorization: Bearer {token}
    }
}

class OpenFaceitRepository extends BaseRepository {
    constructor() {
        super({
            hostname: "open.faceit.com",
            headers: {
                "Authorization": `Bearer ${faceit.clientAPIKey}`,
                "Content-Type": "application/json",
            },
        });
    }

    /**
     * 
     * @param {string} pseudo - The nickname of the user
     * @returns {Promise<JSON>} - The user informations
     */
    async getUserDatas(pseudo) {
        // GET https://api.faceit.com/data/v4/search/players?nickname=test&offset=0&limit=50
        // Authorization: Bearer {token}
        return new Promise(async (resolve, rejects) => {
            let userDatas = await super.get(`/data/v4/players?nickname=${pseudo}`);
            userDatas = JSON.parse(userDatas);
            if (userDatas.errors != undefined) {
                if (userDatas.errors[0].message == "The resource was not found.") {
                    rejects(`Le joueur ${pseudo} n'a pas été trouvé.`);
                } else {
                    rejects("Erreur inconnue");
                }
            } else {
                resolve(userDatas);
            }
        });
    }

}

module.exports = { OpenFaceitRepository, FaceitRepository };