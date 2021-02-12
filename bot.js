/***
 *     __      __         _ _     ____                ____   ____ _______ 
 *     \ \    / /        | | |   |  _ \              |  _ \ / __ \__   __|
 *      \ \  / /_ _ _   _| | |_  | |_) | ___  _   _  | |_) | |  | | | |   
 *       \ \/ / _` | | | | | __| |  _ < / _ \| | | | |  _ <| |  | | | |   
 *        \  / (_| | |_| | | |_  | |_) | (_) | |_| | | |_) | |__| | | |   
 *         \/ \__,_|\__,_|_|\__| |____/ \___/ \__, | |____/ \____/  |_|   
 *                                             __/ |                      
 *                                            |___/                       
 *
 *     +-----------------------------------------------------------------+
 *     |                                                                 |
 *     |                      Made by Vico                               |
 *     |                                                                 |
 *     +-----------------------------------------------------------------+
 *
 */

/* BIBLIOTECAS */

const fs = require('fs');							// Sistema de arquivos
const toml = require('toml');						// TOML (para o arquivo de config)
const DiscordAPI = require('discord.js');			// Discord API

/* CONFIG */
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));	// Configuração global

/* FUNÇÕES ÚTEIS */
// Cria os arquivos para um novo servidor criado
function configurarNovaGuild(guild) {
    // Cria ou um arquivo de frases pra seed o markov
	new arquivoSeed = guild.id + ".txt";
	fs.appendFile(arquivoSeed, "Acabei de chegar no Discord, fala aí", function (err) {
		if (err) throw err;
		console.log('[INFO] Criado ou carregado arquivo de seed para esse servidor!');
	});
};

// Carrega os arquivos de mensagens aprendidas para cada server e cria um markov chain para cada um
function carregarMarkovsGuilds(client) {
	// Para cada server
	client.guilds.cache.forEach(function (guild) {
		// Diretório de config do servidor
		fs.open("./" + guild.id + "/seeds.dic", 'w', function (err, file) {
			if (err) throw err;
			console.log('Saved!');
		});
		console.log(guild.name);
	});	
};

/* INÍCIO DO CÓDIGO */

const bot = new DiscordAPI.Client();				// Objeto principal da API do Discord

// CALLBACKS
// Quando o bot é carregado
bot.once('ready', function () {
	carregarSeedsGuilds(bot);
	console.log('[INFO] Bot inicializado com sucesso!');
});

// Quando entra em um servidor
bot.on("guildCreate", function (guild) {
	// Avisa no terminal/log
    console.log("[INFO] Entrei em um servidor! " + guild.name);

})

// Quando sai de um servidor
bot.on("guildDelete", function (guild) {
    console.log("Left a guild: " + guild.name);
    //remove from guildArray
})

bot.login(config.discord.bot_token);				// O Bot "loga" na rede do Discord com o token especificado no arquivo de config
/* FIM DO CÓDIGO */