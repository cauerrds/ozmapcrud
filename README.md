# Projeto de API de Gerenciamento de Usuários

#### Este é um projeto de desenvolvimento de uma API utilizando Node.js, Koa, Mocha e Chai para realizar operações de adicionar, editar, listar e remover usuários. O objetivo principal é construir uma API funcional e bem estruturada, com suporte ao banco de dados SQLite e recursos adicionais, como paginação de lista de usuários.

## Instruções para Configuração e Execução
<br>

### Para configurar e executar o projeto, siga os passos abaixo:
<br>

#### Faça o download do arquivo do projeto e descompacte-o em um diretório de fácil acesso.
<br>

#### Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em: https://nodejs.org
<br>

#### Abra um terminal ou prompt de comando e navegue até o diretório raiz do projeto.
<br>

#### Execute o seguinte comando para instalar as dependências do Node.js:

<pre><code>npm install</code></pre>

#### Após a instalação das dependências, você pode executar os testes de unidade para verificar se tudo está funcionando corretamente. Utilize o seguinte comando:
<br>

<pre><code>npm run test</code></pre>

#### Se os testes passarem, você pode iniciar o servidor da API executando o comando:
<br>

<pre><code>npm run dev</code></pre>

#### O servidor será iniciado e estará pronto para receber requisições na porta definida.

#### Após iniciar o servidor acesse a documentação na porta padrão:
<br>

<pre><a>http://localhost:3000/docs</a></pre>

<br>

## Funcionalidades da API
<br>

### A API oferece as seguintes rotas para gerenciamento de usuários:
<br>

#### POST /users: Adiciona um novo usuário. Os dados do usuário devem ser fornecidos no corpo da requisição.
<br>

#### GET /users: Retorna a lista de todos os usuários cadastrados. É possível usar os parâmetros de paginação (page e pageSize) para limitar os resultados.
<br>

#### GET /users/:id Retorna os dados de um usuário específico com base no ID fornecido como parâmetro na URL.
<br>

#### GET /users/:name Retorna os dados de um usuário específico com base no nome fornecido como parâmetro na URL.
<br>

#### PUT /users/:id Edita os dados de um usuário existente. O ID do usuário deve ser fornecido como parâmetro na URL, e os novos dados devem ser enviados no corpo da requisição.
<br>

#### PUT /users/:name Edita os dados de um usuário existente. O Nome do usuário deve ser fornecido como parâmetro na URL, e os novos dados devem ser enviados no corpo da requisição.
<br>

#### DELETE /users/:id: Remove um usuário existente. O ID do usuário deve ser fornecido como parâmetro na URL.

