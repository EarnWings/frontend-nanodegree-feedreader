/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests are within the $() function to ensure they don't run
 * until the DOM is ready.
 */
$(function() {
    /* This test suite is all about the RSS feeds definitions, 
     * the allFeeds variable in the application.
     */
    describe('RSS Feeds', function() {
        /* This tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined and feed list is not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            }) 
        });
    });


    /* This test suite tests the menu visibility functionality */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            const htmlBody = document.querySelector('body');
            expect(htmlBody.classList.contains('menu-hidden')).toBe(true);
        });
         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            const htmlBody = document.querySelector('body');
            const menuIcon = document.querySelector('.menu-icon-link');

            menuIcon.click();
            expect(htmlBody.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(htmlBody.classList.contains('menu-hidden')).toBe(true);
        });
    });
    /* This test suite tests that there is at least 1 feed with info */
    describe('Initial Entries', function() {
        /* This test confirms that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('completes its work', function() {
            const feed = document.querySelector('.feed');
            const entries = feed.querySelector('.entry');
            expect(entries.length > 0).toBe(true);
        });
    });

    /* This test suite confirms that content changes when a new feed loads */
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        const feed = document.querySelector('.feed');
        const feed1 = [];

        beforeEach(function(done) {
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry) {
                feed1.push(entry.innerText);
            });
            loadFeed(1, done);
        });

        it('content changes', function() {
            Array.from(feed.children).forEach(function(entry, index) {
                expect(entry.innerText === feed1[index]).toBe(false);
            });
        });
    });
});
