const { MessageEmbed } = require("discord.js");

module.exports = {
    send_ban(nbEntreeBan, array, userid) {
        let list = "";

        if (nbEntreeBan == 1 && array[0][1] == 99999) {
            list = `Le joueur **${array[0][0]}** a été banni de **manière permanante** par <@${userid}> pour la raison suivante : ${array[0][2]}.`;
        } else if (nbEntreeBan == 1 && array[0][1] == 0) {
            list = `Le joueur **${array[0][0]}** a reçu un **avertissement** par <@${userid}> pour la raison suivante : ${array[0][2]}.`;
        } else if (nbEntreeBan == 1) {
            list = `Le joueur **${array[0][0]}** a été banni par <@${userid}> pour une durée de **${array[0][1]} jours** pour la raison suivante : ${array[0][2]}.\nUn rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`;
        } else {
            list = `Les joueur suivants ont été modéré par <@${userid}> :\n`;
            array.forEach((ban) => {
                if (ban[1] == 0) {
                    list += `- L'utilisateur ${ban[0]} a reçu un avertissement pour la raison suivante : ${ban[2]}\n`;
                } else if (ban[1] == 99999) {
                    list += `- L'utilisateur ${ban[0]} a été banni de manière permanante pour la raison suivante : ${ban[2]}\n`;
                } else {
                    list += `- L'utilisateur ${ban[0]} a été banni pendant ${ban[1]} jours pour la raison suivante : ${ban[2]}\n`;
                }
            });
            list += `Un rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`;
        }

        const embed = new MessageEmbed()
            .setColor("#e34c3b")
            .setAuthor({ name: "Nouvelle entrée de banissement" })
            .setDescription(list)
            .addField(
                "Lien vers le pannel faceit de banissement",
                "https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community/admin/bans/hub",
                false
            )
            .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
            .setTimestamp();

        return embed;
    }
};
