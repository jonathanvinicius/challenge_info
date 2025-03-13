# Challenge Info

Configurar envs locais para funcionamento do projeto arquivo .env.example raiz do projeto.
### Pré-requisitos

- **Docker**
- **Aws Cognito**

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/jonathanvinicius/challenge_info

2. Execute o container da aplicação
   ```bash
   docker compose up -d

3. Importar a collection do postman disponibilizada no diretório collection

## Stack Usada

- **Backend:** Node.js, NestJS, TypeScript
- **Banco de Dados:** Postgres
- **ORM:** Sequelize
- **ACL:** Cognito

## Swagger
Para acessar o swagger da aplicação basta acessar o endpoint /docs.

## Tecnologias e Benefícios

Escolhi o NestJs como framework da API devido a diversos benefícios, tais como:

**Arquitetura modular e escalável**:
Facilita a divisão do projeto em módulos, permitindo uma manutenção mais organizada e uma escalabilidade natural conforme o sistema cresce. <br>
**Suporte nativo para testes**:
Integrado ao Jest, agiliza a criação e execução de testes unitários e de integração.<br>
**Documentação automática**:
Gera documentação interativa (Swagger) de forma nativa, facilitando o desenvolvimento e a comunicação entre equipes e consumidores da API.<br>
**Injeção de dependências robusta**:
Melhora a testabilidade e a flexibilidade da aplicação.
Forte tipagem e uso de TypeScript:
Proporciona maior segurança e consistência no desenvolvimento.

## Banco de dados

**PostgreSQL**<br>
Optei pelo PostgreSQL como banco de dados relacional, que traz os seguintes benefícios:

**Confiabilidade e robustez:** <br>
Amplamente testado em produção e conhecido por sua estabilidade. <br>

**Recursos avançados:** <br>
Suporte a transações complexas, consultas avançadas e extensões que ampliam as funcionalidades do banco. <br>

**Performance e escalabilidade:** <br>
Ideal para aplicações que demandam alta performance e podem crescer em volume de dados. <br>
Ampla comunidade e suporte:
Facilita a resolução de problemas e a integração com outras tecnologias.

**Sequelize** <br>
Utilizei o Sequelize como ORM para facilitar a manipulação dos dados no PostgreSQL, oferecendo:

**Abstração do banco de dados:**<br>
Permite trabalhar com modelos e relacionamentos de forma intuitiva, reduzindo a necessidade de escrever SQL complexo.<br>
Facilidade na migração e sincronização:
Simplifica o gerenciamento das alterações na estrutura do banco de dados ao longo do tempo.

## Endpoints da aplicação
Para garantir que as APIs não fiquem expostas, optei por utilizar o AWS Cognito, uma solução robusta de autenticação e gerenciamento de usuários.<br>

Essa ferramenta traz benefícios como:<br>
**Controle de Acesso Granular (ACL):** Permite definir e gerenciar perfis de usuário, garantindo que apenas usuários com privilégios específicos (como administradores) tenham acesso a determinados endpoints.<br>

**Escalabilidade e Segurança:** A AWS oferece uma infraestrutura confiável, que assegura autenticação robusta, além de permitir a integração com outros serviços da AWS.<br>

**Facilidade de Integração:** 
O Cognito se integra perfeitamente ao NestJS por meio dos authGuards, o que automatiza a validação de acesso e reforça a segurança dos endpoints.
Os authGuards do NestJS são responsáveis por interceptar as requisições e verificar se o usuário possui a autorização necessária para acessar os recursos solicitados. Essa abordagem traz as seguintes vantagens:

**Segurança Aprimorada:** Garante que apenas usuários autenticados e autorizados acessem rotas protegidas.<br>

**Manutenção Simplificada:** Centraliza a lógica de autorização, facilitando atualizações e auditorias.<br>

**Flexibilidade:** Permite configurar facilmente diferentes níveis de acesso, adaptando o sistema às necessidades específicas de cada perfil de usuário.<br>

**Autenticação e Usuários**<br>
POST /users: Cadastro de usuário<br>

POST /auth/login: Autenticação de usuário<br>

**Veículos**<br>
Observação: Apenas usuários com perfil de admin podem acessar as APIs de veículos.<br>
POST /vehicles: Cadastro de veículo<br>
GET /vehicles: Listagem de veículos<br>
PUT /vehicles/:id: Atualização de veículo<br>
DELETE /vehicles/:id: Exclusão de veículo<br>
GET /vehicles/filter: Filtragem específica de veículo<br>



## Perspectivas de Melhorias e Escalabilidade

### Arquitetura Atual

- **Arquitetura Monolítica:** A arquitetura atual é monolítica, onde todas as funcionalidades fazem parte de uma única base de código.
- **Banco de Dados:** Um único banco de dados é utilizado para todos os serviços e funcionalidades.

**Arquitetura de Microserviços:** <br>
Desmembrar a arquitetura monolítica em microserviços. Cada microserviço irá lidar com um domínio específico e utilizará seu próprio banco de dados.

**Sistemas de Mensageria:** Implementar sistemas de mensageria para lidar com a comunicação assíncrona entre diferentes serviços. Isso ajudará a desacoplar os serviços e melhorar a escalabilidade.
Ao utilizar ferramentas como RabbitMQ, Amazon SQS e SNS, é possível estabelecer filas e tópicos para gerenciamento de mensagens, o que oferece benefícios como:<br>
**Escalabilidade:** Permite distribuir a carga de trabalho e aumentar a capacidade de processamento conforme a demanda.<br>
**Resiliência:** Minimiza os impactos de falhas pontuais, pois as mensagens ficam armazenadas até serem processadas.<br>
**Flexibilidade:** Facilita a integração entre serviços heterogêneos, permitindo que novas funcionalidades sejam adicionadas sem **comprometer o sistema existente.<br>

**Garantia de entrega:** As ferramentas oferecem mecanismos que asseguram a entrega das mensagens, mesmo em ambientes com instabilidade.

**Escalabilidade Horizontal e Vertical:** Implementar estratégias de escalabilidade horizontal e vertical para lidar com o aumento da carga e garantir alta disponibilidade.

**Health check da aplicação:**<br>
Monitoramento contínuo para garantir a disponibilidade e performance.<br>

**Divisão da base de dados**:
Estrutura pensada para suportar a escalabilidade horizontal dos microserviços.<br>

**Flexibilidade tecnológica**:
Possibilidade de desenvolvimento de microserviços em diferentes linguagens, de acordo com o conhecimento do time e as necessidades do sistema.<br>

**Orquestração e gerenciamento de containers**:
Uso de soluções como o ECS na AWS para melhor gerenciamento e escalabilidade do ambiente.
<br>
