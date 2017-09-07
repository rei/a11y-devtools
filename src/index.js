const puppeteer = require('puppeteer');
const Tenon = require('tenon-node');
const tenonReporters = require('tenon-reporters');
const R = require('ramda');
const fs = require('fs');
const path = require('path');

let globalOpts;

const tenonCreateReport = function tenonRunReport(opts) {
  const localOpts = opts;

  return new Promise((resolve, reject) => {
    console.log('[Tenon] Creating report..');
    const reportFilename = `${opts.docID}.html` || 'a11y-report.html';

    // Create reports dir if it doesn't already exist.
    const cwd = process.cwd();
    const reportsDir = path.join(cwd, 'reports');
    const reportFile = path.join(reportsDir, reportFilename);

    if (!fs.existsSync(reportsDir)) {
      console.log('Creating reports directory..');
      fs.mkdirSync(reportsDir);
    }

    tenonReporters.HTML(localOpts.results, (err1, report) => {
      if (err1) {
        reject(err1);
      }

      console.log(`[Tenon] Writing report to ${reportFilename}.`);
      fs.writeFile(reportFile, report, (err2) => {
        reject(err2);
      });
      resolve(report);
    });
  });
};

async function createTenonReport(opts) {
  const localOpts = await opts;
  await tenonCreateReport(localOpts);
  console.log('Done.');
}

const tenonCheckSource = function tenonCheckSource(o) {
  return new Promise((resolve, reject) => {
    const tenonApi = new Tenon(globalOpts.tenon);

    console.log('[Tenon] Checking source..');
    tenonApi.checkSrc(o.content, {
      projectID: globalOpts.tenon.projectID,
      docID: o.docID,
      level: 'AA',
    }, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

async function runTenon(opts) {
  const localOpts = await opts;
  let results;

  try {
    results = await tenonCheckSource(localOpts);
  } catch (e) {
    console.error(e);
  }
  return Object.assign({}, localOpts, {
    results,
  });
}

/**
 * Runs navigation callback and gets page content.
 * @param optsIn
 * @returns {Promise.<*>}
 */
async function getContent(optsIn) {
  const opts = await optsIn;

  console.log('[Chrome] Executing browser commands..');
  await opts.f(opts.page, opts.page.mainFrame());

  console.log('[Chrome] Getting page content..');
  const content = await opts.page.content();

  opts.browser.close();

  return Object.assign({}, opts, {
    content,
  });
}

const getPage = async function getPage(docID, f) {
  console.log('[Chrome] Getting browser instance..');
  const browser = await puppeteer.launch(globalOpts.browser);
  const page = await browser.newPage();
  return {
    docID,
    browser,
    page,
    f,
  };
};

const run = R.compose(
  createTenonReport,
  runTenon,
  getContent,
  getPage
);

/**
 * Just sets global opts and returns api.
 * @param opts Global options passed in.
 * @returns {{run: *}}
 */
function init(opts) {
  globalOpts = opts;

  return {
    run,
  };
}


module.exports = {
  init,
};
