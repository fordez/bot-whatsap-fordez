const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({clientId: "bot-fordez"})
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', message => {
	console.log(message);
    client.sendMessage(message.from, 'pong');
});

client.on('message', async msg => {
    if(msg.hasMedia) {
        const media = await msg.downloadMedia();
        console.log('descarga de medios')
        console.log(media)
    }
});
