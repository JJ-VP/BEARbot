<h1 align="center">
    BEAR-bot
</h1>

### What is BEAR-bot?

BEAR-bot is a Discord bot originally written for BEAR PMC but expanded with general bot functionality

### Requirement

- [git](https://git-scm.com/)
- [nodeJs](https://nodejs.org/)

## How to install this bot

### Clone this repo

`git clone https://github.com/JJ-VP/BEARbot.git`

### Install dependancies

`npm i`

### Setup the bot token

1. Get your bot token from [Discord Developer Portal](https://discord.com/developers/applications/)
2. Create a file in the bot root called `.env`
3. Put the following in the file

```
TOKEN=*token from Discord Developers portal*
```

### Starting the bot

To run the bot in development mode you will require nodemon `npm i -g nodemon` to allow for file watching (automatic restart on changes)

- Normal: `npm run start`
- Dev: `npm run dev`
