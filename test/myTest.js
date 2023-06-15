import { browser, $, $$, expect } from '@wdio/globals'


describe('My Webpage', () => {
    it('should have a title', () => {
        browser.url('http://example.com');
        const title = browser.getTitle();
        expect(title).toEqual('Example Domain');
    });
});
