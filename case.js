//=== (  ✩ 🚀 Created By #! -VynnoxRzy No Delete Wm
//==  (  ✩ 🚀 Github: LexxyVdev
//==  (  ✩ 🚀 Youtube: https://www.youtube.com/@VynnoxRzyy
//==  (  ✩ 🚀 Tele: t.me/vynnoxrzy
//==  (  ✩ 🚀 Date: Fri 4-April
//==  (  ✩ 🚀 Note: Kembangkan Saja Kalo Mau jangan Apus Pembuat Base -_

require('./config/settings');
const fs = require('fs');
const chalk = require("chalk");
const path = require('path')

module.exports = vynnoxbeyours = async (vynnoxbeyours, m, chatUpdate, ciaa, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || 
            m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
        ) || "";

        const budy = (typeof m.text === 'string' ? m.text : '');

        const ongner = JSON.parse(fs.readFileSync('./database/owner.json'));

        const botNumber = await vynnoxbeyours.decodeJid(vynnoxbeyours.user.id);
        const itsOwner = [botNumber, ...ongner, ...global.onwer]
            .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            .includes(m.sender);

        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const groupMetadata = isGroup ? await vynnoxbeyours.groupMetadata(m.chat).catch(() => null) : null;
        const participants = isGroup ? groupMetadata?.participants : [];
        const groupAdmins = isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : [];

        const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const groupName = isGroup ? groupMetadata?.subject : "";

        if (m.message) {
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#4a69bd").bold(`▢ New Message`));
            console.log(
                chalk.bgHex("#ffffff").black(
                    `   ▢ Date: ${new Date().toLocaleString()} \n` +
                    `   ▢ Message: ${body || m.mtype} \n` +
                    `   ▢ Sender: ${pushname} \n` +
                    `   ▢ JID: ${m.sender}`
                )
            );

            if (isGroup) {
                console.log(
                    chalk.bgHex("#ffffff").black(
                        `   ▢ Group: ${groupName} \n` +
                        `   ▢ GroupJid: ${m.chat}`
                    )
                );
            }
            console.log();
        }

        async function nevreply(text) {
            vynnoxbeyours.sendMessage(m.chat, {
                text: text,
                contextInfo: {
                    mentionedJid: [sender],
                    externalAdReply: {
                        title: "¿? Cannie",
                        body: "This script was created by VynnoxRzy",
                        thumbnailUrl: "https://github.com/mp.png",
                        sourceUrl: 'https://api-cannie.xevenxyyvip.site',
                        renderLargerThumbnail: false,
                    }
                }
            }, { quoted: m })
        }


        const pluginsLoader = async (directory) => {
            let plugins = [];
            const folders = fs.readdirSync(directory);
            folders.forEach(file => {
                const filePath = path.join(directory, file);
                if (filePath.endsWith(".js")) {
                    try {
                        const resolvedPath = require.resolve(filePath);
                        if (require.cache[resolvedPath]) {
                            delete require.cache[resolvedPath];
                        }
                        const plugin = require(filePath);
                        plugins.push(plugin);
                    } catch (error) {
                        console.log(`${filePath}:`, error);
                    }
                }
            });
            return plugins;
        };

        const pluginsDisable = true;
        const plugins = await pluginsLoader(path.resolve(__dirname, "./command"));
        const plug = { 
            vynnoxbeyours,
            prefix,
            command, 
            nevreply,
            text, 
            itsOwner,
            isGroup: m.isGroup, 
            isPrivate: !m.isGroup, 
            pushname,
            isAdmins,
            groupMetadata
        };

        for (let plugin of plugins) {
            if (plugin.command.find(e => e == command.toLowerCase())) {
                if (plugin.ongner && !itsOwner) {
                    return reply(mess.owner);
                }
                
                if (plugin.group && !plug.isGroup) {
                    return reply(mess.group);
                }
                
                if (plugin.private && !plug.isPrivate) {
                    return reply(mess.private);
                }
                
                if (plugin.admin && !plug.isAdmins) {
                    return reply(mess.admin);
                }

                if (typeof plugin !== "function") return;
                await plugin(m, plug);
            }
        }
        
        if (!pluginsDisable) return;
        
        switch (command) {
            case 'menu': {
                let botInfo = ``
                vynnoxbeyours.sendMessage(m.chat, {
                    image: { url: "https://files.catbox.moe/e94nfk.jpg" },
                    caption: botInfo,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "🕸⃟𝐍𝐞͢𝐯𝐚𝐫𝐢𝐚𝐇͢𝐮͠𝐧͢𝐭𝐞𝐫𝐗᷍𝐱𝐱͢͡",
                            newsletterJid: `idchlu@newsletter`
                        },
                        isForwarded: true,
                        externalAdReply: {
                            showAdAttribution: false,
                            renderLargerThumbnail: false,
                            gifPlayback: true,
                            gifAttribution: 1,
                            title: `🕸⃟𝐍𝐞͢𝐯𝐚𝐫𝐢𝐚𝐇͢𝐮͠𝐧͢𝐭𝐞𝐫𝐗᷍𝐱𝐱͢͡`,
                            body: `A simple WhatsApp bot uses JavaScript to respond to commands automatically.`,
                            mediaType: 1,
                            thumbnailUrl: `https://files.catbox.moe/e94nfk.jpg`,
                            thumbnail: ``,
                            sourceUrl: `serahlu`
                        }
                    }
                }, { quoted: m });
                break;
            }

            case 'buttonold': {
                let teks = `> ようこそ`;
                const buttons = [
                    {
                        buttonId: `${prefix}bugmenu`,
                        buttonText: { displayText: 'kosong' }
                    },
                    {
                        buttonId: `${prefix}menu`,
                        buttonText: { displayText: 'kosong' }
                    }
                ];

                const buttonMessage = {
                    image: { url: 'https://files.catbox.moe/msoysl.jpg' },
                    caption: teks,
                    footer: `Nǐ hǎo, nǐ gānggāng shǐyòngle zhǐlìngq ${prefix + command}`,
                    buttons: buttons,
                    headerType: 1,
                    viewOnce: true
                };

                await vynnoxbeyours.sendMessage(m.chat, buttonMessage, { quoted: m });
                break;
            }

            case 'eee': {
                let nevatxt = `> こんにちは、アドレス販売者が必要な場合は、最初に期間を選択してください`;
                const flowActions = [{
                    buttonId: 'action',
                    buttonText: { displayText: 'kosong' },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'kosong',
                            sections: [{
                                title: 'kosong',
                                rows: [
                                    {
                                        header: 'kosong',
                                        title: 'kosong',
                                        description: 'kosong',
                                        id: `.buttonold`
                                    }
                                ]
                            }, {
                                title: 'kosong',
                                rows: [
                                    {
                                        header: 'kosong',
                                        title: 'kosong',
                                        description: 'kosong',
                                        id: `.buttonold`
                                    }
                                ]
                            }]
                        })
                    }
                }];

                const buttonMessage = {
                    image: { url: 'https://files.catbox.moe/msoysl.jpg' },
                    caption: nevatxt,
                    footer: `Nǐ hǎo, nǐ gānggāng shǐyòngle zhǐlìngq ${prefix + command}`,
                    buttons: flowActions,
                    headerType: 1,
                    viewOnce: true
                };

                await vynnoxbeyours.sendMessage(m.chat, buttonMessage, { quoted: m });
                break;
            }

            default:
        }
    } catch (e) {
        console.error(chalk.redBright("Error:"), e);
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
