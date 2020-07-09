const { admin } = require('../config.json');
module.exports = {
    name: 'add',
    guildOnly: true,
    description: 'Add group or smth',
	async execute(message, args) {
		if (args[0] === "group") {
            
            if (message.member.id != admin) {
                return message.reply(`эта команда доступна только <@${admin}>`)
            }

            if (!args[1]) {return message.reply("укажите имя группы")}
            args.shift()
            let role = await message.guild.roles.create({
                data: {
                    name: args.join(' ')
                },
            })
            role.setPosition(2, {relative: true})
            
            let cat = await message.guild.channels.create(`Группа ${args[1]}`, {
                type: "category"
            })
            await cat.updateOverwrite(cat.guild.roles.everyone, { VIEW_CHANNEL: false });
            await cat.updateOverwrite(role, { VIEW_CHANNEL: true })
            message.guild.channels.create("чат", {
                type: "text",
                parent: cat.id,
            }).then(async m => await m.lockPermissions())
            message.guild.channels.create("очередь", {
                type: "text",
                parent: cat.id,
            }).then(async m => await m.lockPermissions())
            message.guild.channels.create("общий", {
                type: "voice",
                parent: cat.id,
                bitrate: 64000,
            }).then(async m => await m.lockPermissions())
            message.guild.channels.create("очередь", {
                type: "voice",
                parent: cat.id,
                bitrate: 64000,
            }).then(async m => await m.lockPermissions())
            for (let i = 1; i <= 5; i++) {
                message.guild.channels.create(i, {
                    type: "voice",
                    parent: cat.id,
                    bitrate: 64000,
                    userLimit: 2,
                }).then(async m => await m.lockPermissions())
            }
        }
	},
};