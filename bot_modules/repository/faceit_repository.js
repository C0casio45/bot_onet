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
    async banPlayerById(userId, reason) {
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
            let message = await super.post(`/hubs/v1/hub/${faceit.hubId}/ban/${userId}`, data);
            message = JSON.parse(message);
            if (message.error == "invalid_token") {
                console.log(message);
                rejects("invalid token");
            }
            if (typeof message.errors != 'undefined') {
                console.log(message);
                rejects(`Le joueur est déjà banni`);
            }
            resolve(message);
        });
    }

    /**
     * 
     * @param {string} pseudo - user nickname
     * @param {string} reason - reason of the ban
     * @returns {Promise<bool>} - return true if user has been banned
     */
    async banPlayerByNickname(pseudo, reason) {
        return new Promise(async (resolve, rejects) => {

            const dataPlayer = await new OpenFaceitRepository().getUserDatas(pseudo)
                .catch(err => {
                    rejects(err);
                });
            if (typeof dataPlayer == 'undefined') rejects("Erreur inconnue");
            const result = await new FaceitRepository().banPlayerById(dataPlayer.player_id, reason)
                .catch(err => {
                    rejects(err);
                });

            if (typeof result != 'undefined') {
                resolve(true);
            } else {
                rejects("Erreur inconnue")
            }
        });
    }

    /**
     * 
     * @param {string} userId - user id
     * @param {string} pseudo - user nickname
     * @returns {Promise<bool>} - return true if user has been unbanned
     */
    async unbanPlayerById(userId) {
        // DELETE https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        return new Promise(async (resolve, rejects) => {
            let deleteResponse = await super.delete(`/hubs/v1/hub/${faceit.hubId}/ban/${userId}`);

            if (deleteResponse == "") return resolve(true);

            deleteResponse = JSON.parse(deleteResponse);
            if (deleteResponse.errors[0].message.startsWith("The ban with guid user:")) {
                rejects(`NOT_BANNED`);
            } else {
                rejects("Erreur inconnue");
            }
        });
    }

    /**
     * 
     * @param {string} pseudo - user nickname
     * @returns {Promise<bool>} - return true if user has been unbanned 
     */
    async unbanPlayerByNickname(pseudo) {
        return new Promise(async (resolve, rejects) => {

            const dataPlayer = await new OpenFaceitRepository().getUserDatas(pseudo)
                .catch(err => {
                    rejects(err);
                });
            if (typeof dataPlayer == 'undefined') rejects("Erreur inconnue");
            const result = await new FaceitRepository().unbanPlayerById(dataPlayer.player_id)
                .catch(err => {
                    if (err == "NOT_BANNED") {
                        rejects(`Le joueur ${pseudo} n'est pas banni`);
                    } else {
                        rejects(err);
                    }
                });

            if (typeof result == 'undefined') {
                resolve(true);
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
            if (typeof userDatas.errors != "undefined") {
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