# Planos de Testes de Software

Testes aplicação back-end:

# BACK-END  
Testes aplicação back-end:  

Clique aqui em <a href="../src/web-api/README.md"> API - HYSTERIA </a> para iniciar a aplicação backend.<br/><br/>

Dentro da documentação, vai conter o comando: <p style="color:violet">npm test</p> Assim que a aplicação estiver rodando, usando esse comando no mesmo diretorio, porém em outro terminal, irá rodar os testes unitarios na aplicação.

![Evidencias de Testes UNitarios Back-end](./img/testes-unitarios.png)  
 
# Evidências de Testes de Software (BACKEND ROTAS)

## Testes de Agenda 

###  Listar agenda

![Listar](img/registros-backend/listagem-de-agenda.png)

###  Buscar agenda por ID

![Listar](img/registros-backend/buscar-agenda-por-id.png)

###  Criar agenda

![Listar](img/registros-backend/criar-agenda.png)

## Testes de Usuario

###  Criar Usuario

![Listar](img/registros-backend/criar-usuario.png)

###  Login Admin

![Listar](img/registros-backend/login-admin.png)

## Testes de Serviços 

###  Listar Serviços

![Listar](img/registros-backend/listagem-de-servicos.png)

###  Buscar Serviço por ID

![Listar](img/registros-backend/busca-de-servico-por-id.png)

###  Criar Serviço

![Listar](img/registros-backend/criar-servico.png)

# Evidências de Testes de Software (FRONTEND)
# FRONT-END WEB
Está seção detalha o planejamentos do processo de realização dos Testes de Software FRONT-END WEB.
|Caso de Teste | CT-01 - Funcionamento da API para os usuários.|
|:--|:--|
|**Requisitos Associados**|RF-001 - A aplicação deverá permitir o cadastro de usuários e suas informações, sendo separados em autônomos ou solicitante do serviço. <br/> RF-002 - A aplicação deverá permitir a alteração dos dados do usuário. <br/> RF-003 - A aplicação deverá permitir a exclusão dos dados do usuário. <br/> RF-004 - A aplicação deverá exibir os dados do usuário.|
|**Objetivo do teste**| Verificar e testar o cadastro dos usuários juntamente com outras funcionalidades CRUD (Create, Read, Update, Delete). |
|**Passos**|1 - Incluir dados no Banco de Dados NoSQL através da rota pré-definida. <br/>2 - Alterar dados no Banco de Dados NoSQL através da rota pré-definida.<br/>3 - Excluir dados no Banco de Dados NoSQL através da rota pré-definida. <br/> 4 - Listar dados no Banco de Dados NoSQL através da rota pré-definida.|
|**Critérios de Êxito**| Os usuários e suas informações devem ser cadastrados com sucesso e a aplicação deverá permitir a manipulação de seus dados conforme expecificado com êxito através das rotas. |

|Caso de Teste | CT-02 - Funcionamento da interface do usuário(logado) com os funcionamentos do lado do servidor. |
|:--|:--|
|**Requisitos Associados**|RF-005 - Poderá acessar a lista de autônomos verificando o serviço prestado <br/> RF-006 - Poderá acessar a opção para adicionar comentariós sobre o prestador <br/> RF-007 - Poderá acessar a opão para verificar suas informações.<br/> RF-008 - Poderá acessar a opção de editar dados, que irá permitir editar seus dados pessoais ou excluir conta.
|**Objetivo do teste**|Verificar o funcionamento da aplicação para usuários já logados e as funcionalidades que o usuário poderá realizar, utilizando o lado do cliente e do servidor. |
|**Passos**| 1 - Acessar a aplicação<br/> 2 - realizar o login com uma conta já cadastrada<br/> 3 - acessar as opções no menu<br/> 4 - Verificar prestadores e seu serviço |
|**Critérios de Êxito**| Possuir uma integração do lado do servidor e do cliente com requisições-respostas através das rotas definidas na API. O usuário conseguirá realizar todas as funcionaliades descritas com êxito desde que utilizadas corretamente, caso não bem utilizadas deverá ser exibida mesnagens de aviso para o usuário. |




## Exibição principal

###  Login

![Listar](img/registros-frontend/login.png)

###  Listagem de serviços

![Listar](img/registros-frontend/listagem-de-servico.png)

###  Listagem de historico

![Listar](img/registros-frontend/listagem-de-historico.png)

###  Listagem de agendamento

![Listar](img/registros-frontend/listagem-de-agendamentos.png)

###  Criar Agendamento

![Listar](img/registros-frontend/criar-agendamento.png)