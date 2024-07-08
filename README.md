
# Desafio em React/PHP

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

Este projeto especificamente trata-se de um projeto desenvolvido em react para o Frontend e no Backend foi desenvolvido em PHP, a aplicação escolhida por mim foi um cadastro de pedidos, onde foram criados 5 gráficos de acordo com registros já salvos na Base de dados.

## Índice
- [Sobre](#sobre)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Sobre


API de Back-end (PHP com Laravel):
 Endpoint para realizar as consultas onde o mesmo deve ter as funções:
a. Filtrar pelos 4 tipos de campos solicitados em Dados 1.
b. Retornar os valores que serão utilizados na construção do Dashboard e
Charts no front
2. Endpoint para trazer a lista de dados conforme a pesquisa
a. Filtrar pelos 4 tipos de campos solicitados em Dados 1.
b. Retornar os valores que serão utilizados na tela de Detalhes

Página de Cadastro (Angular):
1. Usar VueJS
2. O Layout deve conter:
a. Menu superior
b. Sidebar com os Filtros
c. Tela com todos os charts renderizados, no mínimo 6 charts e de preferência
com charts diferentes
d. Tela de detalhes, construir uma lista mostrando item a item.

## Instalação
1. Realizar o Clone desse repositório e do respositório do backend

# requisitos
1. Ter instalando no minimo a versão do Node 18, você pode instalar via nvm que é um excelente gerenciador de versão do Node.
2. Utilizar o VSCode ou qualquer outra IDE para desenvolvimento.
3. Instalar o Docker, pois é necessário para rodar o serviço do backend, que sobe junto o serviço do PHP

## Uso
1. Baixar o projeto do backend no diretório /var/www/html !OBRIGATÓRIO, justamente pelo mapeamento de volumes do docker

```
git clone https://github.com/marcosgsilva/orders-back.git

```

2. Baixar as dependências do projeto:

```
composer installl
```

3. Rodar comando abaixo, esse comando irá baixar os containers do docker pull e montar todo seu ambiente PHP, além é claro de rodar as migrates junto com as seeders para criar os 2000 mil registros.
```
docker-compose up --build

```
3. Após finalizar o processo do docker, o serviço do backend irá subir na porta 8000:
 ```
   http://localhost:8000
```

4. Baixar o projeto do Frontend
 ```
git clone https://github.com/marcosgsilva/orders-front.git

```

5. Instalar o projeto: Entrar na raíz do projeto e executar o comando abaixo:

```
npm i
```
6. Subir o projeto do frontend: rodar o comando abaixo

```
npm run dev
```
Segue resultado da tela de Cadastro

Graficos: 
![Captura de tela de 2024-07-07 22-27-36](https://github.com/marcosgsilva/orders-front/assets/12539016/ed68660d-8e72-4646-910a-25704d3d98e6)

Lista:

![Captura de tela de 2024-07-07 22-28-19](https://github.com/marcosgsilva/orders-front/assets/12539016/b2a5d5da-d478-4a10-9849-cf31b779a3a7)

Detalhes:
![Captura de tela de 2024-07-07 22-28-56](https://github.com/marcosgsilva/orders-front/assets/12539016/39b4c949-ae8e-41a2-9293-995fe08828c3)



