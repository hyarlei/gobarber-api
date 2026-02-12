import { expect, test } from 'vitest';
import { getFutureDate } from '../../test/utils/get-future-date';
import { Appointment } from './appointment';

test('create an appointment', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  const appointment = new Appointment({
    customer: 'John Doe',
    startAt,
    endAt
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual('John Doe');
});

test('cannot create an appointment with end date before start date', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-09');

  expect(() => {
    new Appointment({
    customer: 'John Doe',
    startAt,
    endAt,
    });
  }).toThrow()
});

test('cannot create an appointment with start date before now', () => {
  const startAt = new Date('2024-01-01');
  const endAt = getFutureDate('2024-01-11');

  expect(() => {
    new Appointment({
    customer: 'John Doe',
    startAt,
    endAt,
    });
  }).toThrow()
});

// ✅ Testa criação básica
// ✅ Testa validação de datas
// ❌ Não testa geração de ID
// ❌ Não testa ID customizado
// ❌ Não testa todos os getters