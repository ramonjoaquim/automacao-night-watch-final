const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

var pageElements ={
    menuDeployments: '[data-test-id="site-menu-deployments"]',
    menuSites: '[data-test-id="site-menu-subitem-sites"]',
    btnAdd: '[data-test-id="network-list-add-button"]',
    nameInput: '[data-test-id="name"]',
    ipInput: '//input[@placeholder="IP/Hostname"]',
    btnSave: '[data-test-id="save-network-button"]',
    popupAlert: '//div[@class= "pt-toast pt-intent-success pt-overlay-content"]',
    ipAdicionado : '//td[2]/div/div[2]/a',
    closePoUp: '//button[@class="pt-button pt-icon-cross"]'
}

var timeToSleep = 10000;

When(/^insiro os sites$/, () => {
    for(var i = 0; i<3; i++){
        return client
            .waitForElementVisible(pageElements.nameInput,timeToSleep)
            .setValue(pageElements.nameInput,'site '+i)
            .useXpath()
            .waitForElementVisible(pageElements.ipInput,timeToSleep)
            .setValue(pageElements.ipInput,gerarIpRandomico())
            .useCss()
            .waitForElementVisible(pageElements.btnSave,timeToSleep, function (){
                this.click(pageElements.btnSave)
            });
    }
        
});