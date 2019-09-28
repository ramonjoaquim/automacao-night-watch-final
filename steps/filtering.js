const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

let pageElements ={
    menuPolicy: '[data-test-id="site-menu-policies"]',
    submenuFiltering: '[data-test-id="site-menu-subitem-filtering"]',
    bntAddpolicy: '[data-test-id="add-policy-button"]',
    policyInput: '[data-test-id="policy-name"]',
    bntSavePolicy: '[data-test-id="policy-save-button"]',
    popupAlert: '//div[@class= "pt-toast pt-intent-success pt-overlay-content"]',
    closePoUp: '//button[@class="pt-button pt-icon-cross"]',
    submenuAdvanced: '//li/a[contains(.,"Advanced")]',
    submenuExtraSettings: '//li/a[contains(.,"Extra Settings")]',
    submenuCategories: "//li/a[contains(.,'Categories')]",
    switchCipa:"//input[@type='checkbox']/..//div[contains(.,'CIPA Compliance')]",
    btnAgree: "//button[contains(.,'I Agree')]",
    textPopUp: "//h5[contains(.,'CIPA Compliance')]/../..//div/div",
    submenuSafeSearch:"//li/a[contains(.,'SafeSearch')]",
    blockSearchEngine : '[data-test-id="search-engines-on"]',
    enforceGoogle: '[data-test-id="google-safe-search-on"]',
    enforceBing: '[data-test-id="bing-safe-search-on"]',
    enforceDuckGo: '[data-test-id="duckduckgo-safe-search-on"]',
    enforceYandex: '[data-test-id="yandex-safe-search-on"]',
    enforceYoutube: '[data-test-id="youtube-restricted-level-strict"]',

}

let timeToSleep = 10000;

When(/^acessar o menu Policies e o submenu Filtering$/, () => {
    return client  
        .waitForElementVisible(pageElements.menuPolicy, timeToSleep, function (){
            this.click(pageElements.menuPolicy)
        })
        .waitForElementVisible(pageElements.submenuFiltering, timeToSleep, function (){
            this.click(pageElements.submenuFiltering)
        })
});

When(/^eu adiciono um novo policy "(.*?)"$/, (name) => {
    return client
        .waitForElementVisible(pageElements.bntAddpolicy, timeToSleep, function (){
            this.click(pageElements.bntAddpolicy)
        })
        .waitForElementVisible(pageElements.policyInput,timeToSleep)
        .setValue(pageElements.policyInput,name)
        .waitForElementVisible(pageElements.bntSavePolicy, timeToSleep, function (){
            this.click(pageElements.bntSavePolicy)
        })
        .useXpath()
        .waitForElementPresent(pageElements.popupAlert, timeToSleep)
        .assert.elementPresent(pageElements.popupAlert)
        .assert.containsText(pageElements.popupAlert, 'policy saved!')
        .click(pageElements.closePoUp)
        .useCss()
});

When(/^ativo a opção CIPA Compliance em Advanced Extra Settings$/, () => {
    return client
      .useXpath()
      .waitForElementVisible(pageElements.submenuAdvanced, timeToSleep, function (){
        this.click(pageElements.submenuAdvanced)
      })
      .waitForElementVisible(pageElements.submenuExtraSettings, timeToSleep, function (){
        this.click(pageElements.submenuExtraSettings)
      })
      .waitForElementVisible(pageElements.switchCipa, timeToSleep, function (){
        this.click(pageElements.switchCipa)
      })
      .waitForElementVisible(pageElements.textPopUp, timeToSleep)
      .assert.elementPresent(pageElements.textPopUp)
      .assert.containsText(pageElements.textPopUp,'This will enable the minimum filtering policy options for CIPA compliance')
      .waitForElementVisible(pageElements.btnAgree, timeToSleep, function (){
        this.click(pageElements.btnAgree)
      })
     .pause(3000)
      
});

When(/^acesso a aba categorias$/, () => {
    return client
        .execute('scrollTo(0,0)')
        .useXpath()
        .waitForElementVisible(pageElements.submenuCategories, timeToSleep, function (){
                this.click(pageElements.submenuCategories)
        })
        .useCss()
});

Then(/^certifico que as categorias certas estão selecionadas$/, () => {
    var categorias = ["Adult Content", "Alcohol & Tobacco", "Drugs", "Gambling", "Hacking & Cracking", "P2P & Illegal", "Search Engines & Portals", "Weapons"];
      
    for(var i = 0; i < categorias.length; i++){
        client
            .useXpath()
            .waitForElementVisible('//span[@class="category-ban-icon"]/../span/div[text()="'+categorias[i]+'"]',timeToSleep)
            .assert.elementPresent('//span[@class="category-ban-icon"]/../span/div[text()="'+categorias[i]+'"]')
            .useCss()
    }
    return client;       
});

When(/^acesso a aba safe search$/, () => {
    return client
        .execute('scrollTo(0,0)')
        .useXpath()
        .waitForElementVisible(pageElements.submenuSafeSearch, timeToSleep, function (){
                this.click(pageElements.submenuSafeSearch)
        })
        .useCss()
        .pause(2000)
});

Then(/^certifico que as opções certas estão selecionadas$/, () => {
    return client
        .assert.elementPresent(pageElements.blockSearchEngine)
        .assert.elementPresent(pageElements.enforceGoogle)
        .assert.elementPresent(pageElements.enforceBing)
        .assert.elementPresent(pageElements.enforceDuckGo)
        .assert.elementPresent(pageElements.enforceYandex)
        .assert.elementPresent(pageElements.enforceYoutube)
           
});

