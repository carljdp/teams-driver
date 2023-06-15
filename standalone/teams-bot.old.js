
// const Node = {
//     console: await import('node:console'),
//     fs: await import('node:fs'),
// }

import console from 'node:console';
import { default as fs } from 'node:fs';

// import fs from "node:fs"
import { remote } from "webdriverio"

import 'dotenv/config'
const credentials = {
    email: process.env.NODE_APP__MSTEAMS_EMAIL,
    username: process.env.NODE_APP__MSTEAMS_USERNAME,
    password: process.env.NODE_APP__MSTEAMS_PASSWORD,
}


const site = {
    url: "https://teams.microsoft.com/",
    loginPageStartsWith: "https://teams.microsoft.com/_#/"
}

const browserConfig = {
    chrome: {
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--disable-extensions'], // disable browser extensions/plugins
            },
        }
    },
    edge: {
        capabilities: {
            browserName: 'edge',
            'ms:edgeOptions': {
                args: ['--disable-extensions'], // disable browser extensions/plugins for Microsoft Edge
            },
        }
    },
    firefox: {
        capabilities: {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: ['-safe-mode'], // additional options for Firefox
            },
        }
    },
}

const outputMarkdownFile = './thread.md'

async function loginToTeams() {
    const browser = await remote(browserConfig.chrome);

    try {
        // Launch Chrome browser and navigate to Microsoft Teams login page
        await browser.url(site.url)

        // Perform login using provided account credentials
        await browser.$('#i0116').setValue(credentials.username)
        await browser.$('#idSIButton9').click()
        await browser.$('#i0118').setValue(credentials.password)
        await browser.$('#idSIButton9').click()

        // Wait for login to complete and navigate to the specified team and channel
        await browser.waitUntil(
            async () => (await browser.getUrl()).startsWith(site.loginPageStartsWith),
            {
                timeout: 5000,
                timeoutMsg: 'Login timed out',
            }
        )

        await browser.pause(2000) // Wait for any dynamic content to load

        // Navigate to the desired team
        await browser.$('.team-menu > ul > li:first-child').click()

        await browser.pause(2000) // Wait for any dynamic content to load

        // Navigate to the desired channel
        await browser.$('.channel-list-content > div:first-child').click()

        await browser.pause(2000) // Wait for any dynamic content to load

        // Retrieve the last thread in the channel
        const thread = await browser.$('.ts-message:last-child')
        const threadText = await thread.getText()

        // Save the thread content to a markdown file
        fs.writeFileSync(outputMarkdownFile, threadText)

        console.log('Thread saved successfully!')
    } catch (error) {
        console.error('An error occurred:', error)
    } finally {
        // Close the browser
        await browser.deleteSession()
    }
}

console.log(await loginToTeams())
