# Planos de Testes de Software

Apresentação dos cenários de testes utilizados na realização dos testes da aplicação, demonstrando os requisitos sendo satisfeitos.

**Ferramenta utilizada no teste**: Microsoft Clipchamp para gravação da tela de teste.

| **Caso de Teste** 	| **CT-01 - Cadastro de usuários** 	|
|:---:	|:---:	|
|	Requisito Associado 	|  RF-001 - A aplicação deve permitir ao usuário cadastrar uma conta. |
| Objetivo do Teste 	| Validar a capacidade do usuário de se registrar com sucesso na aplicação.  |
| Passos 	|  - Acessar a aplicação web <br> - Clicar em “Cadastro” <br> - Preencher os campos obrigatórios <br> - Clicar em "Cadastrar" |
|Critério de Êxito | - - O registro do usuário é concluído com sucesso. |
|  	|  	|
| **Caso de Teste** 	| **CT-02 - Efetuar login** 	|
|	Requisito Associado 	|  RF-002 - A aplicação deve permitir ao usuário cadastrado efetuar login em sua conta.  |
| Objetivo do Teste 	|  Confirmar a funcionalidade de login do usuário na aplicação. |
| Passos 	| - Acessar a aplicação web. <br> - Selecionar a opção “Login” <br> - Preencher os campos necessários. <br> - Clicar em "Entrar". |
|Critério de Êxito | - O login é concluído com sucesso. |
|  	|  	|
| **Caso de Teste** 	| **CT-03 - Efetuar logout** 	|
|	Requisito Associado 	| RF-003 - A aplicação deve permitir ao usuário cadastrado fazer logout de sua conta. |
| Objetivo do Teste 	| Verificar a funcionalidade de logout do usuário na aplicação. |
| Passos 	| - Acessar a aplicação web. <br> - Clicar em “Login”  <br> - Realizar o login. <br> - Clicar em "Sair".|
|Critério de Êxito | - O logout é concluído com sucesso. |
|  	|  	|
| **Caso de Teste** 	| **CT-04 - Gerenciamento de conta** 	|
|	Requisito Associado 	| RF-004 - A aplicação deve permitir ao usuário gerenciar a sua conta. |
| Objetivo do Teste 	| VVerificar se o usuário consegue gerenciar seus dados na aplicação.|
| Passos 	| - Acessar a aplicação web. <br> - Clicar em “Login” . <br> - Realizar o login. <br> - Acessar o "Perfil"  <br> - Clicar em "Editar". <br> - Editar os campos desejados. <br> - Clicar em Salvar. |
|Critério de Êxito | - O usuário consegue alterar seus dados com sucesso.|
|  	|  	|
| **Caso de Teste** 	| **CT-06 - Gerenciar Serviços - Cadastrar e visualizar**	|
|	Requisito Associado 	| RF-006 - A aplicação deve permitir ao usuário gerenciar Serviços Prestados |
| Objetivo do Teste 	|  Avaliar a capacidade do usuário de cadastrar e visualizar Serviços na aplicação|
| Passos 	| - Acessar a aplicação web <br> - Fazer o login na aplicação web <br>  - Clicar em “Serviços” na barra de navegação <br> - Clicar no botão “Adicionar” <br> - Preencher os campos obrigatórios <br> - Clicar em "Salvar" |
|Critério de Êxito | - A tela foi redirecionada para a exibição de Serviços cadastrados contendo o novo Serviço. |
|  	|  	|
| **Caso de Teste** 	| **CT-06.1 - Gerenciamento de Serviço - Editar**	|
|	Requisito Associado 	| RF-006 - A aplicação deve permitir ao usuário gerenciar seus Serviços. |
| Objetivo do Teste 	| Avaliar a capacidade do usuário editar serviços registrados na aplicação. |
| Passos 	| - Acessar a aplicação web <br> - Fazer o login na aplicação web <br>  - Clicar em “serviços” na barra de navegação <br> - Clicar no botão “Editar” <br> - Editar os campos desejados <br> - Clicar em "Salvar" |
|Critério de Êxito | - A tela foi redirecionada para a exibição de serviços cadastrados contendo o registro editado. |
|  	|  	|
| **Caso de Teste** 	| **CT-06.2 - Gerenciamento de Serviço - Excluir**	|
|	Requisito Associado 	| RF-006 - A aplicação deve permitir ao usuário gerenciar seus Serviços. |
| Objetivo do Teste 	| Avaliar a capacidade do usuário excluir serviços registrados na aplicação. |
| Passos 	| - Acessar a aplicação web <br> - Fazer o login na aplicação web <br>  - Clicar em “serviços” na barra de navegação <br> - Clicar no botão “Excluir” <br> - Confirmar a exclusão do serviço. <br> |
|Critério de Êxito | - A tela foi redirecionada para a exibição de serviços cadastrados não exibindo o serviço excluído. |
|  	|  	|
| **Caso de Teste** 	| **CT-07 - Administrar Histórico de Agendamentos - Visualizar**	|
|	Requisito Associado 	| RF-007 - A aplicação deve permitir ao usuário visualizar o histórico de agendamentos. |
| Objetivo do Teste 	| Avaliar a capacidade do usuário visualizar o histórico de agendamentos na aplicação. |
| Passos 	| - Acessar a aplicação web <br> - Fazer o login na aplicação web <br>  - Clicar em “Histórico” na barra de navegação <br> - Visualizar os registros de agendamento |
|Critério de Êxito | - A tela foi redirecionada para a exibição dos histórico de agendamentos cadastrados. |
|  	|  	|

| **Caso de Teste** 	| **CT-08 - Gerenciamento de Agendamentos - Cadastrar e visualizar**	|
|	Requisito Associado 	| RF-008 - A aplicação deve permitir ao usuário registrar os agendamentos |
| Objetivo do Teste 	| Avaliar a capacidade do usuário cadastrar e visualizar os agendamentos na aplicação. |
| Passos 	| - Acessar a aplicação web <br> - Fazer o login na aplicação web <br>  - Clicar em “Agendamentos” na barra de navegação <br> - Clicar no botão “Adicionar” <br> - Preencher os campos obrigatórios <br> - Clicar em "Salvar" |
|Critério de Êxito | - A tela foi redirecionada para a exibição de agendamentos cadastrados contendo o novo registro. |
|  	|  	|
| **Caso de Teste** 	| **CT-08.1 - Gerenciamento de Agendamentos - Editar**	|
|	Requisito Associado 	| RF-008 - A aplicação deve permitir ao usuário registrar os agendamentos |
| Objetivo do Teste 	| Avaliar a capacidade do usuário editar os agendamentos na aplicação |
| Passos 	| - Acessar a aplicação web <br> - Fazer o login na aplicação web <br>  - Clicar em “Agendamentos” na barra de navegação <br> - Clicar no botão “Editar” <br> - Editar os campos desejados <br> - Clicar em "Salvar" |
|Critério de Êxito | - A tela foi redirecionada para exibição de agendamentos cadastrados o registro editado. |
|  	|  	|
| **Caso de Teste** 	| **CT-08.2 - Gerenciamento de Agendamentos - Excluir**	|
|	Requisito Associado 	| RF-008 - A aplicação deve permitir ao usuário registrar os agendamentos |
| Objetivo do Teste 	| Verificar se o usuário consegue excluir os agendamentos registrados na aplicação. |
| Passos 	| - Acessar a aplicação web <br> - Fazer o login na aplicação web <br>  - Clicar em “Agendamentos” na barra de navegação <br> - Clicar no botão “Excluir” <br> - Confirmar a exclusão do agendamento. <br> |
|Critério de Êxito | - A tela foi redirecionada para a exibição de agendamentos cadastrados não exibindo o agendamento excluído. |
