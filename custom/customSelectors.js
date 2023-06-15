import {credentials} from "../loadEnvVars.js";

// import {remote} from 'webdriverio'
// import { browser, $, $$, expect } from '@wdio/globals'


const findElementsWithText = (selector, searchText) => {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(element => {
        return element.textContent.includes(searchText);
    });
}


export class Q {

    // /** @type {ChainablePromiseArray} */
    elements

    /** @type {WebdriverIO.Browser} */
    browser

    constructor(browserInstance) {
        this.browser = browserInstance
    }

    // async from(rootSelector = 'html', subSelector = null) {
    //     this.elements = (subSelector) ? await this.browser.$(rootSelector).$$(subSelector) : await this.browser.$$(rootSelector)
    //     return this
    // }

    async from(rootSelector = 'html', subSelector = '*') {
        this.elements = await this.browser.$$(`${rootSelector} ${subSelector}`)
        return this
    }


    // async $(...$args) {
    //     if (!$args) return this
    //     this.elements = (this.elements) ? await this.elements.$(...$args) : await this.browser.$(...$args)
    //     return this;
    // }


    // async $(...$args) {
    //     if (!$args) return this;
    //     this.elements = this.elements ? await this.elements.$(...$args) : await this.browser.$(...$args);
    //     return this.elements;
    // }


    // async $$(...$$args) {
    //     if (!$$args) return this
    //     this.elements = (this.elements) ? await this.elements.$$(...$$args) : await this.browser.$$(...$$args)
    //     return this;
    // }

    // async filterWithTag(tagName) {
    //     if (!tagName) return this
    //     this.elements = await this.elements.$$(`${tagName}`);
    //     return this;
    // }

    // async filterWithClass(className) {
    //     if (!className) return this
    //     this.elements = await this.elements.$$(`.${className}`);
    //     return this;
    // }

    async whereIsDisplayed() {
        this.elements = await Promise.all(this.elements.map(async (element) => {
            return (await element.isDisplayed()) ? element : null;
        }));

        this.elements = this.elements.filter(Boolean); // Remove any null elements from the array

        return this;
    }


    async whereHasDescendantsWithText(selector, regex) {
    if (!selector || !regex) return this;

    const hasMatchingSubElement = async (element) => {
        const subElements = await element.$$(selector);
        const matchingSubElements = await Promise.all(subElements.map(subElement => subElement.getText()));
    return matchingSubElements.some(subElementText => regex.test(subElementText));
    };

    this.elements = (await Promise.all(this.elements.map(async element => {
        return (await hasMatchingSubElement(element)) ? element : null;
    }))).filter(Boolean);

    return this;
    }




    /**
     * Get first or nth form start or end
     * @param i nth item, first if empty (null)
     // * @returns {Promise<*>}
     */
    async one(i = null) {
        if (i == null) return await this.elements[0]
        return  (i < 0) ? await this.elements[this.elements.length - i] : await this.elements[i]
    }

    async all() {
        return await this.elements;
    }

    async get() {
        return (this.elements.length === 1) ? await this.elements[0] : await this.elements
    }
}





// const ss = () => {
//     return $
// }
//
// const obj = {
//     executeSelector: async function() {
//         await browser.url('https://the-internet.herokuapp.com/shadowdom');
//         await $('h1').waitForDisplayed();
//         return $('>>>ul[slot="my-text"] li:last-child');
//     },
// };
//
// async function runWithoutWaiting() {
//     const elementPromise = obj.executeSelector();
//     elementPromise.then(async (element) => {
//         await element.click();
//         // add additional actions with the element here
//     });
// }
//
// const result = runWithoutWaiting(); // you can run this function without 'await'



// const getElementByInnerText = (elementToReturn, decententWithText, caseSensitive = false) {
//
//     const elements = $$('div[role="button"]').filter(el => new RegExp(text, 'i').test(el.getAttribute('aria-label')));
//
//     if (elements.length > 1) {
//         console.warn('Warning: Multiple matching elements found. Selecting the first one.');
//     }
//
//     return elements[0];
// }


function xPathFrom(selector) {
    const className = selector.match(/class\^="([^"]*)"/)[1];
    const textContent = selector.match(/contains\("([^"]*)"\)/)[1];
    return `//a[starts-with(@class, '${className}') and .//span[contains(text(), '${textContent}')]]`;
}




export const selector = {
    wwwMsDotCom: {
        signInToTeams: `a[class^="btn"]:has(span:contains("Sign in"))`,
    },
    msOnlineCom: {
        signOutOfPrompt: `div[role="heading"]:contains("Pick an account"))`,
        signOutOfButton: `div[role="button"][aria-label^="Sign out"]:has(small:contains("${credentials.email}"))`,
        signInWithPrompt: `div[role="heading"]:contains("Pick an account"))`,
        signInWithButton: `div[role="button"][aria-label^="Sign in with ${credentials.email}"]`,
        signInPasswordPrompt: `div[role="heading"]:contains("Enter Password"))`,
        signInPasswordField: `input[name="passwd"][type="password"][aria-label^="Enter the password for ${credentials.email}"]`,
        authenticatorAppWaiting: `div[role="heading"]:contains("Approve sign in request"))`,
        authenticatorAppTimeOut: `div[role="heading"]:contains("We didn't hear from you"))`,
        authenticatorAppTimeOutRetry: `a:contains("Send another request to my Microsoft Authenticator app"))`,
        signInStayPrompt: `div[role="heading"]:contains("Stay signed in?"))`,
        signInStayPromptNoMore: `label:has(span:contains("Don't show this again"))`,
        signInStayButton: `input[class~="button"][type="submit"][value="Yes"]`,
    },
    teamsMsCom: {
        useWebAppInstead: `a[class~="use-app-lnk"]:contains("Use the web app instead")`,
        profileIcon: `#personDropdown`,
        logoutButton: `#logout-button`,
        signOutAreYouSurePrompt: `confirmDialog-title`,
        signOutAreYouSureButton: `#confirmButton`,
        mainNavActivityButton: `button[class^="app-bar-"]:has(span:contains("Activity"))`,
        mainNavChatButton: `button[class^="app-bar-"]:has(span:contains("Chat"))`,
        mainNavTeamsButton: `button[class^="app-bar-"]:has(span:contains("Teams"))`,
        treeNavChannelGeneral: `a[class~="channel-anchor"][title="General"]`,
    },
}

export const getTeamAndChannelSelectors = (team, channel) => {
    return {
        team: `div[class~="team"]:has(a[data-tid^="team-${team}"])`,
        channel: `a[class~="channel-anchor"][data-tid*="channel-${channel}"]`,
    }
}


export const urls = {
    wwwMsDotCom: {
        base: `https://www.microsoft.com/`,
        msTeamsLogin: `https://www.microsoft.com/en-za/microsoft-teams/log-in`,
    },
    teamsMsCom: {
        base: "https://teams.microsoft.com/",
    },
}