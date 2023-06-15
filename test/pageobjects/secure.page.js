

import Page from './page.js';

/**
 * sub-page containing specific custom and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define custom using getter methods
     */
    get flashAlert () {
        return $('#flash');
    }
}

export default new SecurePage();
