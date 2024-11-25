# OZN SDK

OZN SDK é uma biblioteca desenvolvida em TypeScript para fornecer uma interface simples para integrações diversas.

## Descrição

Este SDK é projetado para ser utilizado como uma base para a integração com outros sistemas. Ele é construído com TypeScript para garantir maior segurança de tipos e fácil manutenção. A biblioteca inclui ferramentas para facilitar o desenvolvimento de testes com Jest.

## Instalação

Para instalar o SDK, você pode usar o npm:

```bash
npm install ozn_sdk
```

Ou, caso esteja desenvolvendo o SDK localmente, basta rodar o comando para instalar as dependências:

```bash
npm install
```

## Construção do Projeto

Este projeto utiliza o **TypeScript**. Antes de publicar ou usar, é necessário compilar o código TypeScript para JavaScript.

### Para construir o projeto localmente:

```bash
npm run build
```

Isso irá gerar os arquivos compilados na pasta `./dist`.

## Testes

Este SDK utiliza **Jest** para testes unitários. Para rodar os testes, execute:

```bash
npm run test
```

## Scripts

O arquivo `package.json` contém os seguintes scripts:

- **build**: Compila o código TypeScript para JavaScript.
- **test**: Executa os testes unitários usando Jest.
- **prepublishOnly**: Executa o comando `npm run build` antes de publicar o pacote no npm.

## Estrutura de Diretórios

A estrutura do projeto é organizada da seguinte forma:

```
/ozn_sdk
  ├── dist/          # Arquivos compilados
  ├── src/           # Código-fonte TypeScript
  ├── tests/         # Testes Jest
  ├── package.json   # Configurações do projeto e dependências
  ├── tsconfig.json  # Configurações do TypeScript
  └── README.md      # Documentação do projeto
```

## Licença

Este projeto está licenciado sob a licença **ISC**.

## Contribuição

Se você deseja contribuir para este projeto, por favor, siga o processo de **fork** e envie um **pull request**.

## Repositório

O código-fonte do SDK está disponível no GitHub:

[https://github.com/Nestor-Brasileiro/ozn_sdk.git](https://github.com/Nestor-Brasileiro/ozn_sdk.git)

## Autor

Nestor Brasileiro

---

Esse README descreve o básico sobre o seu projeto, incluindo instruções de instalação, construção, testes e contribuições. Você pode adaptar conforme necessário, adicionando mais detalhes específicos sobre como a biblioteca funciona ou exemplos de uso.