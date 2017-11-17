const bot = require('./bot')

const { addChatIdToConfig, removeChatIdFromConfig } = require('./modifyConfig')

bot.on('newChatMembers', ({new_chat_member, chat}) => {
    bot
        .getMe()
        .then(({id}) => {
            if (id !== new_chat_member.id) return
            addChatIdToConfig(chat.id)
            bot.sendMessage(chat.id, 'Дратути!')
        })
})

bot.on('leftChatMember', ({left_chat_member, chat}) => {
    bot
        .getMe()
        .then(({id}) => {
            if (id !== left_chat_member.id) return
            removeChatIdFromConfig(chat.id)
        })
})

bot.start()
