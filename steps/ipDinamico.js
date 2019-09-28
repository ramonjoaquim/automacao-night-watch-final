const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

let pageElements ={
    menuDeployments: '[data-test-id="site-menu-deployments"]',
    menuSites: '[data-test-id="site-menu-subitem-sites"]',
    btnAdd: '[data-test-id="network-list-add-button"]',
    nameInput: '[data-test-id="name"]',
    ipInput: '//input[@placeholder="IP/Hostname"]',
    btnSave: '[data-test-id="save-network-button"]',
    popupAlert: '//div[@class= "pt-toast pt-intent-success pt-overlay-content"]',
    ipAdicionado : '//td[2]/div/div[2]/a',
    btnRemoveIp: '[data-test-id="network-remove"]',
    btnConfirmRemove: '[data-test-id="delete-network"]',
    closePoUp: '//button[@class="pt-button pt-icon-cross"]'
}

let timeToSleep = 10000;
let result = null;
function gerarIpRandomico(){
    //177.54.50.194
    var number1 = Math.floor(Math.random() * 100);
    var number2 = Math.floor(Math.random() * 100);
    var number3 = Math.floor(Math.random() * 100);
    var number4 = Math.floor(Math.random() * 100);
    result = number1+"."+number2+"."+number3+"."+number4;
    return result;
}

module.exports = {
    gerarIpRandomico: gerarIpRandomico
};

Given(/^acessar o menu Deployments e o submenu sites$/, () => {
    return client  
        .waitForElementVisible(pageElements.menuDeployments, timeToSleep, function (){
            this.click(pageElements.menuDeployments)
        })
        .waitForElementVisible(pageElements.menuSites, timeToSleep, function (){
            this.click(pageElements.menuSites)
        })
});

When(/^clicar no botão Add$/, () => {
    return client  
        .waitForElementVisible(pageElements.btnAdd, timeToSleep, function (){
            this.click(pageElements.btnAdd)
        })
});

When(/^inserir o nome "(.*?)"$/, (name) => {
    return client
      .waitForElementVisible(pageElements.nameInput,timeToSleep)
      .setValue(pageElements.nameInput,name);
});

When(/^gero um ip randomico$/, () => {
    return client
        .useXpath()
        .waitForElementVisible(pageElements.ipInput,timeToSleep)
        .setValue(pageElements.ipInput,gerarIpRandomico())
        .useCss();
});

When(/^clico no botão Save$/, () => {
    return client
        .waitForElementVisible(pageElements.btnSave,timeToSleep, function (){
            this.click(pageElements.btnSave)
        });
});

When(/^verifico se apareceu o popup de sucesso$/, () => {
    return client
        .useXpath()
        .waitForElementPresent(pageElements.popupAlert, timeToSleep)
        .assert.elementPresent(pageElements.popupAlert)
        .assert.containsText(pageElements.popupAlert,'Network "Teste automação" added successfully')
        .click(pageElements.closePoUp)
        .useCss()
});

Then(/^eu excluo o ip dinamico "(.*?)"$/, (ipName) => {
    let ipRemover = '//tr[contains(.,"'+ipName+'")]//button[@title="Remove Network"]';
    return client   
        .useXpath() 
        .assert.containsText(pageElements.ipAdicionado,ipName)
        .waitForElementVisible(ipRemover,timeToSleep, function (){
            this.click(ipRemover)
        })
        .useCss()
        .waitForElementVisible(pageElements.btnConfirmRemove,timeToSleep, function (){
            this.click(pageElements.btnConfirmRemove)
        })
        .useXpath()
        .waitForElementPresent(pageElements.popupAlert, timeToSleep)
        .assert.elementPresent(pageElements.popupAlert)
        .assert.containsText(pageElements.popupAlert, 'Network "'+ipName+'" successfully removed!')
        .useCss()
        
});