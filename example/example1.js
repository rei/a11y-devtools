/**
 * Template for creating a11y tests.
 *
 * - Copy this to your project directory.
 * - Add tenon key and projectID.
 * - Add tests.
 */
const a11yDevTools = require('a11y-devtools');

let devTools = a11yDevTools.init({
  browser: {
    headless: true
  },
  tenon:   {
    key:    '<your_tenon_key>',     // <-- Add your Tenon key here.
    projectID: '<your_project_id>', // <-- Add a Tenon Project ID here.
  }
})

// Test 1
// 1st arg: the tenon docID (Note, it must be >= 16 characters)
// 2nd arg: the puppeteer navigation commands controlling Chrome.
devTools.run('rei.com_learn_page', async page => {
  await page.goto('http://www.rei.com/learn.html')
});