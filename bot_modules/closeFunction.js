const {MessageEmbed } = require('discord.js');

module.exports = {
    ticket : function(){

            const mysql = require('mysql');
            const db = mysql.createConnection({host: "82.64.195.94",user: "root",password: "OaHhL2L0x7"});
        
            const mysql = require('mysql');
            const db = mysql.createConnection({host: "82.64.195.94",user: "root",password: "OaHhL2L0x7"});

            db.connect(function(err) {
                if (err) throw err;
                db.query(`call bot_onet.close_auto();`, function (err, result) {
                    if (err) throw err;
                    
                });
            });
            return;

            
    }
}