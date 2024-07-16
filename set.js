const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVJcEFiNkZSY2Z5NEV1V2R6TFBoN0NJUXI5bG90NjlCd0hKY1Rwd0pXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTnlKTHlmN3NEYTQ2Yks4UlBLR0gzZE1mTGRvZ3ZHMDBpS0l4RG5OdThsST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QlNjVURCeThjUHBWUGhCT0xsT3FtVS84WG03RWRhUXlYbEkveWN1eTJRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxbzl3eitJK3VoRFR6NjdoN040Sks5eTF0YVRLSlNOSTAvanVUT0puaGswPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBWDRXbTdzRFh0bDFGZmw0VWR6SFdDQ3BVcVRXUlhpejVvcW12c3RnMXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitmeVlCUUI2QStqeGhmbkJ6OG5BeWxMTzVZSWtuSERRdTVtZnV4RDlPU2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUNLR0hvNVlZeG9XdDBBQjFZNVhjUGV4T00zWG5OQmNmNlh0Y0lMU0dVWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVlhvTnE2a0hEb3VVOGlRUEc2YzRIWkpQTWliUkd6blRGQlpkakk4KzhUST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iko2SGZILzZPRUZYWnExMjFISk40cnM4ZkcxZlN2UWordDZYMzdqeU5lV1UvUUE2d3NKQlV2aEhaN3g3VGcvZ1E4VkFXdjU0RGt4OGhQZlRxSm1TZ2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI5LCJhZHZTZWNyZXRLZXkiOiJ3Q3ZUK0l3UWVER0VSckFYdWtkTjBjb0g4eTdUT2YvS2czSXpadGdES1V3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIycC10MUJLbVMtaXo4bXFkVVNSZFdnIiwicGhvbmVJZCI6IjljNmY4YzgyLTMzYTUtNDQ3My1iYWUyLWI2ZmExNmZkNDM3MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwN2JLQ3YreXVOWVBPQ3VIV2pSQVJKZEpBR1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjFMd1ZqdXZwMi9tVnFSZWo3dHhHSFJJYUJFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNITEM4QVpSIiwibWUiOnsiaWQiOiIyNjM3Nzg4ODExMjA6OEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlg5bkpNRkVMeVIyTFFHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUWR3SEZQNG9ud2svUEs4VTltT3FtQXREL2pGdXgycFl6d0ZrdFZzWGpYdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiS3BNUEE2bDE5Q1NZbS9mZmJnUzlwdXMyOTlGMGtaZHlEV3E4TFRtcWlxQThMVUlWWGlIQ1BqQitQWUxVR2JMd3Z0NmFpUUl5Unk3emc0Vno0VmdOQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IklpRDNuOVQxL2Irb3VZQUwyYk5zTEIwUml2M2pyclVBRlA3NEVpY2VzMkdCOGxlNHBCbVh3S3doNjN4Vi9oNy9WdmZOQXJDUituUkJaOUZSeC9ka2d3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzc4ODgxMTIwOjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVUhjQnhUK0tKOEpQenl2RlBaanFwZ0xRLzR4YnNkcVdNOEJaTFZiRjQxOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTEwODY4MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJa0IifQ==',
    PREFIXE: process.env.PREFIX || "#",
    OWNER_NAME: process.env.OWNER_NAME || "𝐘𝐔𝐍𝐆𝐓𝐄𝐄",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TASSA',
    URL : process.env.BOT_MENU_LINKS || 'https://f.uguu.se/mNHaDjXm.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Zimbabwe/harare,
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
