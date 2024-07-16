const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0tkRVFpdVZ3UjNCRUQxTkJPREdFU2pTOG1NRmlKSVRPcDB4bFZwZXQwcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVFndUtMN1FLWXlkMjgxcDRXNmdBcm5yQWsyQWY2YXY2TTQ5OERTc3Jucz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QVVJdG5pTEZkNGlwUUFSQm1oTjNxTFpMZ0o3aTNTTTc5cG54OEZxNlY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiWU1qWE1obWdqaXFnRFJjSERRZXpmMDZyYndpaVErYzdPVWxEdkx0S21zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllCdmErcE01U25meGh3MG9VQXNMRHIvL1dhYXNGNHVyMXJLYnJPUEJsSDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5Sb21wbnc0VUViK2N4Ym5QUGFPMzREZCs3Sms1ZkFZZnA2eXhIR3JPV3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUF3c1hpeE1mMnplTDR3YnFJZUNHclhpa2NKeWtBQ1RaTndxNW81M2VYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJmVFRMVDNKaFhPTlRyTDYrWUtheWRQbDBGcGJCVVdXVGJETnJwYTdWTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhXaHk0SlNOQzVJSm9FMkhXRVVXR2tLZlh2UHVrbXQyVFR4d3pNd1RQOGtWRWpkck5SYjczY0RyUzl4LzB1bDZib0g4ZktWM0tXOUNFay9sNVJ6c2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTYsImFkdlNlY3JldEtleSI6IlNSc3MxamVkc1ZhbnNjVkFiMkV2Z3VYaUp0cnZjOGdGTG4wdjliMDlHQ0U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzc4ODgxMTIwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVBNzE3NzJBRDA2Q0E3QTVENDBFOUQwRDMzNzJBMzU4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjExMTIwMDl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc3ODg4MTEyMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDOTYyN0E4Mjk0NzJFMEQ0NzZGQUM4N0I2OTRGQkNDOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMTEyMDA5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5S1lKcVhNWlJXRzdPTktUQ2hkeTFBIiwicGhvbmVJZCI6ImEyNzMwN2FjLWQxN2UtNDM3MS1iMzZlLTUxYzZiYTRkM2NhZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaQmkyeHhZTXR2QllvcGNaUThwTFQyZFlqWVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUU0ZW1ITktmdG0xMDFmWGJHTVA5R2FmM0FrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNSWEc0MlZQIiwibWUiOnsiaWQiOiIyNjM3Nzg4ODExMjA6OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJMbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlg5bkpNRkVMbXIyTFFHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUWR3SEZQNG9ud2svUEs4VTltT3FtQXREL2pGdXgycFl6d0ZrdFZzWGpYdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibzN6TXNKQ3dKeTJWYUNhRDlQN2QwZWZOM2ZCMlZXdndTZWhWWHV0d2Yxem0wVy9XNG9NZTNSMkdaM0g1T2s3dk4rdjQyWEdMWEdTSUZBVjNRZlFEQlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImhzQWJsUkFBQ1VmeVhoYTkvSnJJNmRpZVBZK0prdWtXNkUvY2NWVnFHMTlXdFhxSlJPMjBtcnlWcUJ2U1laSmNCbVlOZENUS3dETC8rSmQvb1hFTWhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzc4ODgxMTIwOjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVUhjQnhUK0tKOEpQenl2RlBaanFwZ0xRLzR4YnNkcVdNOEJaTFZiRjQxOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTExMjAwNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJa0IifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "YUNGTEE",
    NUMERO_OWNER : process.env.OWNER_NUM || "26371264014",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TASSA',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
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
