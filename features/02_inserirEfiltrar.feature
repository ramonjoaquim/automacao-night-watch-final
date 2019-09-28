#testeInserirEFiltrar
@testeInserirEFiltrar
Feature: Teste adicionando sites e filtrando
    Adicionado 3 sites e filtros pelos mesmos no campos de busca e certificando que foi filtrado e os outros estão ocultos

Background: logar no sistema 
  Given acessar a pagina "https://dev-app.dnsfilter.com"
  And o titulo é "Dashboard | DNSFilter"
  When inserir o login "limasramon3@gmail.com"
  And a senha "sistema.1234"
  And clicar no botão login
  Then eu devo estar logado

@inserirSites
Scenario: inserir sites
    Given acessar o menu Deployments e o submenu sites
    When inserir "3" sites
    Then eu procuro pelos "3" sites e certifico que o site filtrado está presente e os demais não estão presente
