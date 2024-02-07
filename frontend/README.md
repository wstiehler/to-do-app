```
candy-store-app

┌── .eslintrc.json
├── .gitignore
├── CHANGELOG.md
├── LICENSE.md
├── next.config.js
├── package.json
├── README.md
├── public
└── src
	├── components
	├── contexts
	├── guards
	├── hocs
	├── hooks
	├── layouts
	├── sections
	├── theme
	├── utils
	└── pages
		├── 404.js
		├── _app.js
		├── _document.js
		├── account.js
		├── companies.js
		├── sales.js
		├── index.js
		├── products.js
		└── settings.js
		└──  auth
			├── login.js
			└── register.js
```

## Como Começar

### Rodando Localmente

Para rodar o ambiente completo localmente com Docker e simular a AWS com o LocalStack, utilize os seguintes comandos:

```bash
make start-localstack
```

### Após rodar o ambiente:

Crie um bucket: 
```bash 
make bucket-create 
```

Adicione a política CORS ao bucket: 
```bash 
make bucket-add-cors-local
```

Verifique a configuração CORS:
```bash 
make bucket-get-config-cors
```
 
Prossiga para a próxima seção.

### Rodando com Docker
Para iniciar o ambiente com Docker, execute:
```bash 
make start-docker-app
```

### Rodando com npm
Para iniciar o ambiente com npm, execute:
```bash
make start-app
```

## Rodando com NGROK

- Vá na pasta config/ngrok/staging, abra o arquivo de configuração e atualize na sua maquina, depois rode o start do ngrok apontando para os serviços, você deve ter o seguinte retorno:
```bash
Session Status                online                                                                                                                                
Account                       william villani stiehler (Plan: Free)                                                                                                 
Update                        update available (version 3.5.0, Ctrl-U to update)                                                                                    
Version                       3.3.5                                                                                                                                 
Region                        United States (us)                                                                                                                    
Latency                       156ms                                                                                                                                 
Web Interface                 http://127.0.0.1:4041                                                                                                                 
Forwarding                    https://0b8b-143-137-175-255.ngrok-free.app -> http://localhost:8080                                                                  
Forwarding                    https://311f-143-137-175-255.ngrok-free.app -> http://localhost:3000                                                                  
Forwarding                    https://ac86-143-137-175-255.ngrok-free.app -> http://localhost:4572                                                                  
                                                                                                         
```
- Após isso, adicione o endereço da porta 3000 no arquivo config/docker/cors-config.json e rode o comando make bucket-add-cors-config para aplicar as configurações para o localstack

- No arquivo de .env, adicione a URL do backend (8080) e aws (4572)

- Feito isso, tudo deve funcionar de forma correta. 

# Visão Geral do Projeto

Este projeto segue uma estrutura modular para melhor organização:

- **components:** Componentes React reutilizáveis.
- **contexts:** Provedores de Contexto React.
- **guards:** Guardas de autenticação para proteção de rotas.
- **hocs:** Componentes de ordem superior (Higher-order components).
- **hooks:** Hooks personalizados do React.
- **layouts:** Layouts de página.
- **sections:** Seções específicas ou funcionalidades da aplicação.
- **theme:** Configuração de estilos e temas.
- **utils:** Funções utilitárias.

## Docker e Desenvolvimento Local

- **Desenvolvimento Local:** O projeto pode ser executado localmente usando Docker ou npm.
- **LocalStack:** Simula serviços da AWS para desenvolvimento local.
- **Docker Compose:** Configuração para o ambiente de desenvolvimento.


## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE.md).