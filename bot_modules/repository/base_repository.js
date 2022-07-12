const https = require("https");
const { faceit } = require("../../config.json");

class BaseRepository {

    /**
     * 
     * @param {string} hostname - The hostname of the server
     * @param {number} port - The port of the server
     * @param {string} path - The path of the server
     * @param {string} method - The method of the request
     * @param {object} headers - The headers of the request
     */
    constructor({ hostname = "hostname", port = 443, path = "path", method = "method", headers = {
        "Content-Type": "application/json",
    } } = {}) {
        if (this.constructor == BaseRepository) throw new Error("Object of Abstract Class cannot be created")
        this.options = {
            hostname: hostname,
            port: port,
            path: path,
            method: method,
            headers: headers,
        };
    }

    /**
     * 
     * @returns {Promise<string>}
     */
    async create(path) {
        if (this.constructor == BaseRepository) throw new Error("Abstract Method has no implementation");
        this.options.path = path;
        return this.worker("CREATE");
    }

    /**
     * 
     * @param {string} path - The path of the server
     * @param {*} data - The data of the request
     * @returns {Promise<string>}
     */
    async post(path, data) {
        if (this.constructor == BaseRepository) throw new Error("Abstract Method has no implementation");
        this.options.path = path;
        this.options.headers["Content-Length"] = data.length;
        return this.worker("POST", data);

    }

    /**
     * 
     * @param {string} path - The path of the server
     * @returns {Promise<string>}
     */
    async get(path) {
        if (this.constructor == BaseRepository) throw new Error("Abstract Method has no implementation");
        this.options.path = path;
        return this.worker("GET");
    }

    /**
     * 
     * @param {string} path - The path of the server
     * @param {*} data - The data of the request
     * @returns {Promise<string>}
     */
    update(path, data) {
        if (this.constructor == BaseRepository) throw new Error("Abstract Method has no implementation");
        this.options.path = path;
        return this.worker("UPDATE", data);
    }

    /**
     * 
     * @param {string} path - The path of the server
     * @returns {Promise<string>}
     */
    async delete(path) {
        if (this.constructor == BaseRepository) throw new Error("Abstract Method has no implementation");
        this.options.path = path;
        return this.worker("DELETE");
    }

    worker(method, data) {
        return new Promise((resolve, rejects) => {
            this.options.method = method;
            const req = https.request(this.options, (res) => {
                let chunks = [];

                res.on("data", (chunk) => chunks.push(chunk));
                res.on("end", (_d) => {
                    resolve(Buffer.concat(chunks).toString());
                });
            });
            req.on("error", (error) => rejects(error));
            if (typeof data == 'undefined') req.write(data);
            req.end();
        });
    }
}

module.exports = { BaseRepository };