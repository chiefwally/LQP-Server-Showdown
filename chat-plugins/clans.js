exports.commands = {
	/*********************************************************
	 * Clan commands
	 *********************************************************/

	aideclan: 'clanshelp',
	clanhelp: 'clanshelp',
	clanshelp: function () {
		if (!this.canBroadcast()) return false;
		this.sendReplyBox(
			"<big><b>Commandes Basiques:</b></big><br /><br />" +
			"/clans - Liste des clans.<br />" +
			"/clan (clan/membre) - Montre la fiche d'un clan.<br />" +
			"/clanmembers (clan/membre) - Montre la liste des membres d'un clan.<br />" +
			"/clanauth (clan/membre) - Montre la hiérarchie au sein d'un clan.<br />" +
			"/warlog (clan/membre) - Montre les 10 dernières wars d'un clan.<br />" +
			"/inviteclan - Invite un utilisateur à rejoindre le clan. Rang Officiel nécessaire.<br />" +
			"/expulseclan (membre) - Expulse un membre du clan. Nécessite le poste de Lieutenant.<br />" +
			"/acceptclan (clan) - Accepter l'invitation en d'un clan.<br />" +
			"/invitationsclan (clan/membre) - Montre la liste des utilisateurs invités au sein d'un clan.<br />" +
			"/removeinvitations - Efface toutes les invitations d'un clan. Rang de Chef du clan nécessaire.<br />" +
			"/leaveclan - Abandonner votre clan.<br />" +
			"<br />" +
			"<big><b>Commandes de Staff de clan:</b></big><br /><br />" +
			"/chef (membre) - Assigne le rang de Chef du Clan à quelqu'un. Requiert le rang global d'Administrateur.<br />" +
			"/lieutenant (membre) - Assigne le rang de Lieutenant du Clan à quelqu'un. Requiert le rang de Chef du Clan.<br />" +
			"/officiel (membre) - Assigne le rang d'Officiel du Clan à quelqu'un. Requiert le rang de Lieutenant du Clan.<br />" +
			"/demoteclan (membre) - Efface un utilisateur du staff du clan. Requiert le rang de Chef du Clan ou d'Administrateur.<br />" +
			"/deviseclan (phrase) - Établit la devise du clan. Requiert le rang de Chef du Clan.<br />" +
			"/logoclan (logo) - Établit le logo du clan. Requiert le rang de Chef du Clan.<br />" +
			"/closeclanroom - Empêche l'accès à la room du clan à tous ceux qui n'en font pas partie, hormis les Administrateurs.<br />" +
			"/openclanroom - Réautorise l'accès à la room du clan à ceux qui n'en font pas partie.<br />" +
			"/fjg - Appelle tous les membres du clan à rejoindre la salle du clan.<br />" +
			"/rk - Expulse un utilisateur d'une room. Rang @ nécessaire.<br />" +
			"<br />" +
			"<big><b>Commandes Administratives:</b></big><br /><br />" +
			"/createclan &lt;name> - Crée un clan.<br />" +
			"/deleteclan &lt;name> - Supprime un clan.<br />" +
			"/addclanmember &lt;clan>, &lt;user> - Force un utilisateur à joindre le clan spécifié.<br />" +
			"/removeclanmember &lt;clan>, &lt;user> - Expulse un membre du clan spécifié.<br />" +
			"/setdeviseclan &lt;clan>,&lt;lema> - Établit une devise pour un clan.<br />" +
			"/setlogoclan &lt;clan>,&lt;logo> - Établit un logo pour un clan.<br />" +
			"/setroomclan &lt;clan>,&lt;sala> - Établit une room pour un clan.<br />" +
			"/setgxeclan &lt;clan>,&lt;wins>,&lt;losses>,&lt;draws> - Établit le classement d'un clan.<br />" +
			"/serankclan &lt;clan>,&lt;puntos> - Établit le classement d'un clan.<br />" +
			"/settitleclan &lt;clan>&lt;puntos> - Établit un titre pour le clan.<br />"
		);
	},

	createclan: function (target) {
		if (!this.can('clans')) return false;
		if (target.length < 2)
			this.sendReply("Le nom du clan est trop court.");
		else if (!Clans.createClan(target))
			this.sendReply("Le clan n'a pas pu être créé; il est possible qu'un clan avec ce nom existe déjà.");
		else
			this.sendReply("Clan: " + target + " créé avec succès.");

	},

	deleteclan: function (target) {
		if (!this.can('clans')) return false;
		if (!Clans.deleteClan(target))
			this.sendReply("Le clan n'a pas pu être supprimé. Il est possible qu'il n'existe pas ou qu'il soit en pleine war.");
		else
			this.sendReply("Clan: " + target + " supprimé avec succès.");
	},

	getclans: 'clans',
	clanes: 'clans',
	clans: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		var clansTableTitle = "Liste des Clans du Serveur";
		if (toId(target) === 'rank' || toId(target) === 'points' || toId(target) === 'prestige' || toId(target) === 'classement') {
			target = "rank";
			clansTableTitle = "Liste des Clans par rank";
		}
		if (toId(target) === 'miembros' || toId(target) === 'members') {
			target = "members";
			clansTableTitle = "Listes des Clans par Membres";
		}
		var clansTable = '<center><big><big><strong>' + clansTableTitle + '</strong></big></big><center><br /><table class="clanstable" width="100%" border="1" cellspacing="0" cellpadding="3" target="_blank"><tr><td><center><strong>Clan</strong></center></td><td><center><strong>Nom Complet</strong></center></td><td><center><strong>Membres</strong></center></td><td><center><strong>Room</strong></center></td><td><center><strong>Wars</strong></center></td><td><center><strong>Classement</strong></center></td></tr>';
		var clansList = Clans.getClansList(toId(target));
		var auxRating = {};
		var nMembers = 0;
		var membersClan = {};
		var auxGxe = 0;
		for (var m in clansList) {
			auxRating = Clans.getElementalData(m);
			membersClan = Clans.getMembers(m);
			if (!membersClan) {
				nMembers = 0;
			} else {
				nMembers = membersClan.length;
			}
			clansTable += '<tr><td><center>' + Tools.escapeHTML(Clans.getClanName(m)) + '</center></td><td><center>' +Tools.escapeHTML(auxRating.compname) + '</center></td><td><center>' + nMembers + '</center></td><td><center>' + '<button name="send" value="/join ' + Tools.escapeHTML(auxRating.sala) + '" target="_blank">' + Tools.escapeHTML(auxRating.sala) + '</button>' + '</center></td><td><center>' + (auxRating.wins + auxRating.losses + auxRating.draws) + '</center></td><td><center>' + auxRating.rating + '</center></td></tr>';
		}
		clansTable += '</table>';
		this.sendReply("|raw| " + clansTable);
	},

	clanauth: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("Le clan spécifié n'existe pas ou n'est pas disponible.");
			return;
		}
		//html codes for clan ranks
		var leaderClanSource = Clans.getAuthMembers(target, 3);
		if (leaderClanSource !== "") {
			leaderClanSource = "<big><b>Chef(s)</b></big><br /><br />" + leaderClanSource + "</b></big></big><br /><br />";
		}
		var subLeaderClanSource = Clans.getAuthMembers(target, 2);
		if (subLeaderClanSource !== "") {
			subLeaderClanSource = "<big><b>Lieutenant(e)(s)</b></big><br /><br />" + subLeaderClanSource + "</b></big></big><br /><br />";
		}
		var oficialClanSource = Clans.getAuthMembers(target, 1);
		if (oficialClanSource !== "") {
			oficialClanSource = "<big><b>Officiel(le)(s)</b></big><br /><br />" + oficialClanSource + "</b></big></big><br /><br />";
		}
		var memberClanSource = Clans.getAuthMembers(target, 0);
		if (memberClanSource !== "") {
			memberClanSource = "<big><b>Autres Membres</b></big><br /><br />" + memberClanSource + "</b></big></big><br /><br />";
		}

		this.sendReplyBox(
			"<center><big><big><b>Hiérarchie du clan " + Tools.escapeHTML(Clans.getClanName(target)) + "</b></big></big> <br /><br />" + leaderClanSource + subLeaderClanSource + oficialClanSource + memberClanSource + '</center>'
		);
	},

	clanmembers: 'miembrosclan',
	miembrosclan: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("Le clan spécifié n'existe pas ou n'est pas disponible.");
			return;
		}
		var nMembers = 0;
		var membersClan = Clans.getMembers(target);
		if (!membersClan) {
			nMembers = 0;
		} else {
			nMembers = membersClan.length;
		}
		this.sendReplyBox(
			"<strong>Miembros del clan " + Tools.escapeHTML(Clans.getClanName(target)) + ":</strong> " + Clans.getAuthMembers(target, "all") + '<br /><br /><strong>Nombre de Membres: ' + nMembers + '</strong>'
		);
	},
	invitationsclan: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("Le clan spécifié n'existe pas ou n'est pas disponible.");
			return;
		}
		this.sendReplyBox(
			"<strong>Invitations en attente du clan " + Tools.escapeHTML(Clans.getClanName(target)) + ":</strong> " + Tools.escapeHTML(Clans.getInvitations(target).sort().join(", "))
		);
	},
	clan: 'getclan',
	getclan: function (target, room, user) {
		var autoClan = false;
		var memberClanProfile = false;
		var clanMember = "";
		if (!target) autoClan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getProfile(target);
		if (!clan) {
			clanMember = target;
			target = Clans.findClanFromMember(target);
			memberClanProfile = true;
			if (target)
				clan = Clans.getProfile(target);
		}
		if (!clan && autoClan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getProfile(target);
			memberClanProfile = true;
			clanMember = user.name;
		}
		if (!clan) {
			this.sendReply("Le clan spécifié n'existe pas ou n'est pas disponible.");
			return;
		}
		var salaClanSource = "";
		if (clan.sala === "none") {
			salaClanSource = 'Pas encore assignée.';
		} else {
			salaClanSource = '<button name="send" value="/join ' + Tools.escapeHTML(clan.sala) + '" target="_blank">' + Tools.escapeHTML(clan.sala) + '</button>';
		}
		var clanTitle = "";
		if (memberClanProfile) {
			var authValue = Clans.authMember(target, clanMember);
			if (authValue === 3) {
				clanTitle = clanMember + " - Chef du Clan " + clan.compname;
			} else if (authValue === 2) {
				clanTitle = clanMember + " - Lieutenant(e) du Clan " + clan.compname;
			} else if (authValue === 1) {
				clanTitle = clanMember + " - Officiel(le) du Clan " + clan.compname;
			} else {
				clanTitle = clanMember + " - Membre du Clan " + clan.compname;
			}
		} else {
			clanTitle = clan.compname;
		}
		var medalsClan = '';
		if (clan.medals) {
			for (var u in clan.medals) {
				medalsClan += '<img id="' + u + '" src="' + encodeURI(clan.medals[u].logo) + '" width="32" title="' + Tools.escapeHTML(clan.medals[u].desc) + '" />&nbsp;&nbsp;';
			}
		}
		this.sendReplyBox(
			'<div class="fichaclan">' +
			'<h4><center><p> <br />' + Tools.escapeHTML(clanTitle) + '</center></h4><hr width="90%" />' +
			'<table width="90%" border="0" align="center"><tr><td width="180" rowspan="2"><div align="center"><img src="' + encodeURI(clan.logo) +
			'" width="160" height="160" /></div></td><td height="64" align="left" valign="middle"><span class="lemaclan">'+ Tools.escapeHTML(clan.lema) +
			'</span></td> </tr>  <tr>    <td align="left" valign="middle"><strong>Salle Personnelle</strong>: ' + salaClanSource +
			' <p style="font-style: normal;font-size: 16px;"><strong>Puntuación</strong>:&nbsp;' + clan.rating +
			' (' + clan.wins + ' Victoires, ' + clan.losses + ' Défaites, ' + clan.draws + ' Égalités)<br />' +
			' </p> <p style="font-style: normal;font-size: 16px;">&nbsp;' + medalsClan +
			'</p></td>  </tr></table></div>'
		);
	},

	setdeviseclan: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Utilisation: /setdeviseclan clan, devise");

		if (!Clans.setLema(params[0], params[1]))
			this.sendReply("Le clan n'existe pas, ou la devise dépasse la limite de 80 caractères.");
		else {
			this.sendReply("La nouvelle devise du clan " + params[0] + " a été établie avec succès.");
		}
	},

	setlogoclan: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Utilisation: /setlogoclan clan, logo (url)");

		if (!Clans.setLogo(params[0], params[1]))
			this.sendReply("Le clan n'existe pas, ou le lien dépasse la limite de 120 caractères.");
		else {
			this.sendReply("Le nouveau logo du clan " + params[0] + " a été établi avec succès.");
		}
	},

	settitleclan: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Utilisation: /settitleclan clan, titre");

		if (!Clans.setCompname(params[0], params[1]))
			this.sendReply("Le clan n'existe pas, ou le titre dépasse la limite de 80 caractères.");
		else {
			this.sendReply("Le nouveau titre du clan " + params[0] + " a été établi avec succès.");
		}
	},

	setrankclan: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Utilisation: /setrankclan clan, valeur");

		if (!Clans.setRanking(params[0], params[1]))
			this.sendReply("Le clan n'existe pas, ou la valeur n'est pas valide.");
		else {
			this.sendReply("Le nouveau rank du clan " + params[0] + " a été établi avec succès.");
		}
	},

	setgxeclan: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 4) return this.sendReply("Utilisation: /setgxeclan clan, victoires, défaites, égalités");

		if (!Clans.setGxe(params[0], params[1], params[2], params[3]))
			this.sendReply("Le clan n'existe pas, ou certaines valeurs sont erronées..");
		else {
			this.sendReply("Le nouveau GXE du clan " + params[0] + " a été établi avec succès.");
		}
	},

	setroomclan: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Utilisation: /setroomclan clan, room");

		if (!Clans.setSala(params[0], params[1]))
			this.sendReply("Le clan n'existe pas, ou le nom de la room dépasse la limite de 80 caractères.");
		else {
			this.sendReply("La nouvelle room du clan " + params[0] + " a été établie avec succès.");
		}
	},
	
	giveclanmedal: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 4) return this.sendReply("Usage: /giveclanmedal clan, médaille ID, image, description");

		if (!Clans.addMedal(params[0], params[1], params[2], params[3]))
			this.sendReply("Le clan n'existe pas, ou l'une des données est incorrecte.");
		else {
			this.sendReply("Vous avez attitré la médaille au clan " + params[0]);
		}
	},
	
	removeclanmedal: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Utilisation: /removeclanmedal clan, médaille Id");

		if (!Clans.deleteMedal(params[0], params[1]))
			this.sendReply("Le clan n'existe pas, ou ne possédait pas de médaille.");
		else {
			this.sendReply("Vous avez retiré une médaille au clan " + params[0]);
		}
	},

	deviseclan: function (target, room, user) {
		var permisionClan = false;
		if (!target) return this.sendReply("Vous devez spécifier une devise.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue === 3) permisionClan = true;
			if (!permisionClan && !this.can('clans')) return false;
		} else {
			return false;
		}
		var claninfo = Clans.getElementalData (clanUser);
		if (room && room.id === toId(claninfo.sala)) {
			if (!Clans.setLema(clanUser, target))
				this.sendReply("La devise dépasse la limite autorisée de 80 caractères.");
			else {
				this.addModCommand("Une nouvelle devise pour le clan " + clanUser + " a été établie par " + user.name);
			}
		} else {
			this.sendReply("Cette commande peut uniquement être utilisée dans la room du clan.");
		}
	},

	logoclan: function (target, room, user) {
		var permisionClan = false;
		if (!target) return this.sendReply("Vous devez spécifier un logo.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue === 3) permisionClan = true;
			if (!permisionClan && !this.can('clans')) return false;
		} else {
			return false;
		}
		var claninfo = Clans.getElementalData (clanUser);
		if (room && room.id === toId(claninfo.sala)) {
			if (!Clans.setLogo(clanUser, target))
				this.sendReply("Le lien du logo dépasse la limite autorisée de 120 caractères. Utilisez un hébergeur d'image comme imgur ou Noelshack afin de raccourcir le lien de votre image !");
			else {
				this.addModCommand("Un nouveau logo pour le clan " + clanUser + " a été établi par " + user.name);
			}
		} else {
			this.sendReply("Cette commande peut uniquement être utilisée dans la room du clan.");
		}
	},

	llamarmiembros: 'fjg',
	fjg: function (target, room, user) {
		var permisionClan = false;
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue === 2 || perminsionvalue === 3) permisionClan = true;
			if (!permisionClan && !this.can('clans')) return false;
		} else {
			return false;
		}
		var claninfo = Clans.getElementalData (clanUser);
		if (room && room.id === toId(claninfo.sala)) {
			var clanMembers = Clans.getMembers(clanUser);
			var targetUser;
			for (var i = 0; i < clanMembers.length; ++i) {
				if (!room.users[toId(clanMembers[i])]) {
					targetUser = Users.get(clanMembers[i])
					if (targetUser && targetUser.connected) {
						targetUser.joinRoom(room.id);
						targetUser.popup('Vous avez été appelé à rejoindre la room ' + claninfo.sala.trim() + ' par ' + user.name + '.');
					}
				}
			}
			this.addModCommand("Les membres du clan " + clanUser + " ont été appelés à la room " + toId(claninfo.sala) + ' par ' + user.name + '.');
		} else {
			this.sendReply("Cette commande peut uniquement être utilisée dans la room du clan.");
		}
	},

	addclanmember: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (params.length !== 2) return this.sendReply("Utilisation: /addclanmember clan, membre");

		var user = Users.getExact(params[1]);
		if (!user || !user.connected) return this.sendReply("L'utilisateur " + params[1] + " n'est pas en ligne.");

		if (!Clans.addMember(params[0], params[1]))
			this.sendReply("Action refusée. Peut-être que cet utilisateur est déjà dans un autre clan, ou que le clan spécifié n'existe pas ?");
		else {
			this.sendReply("L'utilisateur " + user.name + " a rejoint le clan avec succès.");
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(user.name) + " a rejoin le clan: " + Tools.escapeHTML(Clans.getClanName(params[0])) + '</div>');
		}
	},

	clanleader: 'liderclan',
	chef: function (target, room, user) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (!params) return this.sendReply("Utilisation: /chef membre");

		var userk = Users.getExact(params[0]);
		if (!userk || !userk.connected) return this.sendReply("L'utilisateur " + params[0] + " n'existe pas ou n'est pas disponible.");

		if (!Clans.addLeader(params[0]))
			this.sendReply("L'utilisateur n'existe pas, n'appartient à aucun clan ou était déjà Chef de ce clan.");
		else {
			var clanUser = Clans.findClanFromMember(params[0]);
			this.sendReply("L'utilisateur " + userk.name + " a été nommé Chef du clan " + clanUser + " avec succès.");
			userk.popup(user.name + " vous a nommé Chef du clan " + clanUser + ".\nUtilisez la commande /clanhelp pour plus d'informations.");
		}
	},

	officiel: 'oficialclan',
	clanoficial: 'oficialclan',
	oficialclan: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
				return this.sendReply("Usage: /officiel membre");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if ((perminsionValue === 2 || perminsionValue === 3) && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('clans')) return;
		var userk = Users.getExact(params[0]);
		if (!userk || !userk.connected) return this.sendReply("L'utilisateur " + params[0] + " n'existe pas ou n'est pas disponible.");
		if (clanTarget) {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('clans')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('clans'))) return false;
		}
		if (!Clans.addOficial(params[0]))
			this.sendReply("L'utilisateur n'existe pas, n'appartient à aucun clan, ou était déjà Officiel de ce clan..");
		else {
			this.sendReply("L'utilisateur " + userk.name + " a été nommé Officiel du clan " + clanTarget + " avec succès.");
			userk.popup(user.name + " vous a nommé Officiel du clan " + clanTarget + ".\nUtilisez la commande /clanhelp pour plus d'informations.");
		}
	},
	
	lieutenant: 'subliderclan',
	clansubleader: 'subliderclan',
	subliderclan: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
				return this.sendReply("Utilisation: /lieutenant membre");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionValue === 3 && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('clans')) return;
		var userk = Users.getExact(params[0]);
		if (!userk || !userk.connected) return this.sendReply("L'utilisateur " + params[0] + " n'existe pas ou n'est pas disponible.");
		if (clanTarget) {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('clans')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('clans'))) return false;
		}
		if (!Clans.addSubLeader(params[0]))
			this.sendReply("L'utilisateur n'existe pas, n'appartient à aucun clan, ou était déjà Lieutenant(e) de ce clan.");
		else {
			this.sendReply("L'utilisateur " + userk.name + " a été nommé Lieutenant(e) du clan " + clanTarget + " avec succès.");
			userk.popup(user.name + " vous a nommé Lieutenant(e) du clan " + clanTarget + ".\nUtilisez la commande /clanhelp pour plus d'informations.");
		}
	},

	degradarclan: 'declanauth',
	demoteclan: 'declanauth',
	declanauth: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
			return this.sendReply("Utilisation: /demoteclan membre");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionValue >= 2 && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('clans')) return;
		var userk = Users.getExact(params[0]);
		if (!clanTarget) {
			return this.sendReply("L'utilisateur n'existe pas ou n'appartient à aucun clan.");
		} else {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('clans')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('clans'))) return false;
		}
		if (!Clans.deleteLeader(params[0])) {
			if (!Clans.deleteOficial(params[0])) {
				this.sendReply("L'utilisateur ne possédait aucune autorité au sein du clan.");
			} else {
				if (!userk || !userk.connected) {
					this.addModCommand(params[0] + " a été rétrogradé " + clanTarget + " du clan par " + user.name);
				} else {
					this.addModCommand(userk.name + " a été rétrogradé " + clanTarget + " du clan par " + user.name);
				}
			}
		} else {
			var oficialDemote = Clans.deleteOficial(params[0]);
			if (!userk || !userk.connected) {
				this.addModCommand(params[0] + " a été rétrogradé " + clanTarget + " du clan par " + user.name);
			} else {
				this.addModCommand(userk.name + " a été rétrogradé " + clanTarget + " du clan par " + user.name);
			}
		}
	},

	inviteclan: function (target, room, user) {
		var permisionClan = false;
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var permisionValue = Clans.authMember(clanUserid, iduserwrit);
			if (permisionValue > 0) permisionClan = true;
		}
		if (!permisionClan) return this.sendReply("/inviteclan - Accès refusé.");
		var params = target.split(',');
		if (!params) return this.sendReply("Utilisation: /inviteclan utilisateur");
		var userk = Users.getExact(params[0]);
		if (!userk || !userk.connected) return this.sendReply("L'utilisateur " + params[0] + " n'existe pas ou n'est pas disponible.");
		if (!Clans.addInvite(clanUser, params[0]))
			this.sendReply("L'utilisateur n'a pas pu être invité. N'existe-t-il pas, avait-il déjà été invité ou appartient-il déjà à un autre clan ?");
		else {
			clanUser = Clans.findClanFromMember(user.name);
			userk.popup(user.name + " vous a invité à rejoindre le clan " + clanUser + ".\nPour accepter son invitation, écris /acceptclan " + clanUser);
			room.addRaw(userk.name + " a été invité à rejoindre le clan " + clanUser + " par " + user.name);
		}
	},
	acceptclan: 'aceptarclan',
	aceptarclan: function (target, room, user) {
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			return this.sendReply("Vous appartenez déjà à un clan, vous ne pouvez pas en rejoindre un autre.");
		}
		var params = target.split(',');
		if (!params) return this.sendReply("Utilisation: /acceptclan clan");
		var clanpropio = Clans.getClanName(params[0]);
		if (!clanpropio) return this.sendReply("Le clan spécifié n'existe pas ou n'est pas disponible.");

		if (!Clans.aceptInvite(params[0], user.name))
			this.sendReply("Le clan spécifié n'existe pas, ou vous n'y avez pas été invité.");
		else {
			this.sendReply("Vous avez rejoint avec succès le clan" + clanpropio);
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(user.name) + " a rejoint le clan " + Tools.escapeHTML(Clans.getClanName(params[0])) + '</div>');
		}
	},
	removeinvitations:'borrarinvitaciones',
	inviteclear: 'borrarinvitaciones',
	borrarinvitaciones: function (target, room, user) {
		var permisionClan = false;
		var clanUser = Clans.findClanFromMember(user.name);
		if (!target) {
			if (clanUser) {
				var clanUserid = toId(clanUser);
				var iduserwrit = toId(user.name);
				var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
				if (perminsionvalue === 3) permisionClan = true;
			}
			if (!permisionClan) return false;
		} else {
			if (!this.can('clans')) return;
			clanUser = target;
		}
		if (!Clans.clearInvitations(clanUser))
			this.sendReply("Le clan n'existe pas ou n'est pas disponible.");
		else {
			this.sendReply("Liste d'invitations du clan " + clanUser + " effacée avec succès.");
		}
	},

	removeclanmember: function (target) {
		if (!this.can('clans')) return false;
		var params = target.split(',');
		if (params.length !== 2) return this.sendReply("Usage: /removeclanmember clan, member");
		if (!Clans.removeMember(params[0], params[1]))
			this.sendReply("Action impossible. Le clan existe-t-il, et si oui, l'utilisateur n'en a-t-il pas déjà été exclu ?");
		else {
			this.sendReply("Utilisateur " + params[1] + " exclu du clan avec succès.");
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(params[1]) + " a quitté le clan: " + Tools.escapeHTML(Clans.getClanName(params[0])) + '</div>');
		}
	},

	expulseclan: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
				return this.sendReply("Utilisation: /expulseclan membre");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionValue >= 2 && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('clans')) return;
		var currentWar = War.findClan(clanTarget);
		if (currentWar) {
			var currentWarParticipants = War.getTourData(currentWar);
			if (currentWarParticipants.teamAMembers[toId(params[0])] || currentWarParticipants.teamBMembers[toId(params[0])]) return this.sendReply("Vous ne pouvez pas exclure un membre d'un clan si le membre prend part à une war.");
		}
		var userk = Users.getExact(params[0]);
		if (!clanTarget) {
			return this.sendReply("L'utilisateur n'existe pas ou n'appartient à aucun clan.");
		} else {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('clans')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('clans'))) return false;
		}
		if (!Clans.removeMember(clanTarget, params[0])) {
			this.sendReply("L'utilisateur n'a pas pu être exclu du clan.");
		} else {
			if (!userk || !userk.connected) {
				this.addModCommand(params[0] + " a été exclu du clan " + clanTarget + " par " + user.name);
			} else {
				this.addModCommand(userk.name + " a été exclu du clan " + clanTarget + " par " + user.name);
			}
		}
	},

	 leaveclan: 'abandonarclan',
	 salirdelclan: 'abandonarclan',
	 clanleave: 'abandonarclan',
	 abandonarclan: function (target, room, user) {
		var clanUser = Clans.findClanFromMember(user.name);
		if (!clanUser) {
			return this.sendReply("Comment quitter un clan alors que vous n'en appartenez à aucun ?");
		}
		var currentWar = War.findClan(clanUser);
		if (currentWar) {
			var currentWarParticipants = War.getTourData(currentWar);
			if (currentWarParticipants.teamAMembers[toId(user.name)] || currentWarParticipants.teamBMembers[toId(user.name)]) return this.sendReply("Vous ne pouvez pas quitter le clan en plein milieu d'une war.");
		}
		if (!Clans.removeMember(clanUser, user.name)) {
			 this.sendReply("Erreur lors de la tentative de quitter le clan.");
		} else {
			this.sendReply("Vous avez quitté le clan" + clanUser);
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(user.name) + " a abandonné le clan " + Tools.escapeHTML(Clans.getClanName(clanUser)) + '</div>');
		}
	},


	//new war system
	resetclanranking: function (target, room, user) {
		if (!this.can('clans')) return false;
		if (room.id !== 'staff') return this.sendReply("Cette commande ne peut être utilisée que dans la room Staff.");
		Clans.resetClansRank();
		this.addModCommand(user.name + " a réinitialisé le rank des clans.");
	},
	
	resetwarlog: function (target, room, user) {
		if (!this.can('clans')) return false;
		if (room.id !== 'staff') return this.sendReply("Cette commande ne peut être utilisée que dans la room Staff.");
		Clans.resetWarLog();
		this.addModCommand(user.name + " a effacé tous les logs de wars.");
	},
	
	pendingwars: 'wars',
	wars: function (target, room, user) {
		this.parse("/war search");
	},

	viewwar: 'vw',
	warstatus: 'vw',
	vw: function (target, room, user) {
		this.parse("/war round");
	},
	
	endwar: function (target, room, user) {
		this.parse("/war end");
	},
	
	warlog: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("Le clan spécifié n'existe pas ou n'est pas disponible.");
			return;
		}
		var f = new Date();
		var dateWar = f.getDate() + '-' + f.getMonth() + ' ' + f.getHours() + 'h';
		this.sendReply(
			"|raw| <center><big><big><b>Dernières wars du clan " + Tools.escapeHTML(Clans.getClanName(target)) + "</b></big></big> <br /><br />" + Clans.getWarLogTable(target) + '<br /> Date du serveur: ' + dateWar + '</center>'
		);
	},
	
	cerrarsalaclan: 'closeclanroom',
	closeclanroom: function (target, room, user) {
		var permisionClan = false;
		var clanRoom = Clans.findClanFromRoom(room.id);
		if (!clanRoom) return this.sendReply("Cette room n'est pas une room de clan.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser && toId(clanRoom) === toId(clanUser)) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue >= 2) permisionClan = true;
			
		} 
		if (!permisionClan && !this.can('clans')) return false;
		if (!Clans.closeRoom(room.id, clanRoom))
			this.sendReply("Erreur lors de la tentative de fermer la room. Il est possible qu'elle le soit déjà.");
		else {
			this.addModCommand("Cette room a été fermée à tous ceux ne faisant pas partie du clan " + clanRoom + " par " + user.name);
		}
	},
	
	abrirsalaclan: 'openclanroom',
	openclanroom: function (target, room, user) {
		var permisionClan = false;
		var clanRoom = Clans.findClanFromRoom(room.id);
		if (!clanRoom) return this.sendReply("Cette room n'est pas une room de clan.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser && toId(clanRoom) === toId(clanUser)) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue >= 2) permisionClan = true;
			
		} 
		if (!permisionClan && !this.can('clans')) return false;
		if (!Clans.openRoom(room.id, clanRoom))
			this.sendReply("Erreur lors de la tentative d'ouvrir la salle. Il est possible qu'elle le soit déjà.");
		else {
			this.addModCommand("Cette room a été réouverte à tout le monde par " + user.name);
		}
	},
	
	kickall: function (target, room, user, connection) {
		if (!this.can('makeroom')) return false;
		var targetUser;
		for (var f in room.users) {
			targetUser = Users.getExact(room.users[f]);
			if (!targetUser) {
				delete room.users[f];
			} else {
				targetUser.leaveRoom(room.id);
			}
		}
		room.userCount = 0;
		this.addModCommand("" + user.name + " a kické tous les utilisateurs de la room " + room.id + '.');
		setTimeout(function () {user.joinRoom(room.id);}, 2000);
	}
};
