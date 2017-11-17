const fs = require('fs');
const path = require('path')
const { promisify } = require('util');
const fileName = '../chatIds';


const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const addChatIdToConfig = chatId => {
    console.log('addChatIdToConfig')
    getChatIds().then(chatIds => writeChatIds([...chatIds, chatId]))
}

const removeChatIdFromConfig = chatId => {
    console.log('removeChatIdFromConfig')
    getChatIds().then(chatIds => writeChatIds(chatIds.filter(id => id != chatId)))
}

const writeChatIds = chatIds =>
    writeFileAsync(path.resolve(__dirname, fileName), chatIds ? chatIds.join('\n') : '')
        .catch(err => console.error(err))

const getChatIds = () =>
    readFileAsync(path.resolve(__dirname, fileName), { encoding: 'utf-8' })
        .then(str => Promise.resolve(str ? str.split('\n') : []))
        .catch(err => console.error(err))

module.exports = {
    addChatIdToConfig,
    removeChatIdFromConfig,
    getChatIds
}