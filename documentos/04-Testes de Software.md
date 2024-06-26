# Planos de Testes de Software

Apresentação dos cenários de testes utilizados na realização dos testes da aplicação, demonstrando os requisitos sendo satisfeitos.

|  **Caso de Teste**  |                                                                                              **CT-01 - Cadastro de usuários**                                                                                              |
| :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Requisito Associado |                                                                             RF-001 - A aplicação deve permitir ao usuário cadastrar uma conta.                                                                             |
|  Objetivo do Teste  |                                                                         Validar a capacidade do usuário de se registrar com sucesso na aplicação.                                                                          |
|       Passos        |                                                 1 Acessar a aplicação web <br> 2 Clicar em “Cadastro” <br> 3 Preencher os campos obrigatórios <br> 4 Clicar em "Cadastrar"                                                 |
|  Critério de Êxito  |                                                                                     - - O registro do usuário é concluído com sucesso.                                                                                     |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                                                 **CT-02 - Efetuar login**                                                                                                  |
| Requisito Associado |                                                                    RF-002 - A aplicação deve permitir ao usuário cadastrado efetuar login em sua conta.                                                                    |
|  Objetivo do Teste  |                                                                                Confirmar a funcionalidade de login do usuário na aplicação.                                                                                |
|       Passos        |                                              1 Acessar a aplicação web. <br> 2 Selecionar a opção “Login” <br> 3 Preencher os campos necessários. <br> 4 Clicar em "Entrar".                                               |
|  Critério de Êxito  |                                                                                             - O login é concluído com sucesso.                                                                                             |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                                                 **CT-03 - Efetuar logout**                                                                                                 |
| Requisito Associado |                                                                    RF-003 - A aplicação deve permitir ao usuário cadastrado fazer logout de sua conta.                                                                     |
|  Objetivo do Teste  |                                                                               Verificar a funcionalidade de logout do usuário na aplicação.                                                                                |
|       Passos        |                                                           1 Acessar a aplicação web. <br> 2 Clicar em “Login” <br> 3 Realizar o login. <br> 4 Clicar em "Sair".                                                            |
|  Critério de Êxito  |                                                                                            - O logout é concluído com sucesso.                                                                                             |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                                             **CT-04 - Gerenciamento de conta**                                                                                             |
| Requisito Associado |                                                                            RF-004 - A aplicação deve permitir ao usuário gerenciar a sua conta.                                                                            |
|  Objetivo do Teste  |                                                                             Verificar se o usuário consegue gerenciar seus dados na aplicação.                                                                             |
|       Passos        |              1 Acessar a aplicação web. <br> 2 Clicar em “Login” . <br> 2 Realizar o login. <br> 3 Acessar o "Perfil" <br> 4 Clicar em "Editar". <br> 5 Editar os campos desejados. <br> 6 Clicar em Salvar.               |
|  Critério de Êxito  |                                                                                    - O usuário consegue alterar seus dados com sucesso.                                                                                    |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                                  **CT-05 - Gerenciar Serviços - Cadastrar e visualizar**                                                                                   |
| Requisito Associado |                                                                         RF-005 - A aplicação deve permitir ao usuário gerenciar Serviços Prestados                                                                         |
|  Objetivo do Teste  |                                                                      Avaliar a capacidade do usuário de cadastrar e visualizar Serviços na aplicação                                                                       |
|       Passos        |   1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br> 3 Clicar em “Serviços” na barra de navegação <br> 4 Clicar no botão “Adicionar” <br> 5 Preencher os campos obrigatórios <br> 6 Clicar em "Salvar"   |
|  Critério de Êxito  |                                                                - A tela foi redirecionada para a exibição de Serviços cadastrados contendo o novo Serviço.                                                                 |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                                      **CT-05.1 - Gerenciamento de Serviço - Editar**                                                                                       |
| Requisito Associado |                                                                           RF-005 - A aplicação deve permitir ao usuário gerenciar seus Serviços.                                                                           |
|  Objetivo do Teste  |                                                                         Avaliar a capacidade do usuário editar serviços registrados na aplicação.                                                                          |
|       Passos        |       1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br> 3 Clicar em “serviços” na barra de navegação <br> 4 Clicar no botão “Editar” <br> 5 Editar os campos desejados <br> 6 Clicar em "Salvar"        |
|  Critério de Êxito  |                                                              - A tela foi redirecionada para a exibição de serviços cadastrados contendo o registro editado.                                                               |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                                      **CT-05.2 - Gerenciamento de Serviço - Excluir**                                                                                      |
| Requisito Associado |                                                                           RF-005 - A aplicação deve permitir ao usuário gerenciar seus Serviços.                                                                           |
|  Objetivo do Teste  |                                                                         Avaliar a capacidade do usuário excluir serviços registrados na aplicação.                                                                         |
|       Passos        |              1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br> 3 Clicar em “serviços” na barra de navegação <br> 4 Clicar no botão “Excluir” <br> 5 Confirmar a exclusão do serviço. <br>               |
|  Critério de Êxito  |                                                            - A tela foi redirecionada para a exibição de serviços cadastrados não exibindo o serviço excluído.                                                             |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                               **CT-06 - Administrar Histórico de Agendamentos - Visualizar**                                                                               |
| Requisito Associado |                                                                   RF-006 - A aplicação deve permitir ao usuário visualizar o histórico de agendamentos.                                                                    |
|  Objetivo do Teste  |                                                                    Avaliar a capacidade do usuário visualizar o histórico de agendamentos na aplicação.                                                                    |
|       Passos        |                              1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br> 3 Clicar em “Histórico” na barra de navegação <br> 4 Visualizar os registros de agendamento                              |
|  Critério de Êxito  |                                                                   - A tela foi redirecionada para a exibição dos histórico de agendamentos cadastrados.                                                                    |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                             **CT-07 - Gerenciamento de Agendamentos - Cadastrar e visualizar**                                                                             |
| Requisito Associado |                                                                          RF-007 - A aplicação deve permitir ao usuário registrar os agendamentos                                                                           |
|  Objetivo do Teste  |                                                                    Avaliar a capacidade do usuário cadastrar e visualizar os agendamentos na aplicação.                                                                    |
|       Passos        | 1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br> 3 Clicar em “Agendamentos” na barra de navegação <br> 4 Clicar no botão “Adicionar” <br> 5 Preencher os campos obrigatórios <br> 6 Clicar em "Salvar" |
|  Critério de Êxito  |                                                             \* A tela foi redirecionada para a exibição de agendamentos cadastrados contendo o novo registro.                                                              |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                                    **CT-07.1 - Gerenciamento de Agendamentos - Editar**                                                                                    |
| Requisito Associado |                                                                          RF-007 - A aplicação deve permitir ao usuário registrar os agendamentos                                                                           |
|  Objetivo do Teste  |                                                                            Avaliar a capacidade do usuário editar os agendamentos na aplicação                                                                             |
|       Passos        |     1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br> 3 Clicar em “Agendamentos” na barra de navegação <br> 4 Clicar no botão “Editar” <br> 5 Editar os campos desejados <br> 6 Clicar em "Salvar"      |
|  Critério de Êxito  |                                                                 \* A tela foi redirecionada para exibição de agendamentos cadastrados o registro editado.                                                                  |
|                     |                                                                                                                                                                                                                            |
|  **Caso de Teste**  |                                                                                   **CT-07.2 - Gerenciamento de Agendamentos - Excluir**                                                                                    |
| Requisito Associado |                                                                          RF-007 - A aplicação deve permitir ao usuário registrar os agendamentos                                                                           |
|  Objetivo do Teste  |                                                                     Verificar se o usuário consegue excluir os agendamentos registrados na aplicação.                                                                      |
|       Passos        |          1 Acessar a aplicação web <br> 2 Fazer o login na aplicação web <br> 3 Clicar em “Agendamentos” na barra de navegação <br> 4 Clicar no botão “Excluir” <br> 5 Confirmar a exclusão do agendamento. <br>           |
|  Critério de Êxito  |                                                        \* A tela foi redirecionada para a exibição de agendamentos cadastrados não exibindo o agendamento excluído.                                                        |
|                     |                                                                                                                                                                                                                            |

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

![Serviço](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/33b1f778-48f3-400c-8593-ab98ad8a586e)

**Caso de Teste 06**

#### Histórico de Agendamentos

<br>

![historico](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/d6ec94ef-c23f-490b-9e18-7a8296b66458)

**Caso de Teste 07**

#### Gerenciamento de Agendamentos

![novo agendamento](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/90fc3266-7b93-477b-a8d4-16ff044a27d3)

![editar agendamento](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/2f9a3734-5b2b-43fa-be46-6c69aa01077b)

![excluir agendamento](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/4560bf97-24b7-40ce-ba40-9f1c6dfad603)

# Avaliação por pares

| **Caso de Teste** 	| **CT-01 - Cadastro de usuários, CT-02 - Efetuar login  CT-03 - Efetuar logout e CT-04 - Gerenciamento de conta** 	|
|:---:	|:---:	|
|	Desenvolvido por 	| Anderson |
| Testado por 	| Amanda |

https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/df067469-d437-47a0-a9db-c5481ef21a03





| **Caso de Teste** | **CT-05, CT-05.1,CT-05.2- Gerenciar Serviços - Cadastrar ,visualizar e Excluir** |
| :---------------: | :---------------------------------------------------: |
| Desenvolvido por  |                       Amanda                        |
|    Testado por    |                       Marcus                        |


https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/575387a2-ca03-4af1-9b81-a2bd802a782d



| **Caso de Teste** | **CT-06 - Administrar Histórico de Agendamentos - Visualizar** |
| :---------------: | :---------------------------------------------------: |
| Desenvolvido por  |                       Patrick                       |
|    Testado por    |                       Luiz                        |



https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/210359e1-7ba7-4816-a331-6f4bb494190c



| **Caso de Teste** | **CT-07 - Gerenciamento de Agendamentos - Cadastrar e visualizar** |
| :---------------: | :---------------------------------------------------: |
| Desenvolvido por  |                       Luiz                       |
|    Testado por    |                      Patrick                         |

https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/4ae54285-774c-408a-b975-95aae619b156




| **Caso de Teste** | **CT-07.1 - Gerenciamento de Agendamentos - Editar** |
| :---------------: | :---------------------------------------------------: |
| Desenvolvido por  |                       Marcus                       |
|    Testado por    |                      Anderson                         |


https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/130176cb-5f7f-4b30-b4c4-70972b5452da




| **Caso de Teste** | **CT-07.2 - Gerenciamento de Agendamentos - Excluir** |
| :---------------: | :---------------------------------------------------: |
| Desenvolvido por  |                      Stephanie                       |
|    Testado por    |                      Amanda                         |

https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio/assets/97108151/07e4ddfe-7887-46af-9162-d517b51f2b5f

