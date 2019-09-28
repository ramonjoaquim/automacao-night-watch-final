const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
const ip = require('./ipDinamico');

var pageElements ={
    menuDeployments: '[data-test-id="site-menu-deployments"]',
    menuSites: '[data-test-id="site-menu-subitem-sites"]',
    btnAdd: '[data-test-id="network-list-add-button"]',
    nameInput: '[data-test-id="name"]',
    ipInput: '//input[@placeholder="IP/Hostname"]',
    btnSave: '[data-test-id="save-network-button"]',
    popupAlert: '//div[@class= "pt-toast pt-intent-success pt-overlay-content"]',
    closePoUp: '//button[@class="pt-button pt-icon-cross"]',
    searchInput: '//input[@placeholder="Search"]'
}

var timeToSleep = 10000;

When(/^inserir "(.*?)" sites$/, (qtdSites) => {

    for(var i = 1; i <= qtdSites; i++){
         client
            .waitForElementVisible(pageElements.btnAdd, timeToSleep, function (){
                 this.click(pageElements.btnAdd)
            })
            .waitForElementVisible(pageElements.nameInput,timeToSleep)
            .setValue(pageElements.nameInput,'site '+i)
            .useXpath()
            .waitForElementVisible(pageElements.ipInput,timeToSleep)
            .setValue(pageElements.ipInput,ip.gerarIpRandomico())
            .useCss()
            .waitForElementVisible(pageElements.btnSave,timeToSleep, function (){
                this.click(pageElements.btnSave)
            })
            .useXpath()
            .waitForElementPresent(pageElements.popupAlert, timeToSleep)
            .assert.elementPresent(pageElements.popupAlert)
            .assert.containsText(pageElements.popupAlert,'added successfully')
            .click(pageElements.closePoUp)
            .useCss()
    }
      return client;  
});

When(/^eu procuro pelos "(.*?)" sites e certifico que o site filtrado está presente e os demais não estão presente$/, (qtdSites) => {

    for(var i = 1; i <= qtdSites; i++){
        var name = 'site '+i;
    client
        .useXpath()
        .waitForElementVisible(pageElements.searchInput,timeToSleep)
        .setValue(pageElements.searchInput,name)
        .waitForElementPresent('//tr[contains(.,"'+name+'")]', timeToSleep)
        .assert.elementPresent('//tr[contains(.,"'+name+'")]')
        .assert.containsText('//tr[contains(.,"'+name+'")]',name)
        .assert.elementNotPresent('//tr[contains(.,"site'+i+1+'")]')
        .assert.elementNotPresent('//tr[contains(.,"site'+i+2+'")]')
        .clearValue(pageElements.searchInput)
        .useCss(); 

   }
     return client;  

});