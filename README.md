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

```
git clone https://github.com/JJ-VP/BEARbot.git
```

### Install dependancies

```
npm i
```

### Setup the bot token

1. Get your bot token from [Discord Developer Portal](https://discord.com/developers/applications/)
2. Get your MongoDB token from [Mongodb cloud](https://cloud.mongodb.com/)
3. Get your ChatGPT token from [OpenAI Account](https://platform.openai.com/account/api-keys)
4. Get your pastebin token from [Pastebin API Docs](https://pastebin.com/doc_api#1)
5. Create a file in the bot root called `.env`
6. Put the following in the file

```
TOKEN=*Token from Discord Developers portal*
DBURI=*Token from MongoDB*
AIAPI=*Token from ChatGPT*
PASTEAPI=*Token from pastebin*
```

### Starting the bot

- Normal: `npm run start`
- Dev: `npm run dev` *To run the bot in dev mode you will require nodemon `npm i -g nodemon` to allow for file watching (automatic restart on changes)*
