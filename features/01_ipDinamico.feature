#testeIpDinamico
@ipDinamico
Feature: Teste em site com ip dinamico
    Adicionar o novo site utilizando de um ip randomico

Background: logar no sistema 
  Given acessar a pagina "https://dev-app.dnsfilter.com"
  And o titulo é "Dashboard | DNSFilter"
  When inserir o login "limasramon3@gmail.com"
  And a senha "sistema.1234"
  And clicar no botão login
  Then eu devo estar logado

@testeIpDinamico
Scenario: ip dinamico
    Given acessar o menu Deployments e o submenu sites
    And clicar no botão Add
    When inserir o nome "Teste automação"
    When gero um ip randomico
    And clico no botão Save
    And verifico se apareceu o popup de sucesso
    Then eu excluo o ip dinamico "Teste automação" 