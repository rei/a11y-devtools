# a11y-devtools

## Description
Run accessibility tests in Chrome at development time.

This will enable running accessibility tests via Tenon on:
- static sites (via url)
- dynamic sites (via browser navigation)

## How It Works
- Opens a headless version of Chrome.
- Executes your test commands to drive Chrome via DevTools API.
- Sends HTML source to Tenon.
- Creates Tenon report locally and on tenon.io.

## Requirements
This requires you to have set up an account and API key with tenon.io.

## Installation
- Clone this repo and run an `npm install`;

## Usage
- Sign into tenon.io and
  - Copy your API key from tenon.io.
  - Set up a new Project in your tenon account. Make note of the `projectID`.
- Copy the example file and modify per your info above.
- Add tests.
- Run via `babel-node <your_test_file>.js`; (babel-node if you're on node v6.x)
- Your report will be written locally as well as being displayed in your 
  Tenon project via the Tenon.io site.

## Notes
- Under the hood, this uses a package called `puppeteer` for driving Chrome 
  via the Chrome DevTools API. Consult the [puppeteer API docs](https://github.com/GoogleChrome/puppeteer/blob/HEAD/docs/api.md) 
  for specific commands to drive browser.
- Turn the `headless` option off while writing Chrome navigation commands so you can
  see the browser running your commands.
- Since this tool is rendering the entire page DOM, it is sensitive to
  timing. See the [frame.waitForX commands](https://github.com/GoogleChrome/puppeteer/blob/HEAD/docs/api.md#framewaitforselectororfunctionortimeout-options).
  
## Todo
- Currently, due to CentOS not supporting Chrome, this tool can only be run
  locally (for now).
- Create Docker container for this tool.
 