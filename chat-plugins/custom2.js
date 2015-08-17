exports.commands = {
    
    // PLUGIN DES COMMANDES PERSO

    /* EXEMPLE DE COMMANDE 
    nomcommande: function(target, room, user) {
	    if (!this.canBroadcast()) return; 
	    this.sendReplyBox("<b>texte</b>");
	}
	*/
	
	//////////////////////////////////
	// AUTRE /////////////////////////
	//////////////////////////////////
	 elections: 'election',
	 election: function() {
	 	if (!this.canBroadcast()) return; 
	 	
	 	this.sendReplyBox(
	 		'<big><b>La première élection (17/06/15) étant terminée, voici les résultats.</big><br><br>' + 	
	 		'<u><b>ÉLU(E)</b></u> <font color="goldenrod"><i>Noruega (anciennement Erza)</i></font>       - 13 voies / 24% <br>' +
	 		'<u><b>ÉLU(E)</b></u> <font color="goldenrod"><i<i>Claerina</i></font> - 9 voies / 17% <br>' + 
	 		'<font color="gray"><i>Situm</i></font>        - 8 voies / 15% <br>' +
	 		'<font color="goldenrod"><i>Panure</i></font>  - 7 voies / 13% <br>' +
	 		'<font color="gray"><i>Holiano</i></font>      - 5 voies / 9% <br>' +
	 		'<font color="gray"><i>Ytreza</i></font>       - 4 voies / 7% <br>' +
	 		'<font color="gray"><i>Skyrio</i></font>       - 3 voies / 6% <br>' +
	 		'<font color="gray"><i>Pholovvers</i></font>   - 1 voie / 2% <br>' +
	 		'<font color="gray"><i>Luma-san</i></font>     - 1 voie / 2% <br>' +
	 		'<font color="gray"><i>Golden-Ike</i></font>   - 1 voie / 2% <br>' +
	 		'<font color="gray"><i>Mindnight</i></font>    - 1 voie / 2% <br>' +
	 		'<font color="gray"><i>Moule Frites</i></font> - 1 voie / 2%<br><br></font>' +
	 		'Légende: <font color="goldenrod">Parti Libéral</font> | <font color="gray">Indépendant</font><br>'+ 
	  		'<a href="http://strawpoll.me/4656745/r">Strawpoll du vote</a> - 54 VOTES AU TOTAL!'
	 	);
	 },
	 
	 evoli: function (target, user, room) {
	 	if (!this.can('lock')) return false; 
	 	console.log('[Evoli] '+ user +': '+ room);
	 	this.add('|raw|<marquee target="_blank"><img src="http://a.deviantart.net/avatars/e/e/eevee444.gif?10" width="50" height="50" target="_blank"></marquee>');
	 },
	 
	//////////////////////////////////
	// COMMANDES PERSO ///////////////
	//////////////////////////////////
	
	noruega: 'erza',
	wettin: 'erza', 
	erza: function (target) { // si on utilise pas genre target on peuut le virer de la fonction
	    if (!this.canBroadcast()) return;
	    target = toId(target); // target = argument après la commande
	    if (target === 'skype') { 
	    	this.sendReplyBox(
	    		'<b>Skype de Erza</b>: <i>Erzavserza</i>'		
	    	);
	    } else if (target === 'truc') {
	    	this.sendReplyBox(
	    		'machin'	
	    	);
	    } else {
	    	// sinon
	    	this.sendReplyBox(
	        	'<center><img src=\"http://i.imgur.com/MUVORwe.png\" width=\"80\" height=\"80\" /><br /><u><b><big>Erza</big></u></b><br /><br />Erza est le codeur du serveur. Il a permis à Paul d\'héberger 24 heures sur 24 son serveur en lui évitant donc de dévoiler son IP pour l\'héberger, cependant le nouvel host comporte quelques bugs et c\'est pourquoi Erza cherche parfois un nouvel hébergeur plus fiable. Il est également l\'un de ceux qui s\'occupent de mettre des avatars personnalisés aux membres du serveurs, vous pouvez donc sans crainte vous adressez à lui si vous voulez un avatar (et que vous avez de la patience c:).<br />Mis à part ce côté IVL, Erza est IRL lycéen et étudie en filière littéraire dans le but de s\'orienter plus tard dans un travail dans les langues étrangères. <strike>Il est également en couple avec une jeune fille qui s\'appelle Sarah et que vous avez sûrement déjà vue dans ce serveur :D</strike><br /><br /><a href="https://twitter.com/LordErza" target="_blank"><button target="_blank">Twitter</button></a> | <a href="https://youtube.com/ErzaVsErza" target="_blank"><button target="_blank">YouTube</button></a> | <a href="http://ask.fm/adminiSTRAIGHTor" target="_blank"><button target="_blank">Ask.fm</button></a>'
	    	);	 
	    }
	},

	haunter: 'panure',
	panur: 'panure', 
	panure: function () {
		if (!this.canBroadcast()) return; 
		this.sendReplyBox(
			'<center><justify><img src=\"http://serverlqp-paulucario.c9.io/avatars/tusaispascoder.png\" width=\"80\" height=\"80\" /><br /><u><b><big>Panur(e)</big></u></b><br /><br />Panure est le gars qui a tout appris à Erza qui a lui même tout appris à Paul. IL mérite donc plus de reconnaissance que cet autre random. Il code genre, 10 fois mieux que lui, c\'est dire! Franchement, Lol. Rofl. Même à côté, Zzérime est une personne serviable, sympathique et mature. Je le hais vraiment.' +
			'<br> Vous pouvez par contre le retrouver sur certains réseaux sociaux.<br><a href="https://www.youtube.com/user/blancube09" target="_blank"><button target="_blank"><b>You<font color="red">Tube</font></b></button></a> | <a href="https://twitter.com/Blancube" target="_blank"><button target="_blank"><font color="light-blue"><b>Twitter</font></b></button></a> | <b>Skype: <i>sli404</i></a></center></b></center></justify>'
		);
	},
	
	claerina: 'clae',
	clae: function () {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox(
	    	'<center><img src=\"http://i.imgur.com/4WIex1b.png\" width=\"80\" height=\"80\" /><br /><u><b><big>Claerina</big></u></b><br /><br />Claerina est une membre bien connue de ce serveur. Ancienne haute dignitaire de la LFCP, elle n\'a pas cessé de fréquenter ce serveur et c\'est pourquoi vous pouvez toujours l\'y rencontrer aujourd\'hui. Artiste en herbe, elle aime décapiter des Pokémon, probablement une remontée sadique lui passant par la tête, mais si vous êtes aussi amateur de violence, n\'hésitez pas à lui demander de se charger d\'un pauvre Raichu innocent ou encore d\'un Altaria qui passait par là. Claerina est également fan d\'Évoli alors si jamais vous parvenez à la mettre en rogne n\'hésitez pas à lui en montrer un afin de la pacifier !<br><marquee><img src=\"http://a.deviantart.net/avatars/e/e/eevee444.gif?10\" width=\"50\" height=\"50\" /></marquee>'
	    );
	},
	
	robot1: 'robotdelqp',
	robotdelqp: function () {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox(
	        '<center><img src=\"http://serverlqp-paulucario.c9.io/avatars/avatar%20robot.png\" width=\"80\" height=\"80\" /><br /><u><b>Robot de LQP</u></b><br /><br />Ce robot est doté d’une intelligence extrême : il analysera le fond de vos pensées pour savoir si oui ou non vous avez des mauvaises intentions, comme spam, ou encore utiliser du vocabulaire vulgaire, et si c’est le cas, il vous punira sévèrement. À noter que sa punition affectera la plupart des personnes présentes sur le serveur, à cause d’un malencontreux problème de l’hébergeur. Mais il ne fait pas que punir, il vous rendra également un accueil chaleureux lorsque vous arriverez. Si vous souhaitez connaître l\'étendue de ses nombreuses commandes disponibles, <a href="https://twitter.com/LordErza" target="_blank"><button target="_blank">Cliquez ici</button></a><br> Ce robot a été créé par deux talentueux codeurs : Erza et Panure, et il a été hébergé par Lucario.'
	    );
	},
	
	robot2: 'robotn2delqp',
	robotn2delqp: function () {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox(
	        '<center><img src=\"http://serverlqp-paulucario.c9.io/avatars/avatar%20robot.png\" width=\"80\" height=\"80\" /><br /><u><b>Robot N.2 de LQP</u></b><br /><br />Créé par le codeur Keb et à l\'origine sous le nom \"Juif\", Lucario s\'en est équipé pour ce serveur. Ce robot est un traducteur hors paire. Des problèmes pour créer votre équipe, car vous avez du mal avec les noms anglais des Pokémon et des attaques ? Comptez sur lui ! Il pourra également vous donner les codes amis des personnes présentes sur le serveur, vous raconter des VDM, répondre à vos questions…<br><br><font color=red>Ce robot n\'est plus en fonction.'
	    );
	},
	
	lucario: 'paul',
	paul: function () {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox(
	        '<center><img src="http://www.pixenli.com/images/1434/1434385670081123400.gif" width="200" height="200"><br><u><b><big>Lucario</big></b></u><br><br>Ce Lucario, autrefois appelé Paul, est le fondateur de ce serveur et il l\'administre avec l\'aide précieuse de ses fidèles codeurs.<br>Il a créer la communauté LFCP le 21 octobre 2013. Après une longue période de résistance acharnée, son empire s\'écroulera finalement le 27 février 2015. Mais ce n\'est pas fini pour autant ! La LFCP était en partenariat avec LQP, une autre communauté dans laquelle il a été promu administrateur aussitôt après. Le serveur de Lucario est donc passé de LFCP à LQP.<br><br>Il déteste les humains ainsi que leur façon de vivre, il est donc facilement irritable et n\'a pas un très bon sens de l\'humour. N\'essayez pas de le troller car il vous prendra toujours au sérieux, et gare à vous s\'il découvre le troll.<br>Lucario est marié depuis le 21 septembre 2014 avec Jessicca, une femelle Lucario de Facebook. N\'essayez donc pas de draguer ce Lucario, les filles ! De toutes façons, les humaines ne l\'intéresse pas du tout !<br><br>Pour finir, il dispose d\'un facebook, d\'une chaîne Youtube, et d\'un Ask dont voici les boutons d\'accès.<br> <hr noshade="" width="300"><a href="https://www.facebook.com/profile.php?id=100003181943941"target="_blank"><button target="_blank"><i><strike>Facebook</strike></i></button></a> | <a href="https://www.youtube.com/user/Dauphin076"target="_blank"><button target="_blank"><i>Youtube</i></button></a> | <a href="http://ask.fm/Paul_Lucario" target="_blank"><button target="_blank"><i>Ask.fm</i></button> </a><hr noshade="" width="250">'
	    );
	},
	
	wally: function () {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox(
	        'Désolé, je ne vois pas du tout de qui tu parle. *sifflote*'
	    );
	},

	situm: 'situmparletmort',
	situmparletmort: function () {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox(
	        '<center><img src=http://i.imgur.com/nbgr9eY.png width=80 height=80><br><u><b><big>Situm</u></big></b><br><br>Situm est un membre très impliqué sur le serveur, toujours prêt à aider et qui s\'intéresse à la stratégie dans différents tiers !<br>D\'autre part, Situm maîtrise la création de Custom Avatar, alors n\'hésitez pas à visiter sa room [Custom Avatar] ! Ses qualités d\'honnêteté, de joie de vivre et surtout de modestie incomparable font de lui quelqu\'un sur qui on peut compter et avec qui on peut déconner.<br>Situm est aussi en couple avec Alice, une fille qui vient quelques fois sur le serveur. Pour finir, Situm est un nouveau joueur qui n\'a pas connu la LFCP mais qui a su progresser très rapidement.<br><br>Voici quelques unes de ses créations !<br><marquee><img src=http://i.imgur.com/fyM9FbR.png width=80 height=80><img src=http://i.imgur.com/czhtzo3.png width=80 height=80><img src=http://i.imgur.com/Pjw5KpD.png width=96 height=96><img src=http://i.imgur.com/H3TIaZh.png width=80 height=80>'
	    );
	},

	//////////////////////////////////
	// LIGUE /////////////////////////
	//////////////////////////////////
	
	conseil4: 'pantheon',
	conseil: 'pantheon',
	champions: 'pantheon',
	panthéon: 'pantheon',
	pantheon: function () {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox(
	    	'<a href="http://fanclub-pokemon.vraiforum.com/t76-Le-Panth-on.htm#p833">Voici la liste actuelle des Champions / Conseil 4 / Maître de la ligue LQP</a>'
	    );
	},
	
	badges: 'badge',
	badge: function () {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox(
	    	'<a href="http://fanclub-pokemon.vraiforum.com/t183-Liste-des-badges.htm#p1897">Voici la liste des badges actuellement remportés dans la ligue LQP</a>'
	    );
	}
	
    
}; 
