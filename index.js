require('dotenv').config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// CHANGE THESE
const VERIFIED_ROLE_ID = "1447708082447585442";
const MEMBER_ROLE_ID = "1447329528392192212";

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    // If they have Verified now, but don't have Member yet
    if (
      newMember.roles.cache.has(VERIFIED_ROLE_ID) &&
      !newMember.roles.cache.has(MEMBER_ROLE_ID)
    ) {
      await newMember.roles.add(MEMBER_ROLE_ID);
    }
  } catch (err) {
    console.error("Role assignment error:", err);
  }
});

client.login(process.env.TOKEN);