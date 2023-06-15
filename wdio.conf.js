export const config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js' // Modify the path according to your project structure
    ],
    capabilities: [{
        browserName: 'chrome' // You can use other browsers too
    }],
    logLevel: 'error',
    deprecationWarnings: true,
    bail: 0,
    baseUrl: 'http://localhost', // Modify the base URL as per your requirements
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    services: ['chromedriver']
};
