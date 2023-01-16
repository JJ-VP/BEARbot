module.exports = async (client, guildMember) => {
	try {
		if (guildMember.guild.id != `873678199723270175`) return;
		const roleID = `882709982380978186`;
		guildMember.roles.add(roleID);
		console.log(`"${guildMember.displayName}" just joined BEAR, assigned Recruit role!`);
	} catch (e) {
		console.log(e);
	}
};
