const bot = require('./bot')
const pluralize = require('pluralize-ru')
const {getChatIds} = require('./modifyConfig')



const commits = ['коммитов', 'коммит', 'коммита', 'коммитов']
const whole = ['целых', 'целый', 'целых', 'целых']

const makeMessage = ({ username, branch, count, reponame, additional }) => {
    const repo = reponame.replace && reponame.replace('.git', '')
    const pluralizedCommits = pluralize(count, ...commits)
    const pluralizedWhole = pluralize(count, ...whole)
    return `Этсамое, тут пуш в \`${repo}\`/\`${branch}\` прилетел, там \`${username}\` накатал аж ${pluralizedWhole} \`${count}\` ${pluralizedCommits}:\n\`${additional}\``
}

module.exports = options =>
    getChatIds()
        .then(chatIds =>
            chatIds.forEach(id => {
                bot.sendMessage(id, makeMessage(options), {parseMode: 'Markdown'})
            })
        )
        .catch(console.error)
