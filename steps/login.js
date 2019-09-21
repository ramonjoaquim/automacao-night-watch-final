const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

var pageElements ={
    email:'[data-test-id="email"]',
    password: '[data-test-id="password"]',
    btnLogin: '[data-test-id="login-button"]',
    menuGeneral: '[data-test-id="button-menu-general"]',
    geoAct: '//h4[contains(.,"Geo Activity")]',
    security: '//button[contains(.,"Security")]'
}


Given(/^acessar a pagina "(.*?)"$/, (url) => {
  return client.url(url);
});

Given(/^o titulo é "(.*?)"$/, (title) => {
  return client.assert.title(title);
});

When(/^inserir o login "(.*?)"$/, (user) => {
  return client
    .waitForElementVisible(pageElements.email,15000)
    .setValue(pageElements.email,user);
});

When(/^a senha "(.*?)"$/, (password) => {
  return client
    .waitForElementVisible(pageElements.password,15000)
    .setValue(pageElements.password,password);
});

When(/^clicar no botão login$/, () => {
  return client
    .waitForElementVisible(pageElements.btnLogin,20000)
    .click(pageElements.btnLogin);
});

Then(/^eu devo estar logado$/, () => {
  return client
    .waitForElementVisible(pageElements.menuGeneral,15000)
    .assert.elementPresent(pageElements.menuGeneral)
    .element('css selector','[class="pushContentText"]', function (visivel){
      if (visivel.status != -1){
        this.waitForElementVisible('[id="pushActionRefuse"]', function (){
          this.click('[id="pushActionRefuse"]');
        })
      }else{
        console.log('ignorar erro acima my friend');
      }
    })
    .useXpath()
    .waitForElementVisible(pageElements.security,15000)
    .assert.elementPresent(pageElements.security)

    .waitForElementVisible(pageElements.geoAct,15000)
    .assert.containsText(pageElements.geoAct,'Geo Activity')
    .useCss();  
});