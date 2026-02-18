const {baseHTML} = require('./baseHtml')
const {getNavBar} = require('./getNavBar')

function template(title, content, context) {
    return `
        ${baseHTML(title)}
        ${getNavBar(context)}
        <main>
            ${content}
        </main>
        </body>
        </html>
    `
}

module.exports = {template}