# 💈 GoBarber API

Status: Em desenvolvimento (Foco em Clean Architecture & SOLID)

Este projeto é um sistema de agendamento para barbearias focado em alta disponibilidade e regras de negócio complexas. Construído com os princípios de Domain-Driven Design (DDD) para garantir um código escalável e testável.

## 🗺️ Mapa de Implementação

### 🧶 1. Camada de Domínio (O Coração)

As regras que nunca mudam, independente do banco de dados ou framework.

#### ✅ Entidades de Domínio

- [X] **Appointment** (15 testes) - Validações de duração mínima, datas futuras, IDs obrigatórios
- [X] **Service** (11 testes) - Nome, preço, duração, status ativo/inativo
- [X] **Provider** (11 testes) - Barbeiro com validação de email, nome e telefone opcional

#### 🚧 Lógicas de Ouro (Domain Services)

- [ ] Validação de conflito de horários (Double Booking)
- [ ] Cálculo de horário de término baseado na duração do serviço
- [ ] Regra de cancelamento (mínimo de X horas de antecedência)

---

### ⚙️ 2. Camada de Aplicação (Use Cases)

Onde a mágica acontece e o fluxo é orquestrado.

#### ✅ Casos de Uso Implementados

**Appointments:**

- [X] CreateAppointment (2 testes)
- [ ] CancelAppointment
- [ ] GetProviderAvailability (Listar horários livres)

**Services:**

- [X] CreateService (5 testes)
- [X] ListServices (4 testes)
- [X] UpdateService (10 testes)

**Providers (Barbers):**

- [X] CreateProvider (6 testes)
- [X] ListProviders (4 testes)
- [X] UpdateProvider (10 testes)

#### ✅ Contratos (Repository Interfaces)

- [X] AppointmentsRepository
- [X] ServicesRepository
- [X] ProvidersRepository

---

### 🏗️ 3. Camada de Infraestrutura (O Mundo Externo)

A ponte com as ferramentas (Prisma, NestJS).

#### ✅ Banco de Dados

- [X] Schema Prisma configurado com relacionamentos
- [X] Migrations executadas:
  - `20260212143543_criando_a_entidade_appointment`
  - `20260212203556_add_novos_atributos`
  - `20260213183802_add_service_and_provider_models`

#### ✅ Repositórios

**In-Memory (para testes):**

- [X] InMemoryAppointmentsRepository
- [X] InMemoryServiceRepository
- [X] InMemoryProviderRepository

**Prisma (produção):**

- [X] PrismaAppointmentsRepository (implementado e corrigido)
- [X] PrismaServiceRepository
- [X] PrismaProviderRepository

#### 🚧 Web / HTTP

- [ ] Controllers NestJS
- [ ] DTOs de validação
- [ ] Configurar Injeção de Dependência

---

### 🧪 4. Qualidade e Testes (Selo Sênior)

O que garante que o sistema não vai quebrar no deploy.

#### ✅ Testes Unitários (79 testes passando)

**Entidades:**

- [X] Appointment (15 testes) - Validações de domínio
- [X] Service (11 testes) - Regras de negócio
- [X] Provider (11 testes) - Validação de email

**Use Cases:**

- [X] Services: Create, List, Update (19 testes)
- [X] Providers: Create, List, Update (20 testes)
- [X] Appointments: Create (2 testes)
- [X] Utils: get-future-date (1 teste)

#### 🚧 Testes de Integração (E2E)

- [ ] Testar rota de agendamento (Fluxo completo)
- [ ] Testar conflitos de horário
- [ ] Testar cancelamento

## 🛠️ Tecnologias Focadas

- **Linguagem:** TypeScript
- **Framework:** NestJS
- **ORM:** Prisma + PostgreSQL
- **Testes:** Vitest (79 testes passando)
- **Arquitetura:** Clean Architecture + DDD + Repository Pattern

---

## 📋 Próximos Passos

1. ✅ ~~Executar migrations do Prisma~~ - **CONCLUÍDO**

2. ✅ ~~Implementar PrismaAppointmentsRepository~~ - **CONCLUÍDO**

3. **🚧 Criar Controllers NestJS** (você vai fazer)
   - ServicesController (CRUD)
   - ProvidersController (CRUD)
   - AppointmentsController (Create, Cancel, List)

4. **🚧 Use Cases Avançados** (você vai fazer)
   - CancelAppointment com regra de antecedência
   - GetProviderAvailability com validação de conflitos

5. **🚧 Testes E2E** (você vai fazer)
   - Fluxo completo de agendamento
   - Validação de conflitos de horário

---

## 💡 Notas de Estudo (Insights do Projeto)

- **ISO Strings para datas:** Evita problemas de fuso horário entre cliente e servidor
- **Use Case enxuto:** A lógica de validação pertence à Entidade, não ao Use Case
- **Repository Pattern:** Permite trocar implementação (in-memory ↔ Prisma) sem alterar domínio
- **Imutabilidade:** Updates criam nova instância da entidade com mesmo ID
- **Null vs Undefined:** Getters retornam `null` para campos opcionais não preenchidos no banco, `undefined` quando não fornecidos no construtor
