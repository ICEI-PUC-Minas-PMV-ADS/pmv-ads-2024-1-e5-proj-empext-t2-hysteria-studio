# Planos de Testes de Software

Apresentação dos cenários de testes utilizados na realização dos testes da aplicação, demonstrando os requisitos sendo satisfeitos.


| **Caso de Teste** 	| **CT-01 - Cadastro de usuários** 	|
|:---:	|:---:	|
|	Requisito Associado 	|  RF-001 - A aplicação deve permitir ao usuário cadastrar uma conta. |
| Objetivo do Teste 	| Validar a capacidade do usuário de se registrar com sucesso na aplicação.  |
| Passos 	|  1 Acessar a aplicação web <br> 2 Clicar em “Cadastro” <br> 3 Preencher os campos obrigatórios <br> 4 Clicar em "Cadastrar" |
|Critério de Êxito | - - O registro do usuário é concluído com sucesso. |
|  	|  	|
| **Caso de Teste** 	| **CT-02 - Efetuar login** 	|
|	Requisito Associado 	|  RF-002 - A aplicação deve permitir ao usuário cadastrado efetuar login em sua conta.  |
| Objetivo do Teste 	|  Confirmar a funcionalidade de login do usuário na aplicação. |
| Passos 	| 1 Acessar a aplicação web. <br> 2 Selecionar a opção “Login” <br> 3 Preencher os campos necessários. <br> 4 Clicar em "Entrar". |
|Critério de Êxito | - O login é concluído com sucesso. |
|  	|  	|
| **Caso de Teste** 	| **CT-03 - Efetuar logout** 	|
|	Requisito Associado 	| RF-003 - A aplicação deve permitir ao usuário cadastrado fazer logout de sua conta. |
| Objetivo do Teste 	| Verificar a funcionalidade de logout do usuário na aplicação. |
| Passos 	| 1 Acessar a aplicação web. <br> 2 Clicar em “Login”  <br> 3 Realizar o login. <br> 4 Clicar em "Sair".|
|Critério de Êxito | - O logout é concluído com sucesso. |
|  	|  	|
| **Caso de Teste** 	| **CT-04 - Gerenciamento de conta** 	|
|	Requisito Associado 	| RF-004 - A aplicação deve permitir ao usuário gerenciar a sua conta. |
| Objetivo do Teste 	| Verificar se o usuário consegue gerenciar seus dados na aplicação.|
| Passos 	| 1 Acessar a aplicação web. <br> 2 Clicar em “Login” . <br> 2 Realizar o login. <br> 3 Acessar o "Perfil"  <br> 4 Clicar em "Editar". <br> 5 Editar os campos desejados. <br> 6 Clicar em Salvar. |
|Critério de Êxito | - O usuário consegue alterar seus dados com sucesso.|
|  	|  	|
| **Caso de Teste** 	| **CT-05 - Gerenciar Serviços - Cadastrar e visualizar**	|
|	Requisito Associado 	| RF-005 - A aplicação deve permitir ao usuário gerenciar Serviços Prestados |
| Objetivo do Teste 	|  Avaliar a capacidade do usuário de cadastrar e visualizar Serviços na aplicação|
| Passos 	| 1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br>  3 Clicar em “Serviços” na barra de navegação <br> 4 Clicar no botão “Adicionar” <br> 5 Preencher os campos obrigatórios <br> 6 Clicar em "Salvar" |
|Critério de Êxito | - A tela foi redirecionada para a exibição de Serviços cadastrados contendo o novo Serviço. |
|  	|  	|
| **Caso de Teste** 	| **CT-05.1 - Gerenciamento de Serviço - Editar**	|
|	Requisito Associado 	| RF-005 - A aplicação deve permitir ao usuário gerenciar seus Serviços. |
| Objetivo do Teste 	| Avaliar a capacidade do usuário editar serviços registrados na aplicação. |
| Passos 	| 1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br>  3 Clicar em “serviços” na barra de navegação <br> 4 Clicar no botão “Editar” <br> 5 Editar os campos desejados <br> 6 Clicar em "Salvar" |
|Critério de Êxito | - A tela foi redirecionada para a exibição de serviços cadastrados contendo o registro editado. |
|  	|  	|
| **Caso de Teste** 	| **CT-05.2 - Gerenciamento de Serviço - Excluir**	|
|	Requisito Associado 	| RF-005 - A aplicação deve permitir ao usuário gerenciar seus Serviços. |
| Objetivo do Teste 	| Avaliar a capacidade do usuário excluir serviços registrados na aplicação. |
| Passos 	| 1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br>  3 Clicar em “serviços” na barra de navegação <br> 4 Clicar no botão “Excluir” <br> 5 Confirmar a exclusão do serviço. <br> |
|Critério de Êxito | - A tela foi redirecionada para a exibição de serviços cadastrados não exibindo o serviço excluído. |
|  	|  	|
| **Caso de Teste** 	| **CT-06 - Administrar Histórico de Agendamentos - Visualizar**	|
|	Requisito Associado 	| RF-006 - A aplicação deve permitir ao usuário visualizar o histórico de agendamentos. |
| Objetivo do Teste 	| Avaliar a capacidade do usuário visualizar o histórico de agendamentos na aplicação. |
| Passos 	| 1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br>  3 Clicar em “Histórico” na barra de navegação <br> 4 Visualizar os registros de agendamento |
|Critério de Êxito | - A tela foi redirecionada para a exibição dos histórico de agendamentos cadastrados. |
|  	|  	|
| **Caso de Teste** 	| **CT-07 - Gerenciamento de Agendamentos - Cadastrar e visualizar**	|
|	Requisito Associado 	| RF-007 - A aplicação deve permitir ao usuário registrar os agendamentos |
| Objetivo do Teste 	| Avaliar a capacidade do usuário cadastrar e visualizar os agendamentos na aplicação. |
| Passos 	| 1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br>  3 Clicar em “Agendamentos” na barra de navegação <br> 4 Clicar no botão “Adicionar” <br> 5 Preencher os campos obrigatórios <br> 6 Clicar em "Salvar" |
|Critério de Êxito | * A tela foi redirecionada para a exibição de agendamentos cadastrados contendo o novo registro. |
|  	|  	|
| **Caso de Teste** 	| **CT-07.1 - Gerenciamento de Agendamentos - Editar**	|
|	Requisito Associado 	| RF-007 - A aplicação deve permitir ao usuário registrar os agendamentos |
| Objetivo do Teste 	| Avaliar a capacidade do usuário editar os agendamentos na aplicação |
| Passos 	| 1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br>  3 Clicar em “Agendamentos” na barra de navegação <br> 4 Clicar no botão “Editar” <br> 5 Editar os campos desejados <br> 6 Clicar em "Salvar" |
|Critério de Êxito | * A tela foi redirecionada para exibição de agendamentos cadastrados o registro editado. |
|  	|  	|
| **Caso de Teste** 	| **CT-07.2 - Gerenciamento de Agendamentos - Excluir**	|
|	Requisito Associado 	| RF-007 - A aplicação deve permitir ao usuário registrar os agendamentos |
| Objetivo do Teste 	| Verificar se o usuário consegue excluir os agendamentos registrados na aplicação. |
| Passos 	| 1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br>  3 Clicar em “Agendamentos” na barra de navegação <br> 4 Clicar no botão “Excluir” <br> 5 Confirmar a exclusão do agendamento. <br> |
|Critério de Êxito | * A tela foi redirecionada para a exibição de agendamentos cadastrados não exibindo o agendamento excluído. |
|  	|  	|

# Evidências de Testes de Software

**Caso de Teste 01**
#### Criar Usuario
<br>

https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/659158f5-0092-4e01-9f0e-f936998c8cb5


<br>


**Caso de Teste 02**
#### Login Usuario
<br>

https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/d9e8f3c3-f3f9-4d22-b90c-e90fbda23e6d

<br>

**Caso de Teste 03** e **Caso de Teste 04**
#### Efetuar logout e Gerenciamento de conta
<br>

https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/b10af102-a3a8-44fc-9d20-0a2c82251e0b

<br>

**Caso de Teste 05**
#### Gerenciamento de Serviço
<br>

**Caso de Teste 06**
#### Histórico de Agendamentos
<br>

**Caso de Teste 07**
#### Gerenciamento de Agendamentos
