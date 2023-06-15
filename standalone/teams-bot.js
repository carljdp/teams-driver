
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import LoginPage from "../pages/www.microsoft.com_en-za_microsoft-teams_login.js";

await LoginPage.open()
console.log(await LoginPage.clickSignIn())


// const login = async () => {
//     const browser = browserWithCustomSelectors
//
//     try {
//         const cookieFilePath = resolve(__dirname, 'cookies.json');
//
//         if (existsSync(cookieFilePath)) {
//             const cookies = JSON.parse(readFileSync(cookieFilePath).toString('utf8'));
//             for (let cookie of cookies) {
//                 await browser.setCookies(cookie);
//             }
//         }
//
//         // Try login to teams via microsoft.com
//         try {
//             await browser.url('https://www.microsoft.com/en-za/microsoft-teams/log-in')
//             await browser.$(selector.wwwMsDotCom.signInToTeams).click();
//         } catch (error) {
//             console.log("Not logged in yet. Starting login process.");
//         }
//
//         // Get the handles of all open tabs
//         const handles = await driver.getWindowHandles();
//
//
//         // TODO - if logged in opens logged in site in new tab ??
//
//
//         // check if already logged in
//         try {
//             await browser.$(selector.teamsMsCom.profileIcon).click();
//             const signOutOption = await browser.$(selector.teamsMsCom.logoutButton);
//
//             if (await signOutOption.isDisplayed()) {
//                 console.log("Already logged in.");
//                 await browser.$(selector.teamsMsCom.profileIcon).click(); // Close the profile menu
//
//                 // TODO safe cookies is they changed
//                 await browser.deleteSession();
//                 return;
//             }
//         } catch (error) {
//             console.log("Not logged in yet. Starting login process.");
//         }
//
//         // start login process
//         await browser.$('selector-for-sign-in-button').click();
//         await browser.$('selector-for-email-input').setValue('your-email');
//         await browser.$('selector-for-next-button').click();
//         await browser.$('selector-for-password-input').setValue('your-password');
//         await browser.$('selector-for-sign-in-button').click();
//
//         // manually confirm 2FA and continue with login
//         while (true) {
//             try {
//                 const authRequestElement = await browser.$('selector-for-auth-request-element');
//                 if (await authRequestElement.isDisplayed()) {
//                     await browser.$('selector-for-retry-button').click();
//                 }
//             } catch (error) {
//                 break;
//             }
//             await browser.pause(2000);
//         }
//
//         // complete the login process
//         await browser.$('selector-for-stay-signed-in-checkbox').click();
//         await browser.$('selector-for-yes-button').click();
//         await browser.$('selector-for-turn-on-notifications-button').click();
//         await browser.$('selector-for-close-onboarding-tour-button').click();
//
//         // save cookies for next time
//         const cookies = await browser.getCookies();
//         writeFileSync(cookieFilePath, JSON.stringify(cookies));
//
//         await browser.deleteSession();
//         console.log("Login script finished.");
//     } catch (error) {
//         console.error('An error occurred:', error);
//         await browser.deleteSession();
//     }
// }
//
// console.log(await login())
