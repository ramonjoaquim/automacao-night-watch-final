const chromedriver = require('chromedriver');

module.exports = {
  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        server_path: 'node_modules/chromedriver/lib/chromedriver/chromedriver',
        port: 9515
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
            args: ['window-size=1280,800','headless','start-maximized','incognito', 'no-sandbox', 'disable-gpu']
        }
      },
      screenshots:{
          enabled:true,
          path:'report/screenshot'
      }
    }
  }
};