import { expect, test } from 'vitest';
import { Appointment } from './appointment';

test('create an appointment', () => {
  const appointment = new Appointment({
    customer: 'John Doe',
    startAt: new Date(),
    endAt: new Date(),
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual('John Doe');
});

test('cannot create an appointment with end date before start date', () => {
  const startAt = new Date();
  const endAt = new Date();

  endAt.setDate(endAt.getDate() - 1);

  expect(() => {
    new Appointment({
    customer: 'John Doe',
    startAt,
    endAt,
    });
  }).toThrow()
});