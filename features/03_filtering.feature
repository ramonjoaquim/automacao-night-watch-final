#testeAdicionarPolicys
@testeAdicionarPolicys
Feature: Teste adicionando sites e filtrando
    Adicionar um novo policy e  marcar a opção CIPA Compliance

Background: logar no sistema 
  Given acessar a pagina "https://dev-app.dnsfilter.com"
  And o titulo é "Dashboard | DNSFilter"
  When inserir o login "limasramon3@gmail.com"
  And a senha "sistema.1234"
  And clicar no botão login
  Then eu devo estar logado

@AdicionarPolicy
Scenario: inserir sites
    Given acessar o menu Policies e o submenu Filtering
    When eu adiciono um novo policy "teste"
    And ativo a opção CIPA Compliance em Advanced Extra Settings
    And acesso a aba categorias
    Then certifico que as categorias certas estão selecionadas
    And acesso a aba safe search
    Then certifico que as opções certas estão selecionadas
