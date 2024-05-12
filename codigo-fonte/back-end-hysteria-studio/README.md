<h1>API Hysteria Studio!</h1>

Antes de seguir os passos para rodar o projeto local, certifique-se que tenha instalado <strong>NodeJS</strong> e <strong>NPM</strong>

- [Instalar NPM e NodeJS para Windows](https://nodejs.org/en/)

Para instalar no linux rodar esses comandos no terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

```bash
nvm install 18.18.0
```

<h2> Como instalar as dependências do projeto; </h2>

## Rodar localmente

No terminal na sua maquina, clone o repositório:

```bash
git clone https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t2-hysteria-studio.git
```

Vá até o diretório do projeto:

```bash
cd codigo-fonte/back-end-hysteria-studio
```

Instale as dependências:

```bash
npm install
```

Configure o banco MYSQL:

Em <a href="./src/config_db/database.js">Pasta para configurar o banco MYSQL</a> tem a pasta com algumas informações para incluir. Inclua as informações que estiver entre '*****' para rodar o banco MYSQL localmente.

Inicie o servidor local:

```bash
npm start
```

Inicie o servidor para desenvolvimento do projeto:

```bash
npm run dev
```

Depois de subir o servidor use esse comando para rodar a camada de testes unitarios:

```bash
npm test
```

<h2>Como executar o projeto;</h2>

Depois de ativar o servidor, acesse: <a><strong>http://localhost:3000</strong></a>

<h2>Rotas presentes;</h2> 
  
<strong>Verbos HTTP REST:</strong> GET, POST, DELETE E PUT.
  
 <h4>Para Usuários:</h4>
  
<strong>Rota para buscar todos os perfils autonomos:</strong> GET <a>http://localhost:3000/usuarios</a>

<h1>DEPLOY DA APLICAÇÃO!</h1>

[Back-end Hysteria Studio](https://hysteria-studio-backend.onrender.com/)