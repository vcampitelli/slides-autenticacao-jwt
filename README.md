# O que você precisa saber sobre autenticação com JWT

Para clonar o repositório:

```shell
git clone --recursive git@github.com:vcampitelli/slides-autenticacao-jwt.git
```

## Slides

Você pode acessar os slides através do site [viniciuscampitelli.com/slides-autenticacao-jwt](https://viniciuscampitelli.com/slides-autenticacao-jwt) ou localmente clonando o repositório com o comando acima e abrindo o arquivo [`docs/index.html`](./docs/index.html) em seu navegador.

## Scripts

A pasta [`scripts/app`](./scripts/app) possui alguns códigos de exemplo para lidar com JWT em Node através da biblioteca [`jose`](https://www.npmjs.com/package/jose).

> Atenção: para facilitar a execução dos códigos, a pasta [`scripts/app/data`](./scripts/app/data) e o arquivo [`.env.local`](./scripts/app/.env.local) já possuem as chaves de criptografia, o que **não deve** acontecer em uma aplicação real, não podendo estar no seu versionamento de código (através do [`.gitignore`](https://git-scm.com/docs/gitignore)).

### Instalação

Para executar os códigos em um container Docker, rode o utilitário `scripts/docker`:

```shell
cd scripts
./docker
```

Se você não possuir Docker e/ou se quiser executar os códigos diretamente em sua própria máquina, certifique-se que você tenha o [Node](https://nodejs.org/) instalado:

```shell
cd scripts/app
npm install
```

### Execução

<a href="https://asciinema.org/a/wqC6YdxEkj7P8ixQXxqBt9SDx"><img src="https://asciinema.org/a/wqC6YdxEkj7P8ixQXxqBt9SDx.png" width="836"/></a>

Dentro do container Docker (ou na pasta `scripts/app`), os arquivos estão numerados na ordem correta para execução:

```
scripts/app
├── 01-jws-hmac-builder.js
├── 01-jws-hmac-verifier.js
├── 02-jws-rsa-builder.js
├── 02-jws-rsa-verifier-jwks.js
├── 02-jws-rsa-verifier-public.js
├── 03-jwe-builder.js
├── 03-jwe-verifier.js
```

Para rodá-los, basta executar `node [nome-do-arquivo]`:

```shell
node 01-jws-hmac-builder.js
```
