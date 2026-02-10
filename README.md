# 💈 GoBarber API

Status: Em desenvolvimento (Foco em Clean Architecture & SOLID)

Este projeto é um sistema de agendamento para barbearias focado em alta disponibilidade e regras de negócio complexas. Construído com os princípios de Domain-Driven Design (DDD) para garantir um código escalável e testável.

🗺️ Mapa de Implementação
🧶 1. Camada de Domínio (O Coração)
As regras que nunca mudam, independente do banco de dados ou framework.

[ ] Entidades de Domínio

[ ] Criar Entidade Client

[ ] Criar Entidade Barber (com lógica de role e especialidade)

[ ] Criar Entidade Service (Corte, Barba, etc.)

[ ] Criar Entidade Appointment

[ ] Lógicas de Ouro (Domain Services)

[ ] Validação de conflito de horários (Double Booking)

[ ] Cálculo de horário de término baseado na duração do serviço

[ ] Regra de cancelamento (mínimo de X horas de antecedência)

⚙️ 2. Camada de Aplicação (Use Cases)
Onde a mágica acontece e o fluxo é orquestrado.

[ ] Casos de Uso

[ ] RegisterClient: Cadastro de novos clientes

[ ] CreateAppointment: Agendar um novo serviço

[ ] CancelAppointment: Cancelar agendamento

[ ] GetBarberAvailability: Listar horários livres de um barbeiro

[ ] Contratos (Interfaces)

[ ] Definir AppointmentsRepository

[ ] Definir BarbersRepository

[ ] Definir ClientsRepository

🏗️ 3. Camada de Infraestrutura (O Mundo Externo)
A ponte com as ferramentas (Prisma, NestJS, Express, Java Spring).

[ ] Banco de Dados

[ ] Configurar Schema (Prisma ou JPA)

[ ] Criar Migrations

[ ] Mappers

[ ] Criar AppointmentMapper (Persistência ↔ Domínio)

[ ] Repositórios

[ ] Implementar Repositórios Reais (com acesso ao DB)

[ ] Web / HTTP

[ ] Criar Controllers

[ ] Configurar Injeção de Dependência

🧪 4. Qualidade e Testes (Selo Sênior)
O que garante que o sistema não vai quebrar no deploy.

[ ] Testes Unitários

[ ] Testar regras da Entidade Appointment

[ ] Testar Use Case CreateAppointment (com In-memory Repository)

[ ] Testes de Integração (E2E)

[ ] Testar rota de agendamento (Fluxo completo)

🛠️ Tecnologias Focadas
Linguagem: TypeScript / Java (Clean Arch permite trocar!)

Framework: NestJS / Spring Boot

ORM: Prisma / JPA

Testes: Vitest / JUnit

💡 Notas de Estudo (Insights do Projeto)
Utilizar ISO Strings para datas para evitar problemas de fuso horário entre cliente e barbearia.

Manter o Use Case enxuto: a lógica de "posso ou não agendar" deve ser decidida pela Entidade.
