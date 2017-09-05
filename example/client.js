const mod = require('./index')

let ra = mod.init({
  browser: {
    headless: true
  },
  tenon:   {
    // Add your Tenon key here.
    key:    '<your_tenon_key>',

    // Add a Tenon Project ID here.
    projectID: '<your_project_id>',
  }
})

// Test 1
ra.run('rei.com_learn_page', async page => {
  await page.goto('http://www.rei.com/learn.html')
});