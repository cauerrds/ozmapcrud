
# Projeto de API de Gerenciamento de Usuários

  

#### Este é um projeto de teste que avalia a habilidade do Coop em resolver problemas básicos. O objetivo do projeto é construir uma API de Gerenciamento de Usuários utilizando Node.js, Koa, SQLite e outras dependências listadas no arquivo `package.json`. A API permite realizar operações de adicionar, editar, listar e remover usuários.

  

## Configuração e Execução

<br>

  

### Siga as instruções abaixo para configurar e executar o projeto:


#### 1. Faça o download do arquivo do projeto e descompacte-o em um diretório de fácil acesso.

#### 2. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em: https://nodejs.org

#### 3. Abra um terminal ou prompt de comando e navegue até o diretório raiz do projeto.

#### 4. Execute o seguinte comando para instalar as dependências do Node.js:

<pre><code>npm install</code></pre>

  
#### 5. Após a instalação das dependências, você pode executar os testes de unidade para verificar se tudo está funcionando corretamente. Utilize o seguinte comando:

<pre><code>npm run test</code></pre>

#### Certifique-se de que os testes passaram com sucesso antes de prosseguir.

#### 6. Agora, você pode iniciar o servidor da API executando o seguinte comando:
<pre><code>npm run dev</code></pre>

#### O servidor será iniciado e estará pronto para receber requisições na porta definida.

#### Após iniciar o servidor, acesse a documentação na porta padrão: [https://nodejs.org](https://nodejs.org/)


## Funcionalidades da API


### A API oferece as seguintes rotas para gerenciamento de usuários:

<br>

  

####  

 - POST /users: Adiciona um novo usuário. Os dados do usuário devem ser fornecidos no corpo da requisição.
  
 - GET /users: Retorna a lista de todos os usuários cadastrados. É possível usar os parâmetros de paginação (page e pageSize) para limitar os resultados.
 
- GET /users/:id Retorna os dados de um usuário específico com base no ID fornecido como parâmetro na URL.

- GET /users/:name Retorna os dados de um usuário específico com base no nome fornecido como parâmetro na URL.
  
- PUT /users/:id Edita os dados de um usuário existente. O ID do usuário deve ser fornecido como parâmetro na URL, e os novos dados devem ser enviados no corpo da requisição.

- PUT /users/:name Edita os dados de um usuário existente. O Nome do usuário deve ser fornecido como parâmetro na URL, e os novos dados devem ser enviados no corpo da requisição.

- DELETE /users/:id: Remove um usuário existente. O ID do usuário deve ser fornecido como parâmetro na URL.

- DOCS /docs Acessar documentação via swagger



