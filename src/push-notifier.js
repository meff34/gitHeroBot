const bot = require('./bot')

const argv = require('argv')
const pluralize = require('pluralize-ru')
const {getChatIds} = require('./modifyConfig')


argv.option([
    {
        name: 'count',
        type: 'int'
    },
    {
        name: 'branch',
        type: 'string'
    },
    {
        name: 'user',
        type: 'string'
    },
    {
        name: 'reponame',
        type: 'string'
    },
    {
        name: 'additional',
        type: 'string'
    }
]);

const options = argv.run().options

const commits = ['коммитов', 'коммит', 'коммита', 'коммитов']
const whole = ['целых', 'целый', 'целых', 'целых']

const makeMessage = ({ user, branch, count, reponame, additional }) => {
    const repo = reponame.replace && reponame.replace('.git', '')
    const pluralizedCommits = pluralize(count, ...commits)
    const pluralizedWhole = pluralize(count, ...whole)
    return `Этсамое, тут пуш в \`${repo}\`/\`${branch}\` прилетел, там \`${user}\` накатал аж ${pluralizedWhole} \`${count}\` ${pluralizedCommits}:\n\`${additional}\``
}

getChatIds()
    .then(chatIds =>
        chatIds.forEach(id => {
            bot.sendMessage(id, makeMessage(options), {parseMode: 'Markdown'})
        })
    )
    .catch(console.error)

