Backend:
- Adicionar instrumentação para acompanhamento de métricas.
- Adicionar algum serviço de APM para acompanhamento de erros e exceções.
- Adicionar testes unitários e de integrações.
- Adicionar validações de entradas.
- Adicionar um DTO para o output.
- Adicionar uma lógica de adapters no banco de dados para testar em um CI os testes.

FrontEnd
- Criar uma verificação se a pessoa realmente deseja excluir o ToDo. 
- Criar uma aba para se registrar
- Adicionar redux para os métodos CRUD.
- Adicionar um serviço de APM para acompanhamento de erros e exceções.
- Adicionar um serviço de rastreabilidade de tela para entender a dor do usuário. 


Arquitetura:
- Conforme o sistema crescer, seria interessante adicionar um CACHE no backend para não fazer tantas requisições no banco de dados. 
- Adicionar um broker para não correr o risco de perder informações em uma possivel falha.
- Adicionar um Traefik/Apache/Nginx na borda para criar um fluxo de proxy-reverso. 
- Criar um modelo para ver possiveis falhas de segurança.
- Criar um monitoramento baseado em SLI, SLO e Error Budget afim acompanhar a saúde da aplicação.
