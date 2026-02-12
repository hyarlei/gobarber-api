import { expect, test } from 'vitest';
import { getFutureDate } from '../../test/utils/get-future-date';
import { Appointment } from './appointment';

test('create an appointment', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
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
      provider: 'Jane Doe',
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
      provider: 'Jane Doe',
      startAt,
      endAt,
    });
  }).toThrow()
});

test('should generate a unique ID automatically', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  });

  expect(appointment.id).toBeTruthy();
  expect(typeof appointment.id).toBe('string');
  expect(appointment.id.length).toBeGreaterThan(0);
});

test('should generate different IDs for different appointments', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  const appointment1 = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  });

  const appointment2 = new Appointment({
    customer: 'Jane Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  });

  expect(appointment1.id).not.toEqual(appointment2.id);
});

test('should accept a custom ID', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');
  const customId = 'custom-id-123';

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  }, customId);

  expect(appointment.id).toBe(customId);
});

test('should generate valid UUID format', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  });

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  expect(appointment.id).toMatch(uuidRegex);
});

test('should have a provider', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  });

  expect(appointment.provider).toBe('Jane Doe');
});

test('cannot create an appointment without a provider', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  expect(() => {
    new Appointment({
      customer: 'John Doe',
      provider: '',
      startAt,
      endAt,
    });
  }).toThrow()
});

test('cannot create an appointment without a customer', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  expect(() => {
    new Appointment({
      customer: '',
      provider: 'Jane Doe',
      startAt,
      endAt,
    });
  }).toThrow()
});

test('should accept an appointment with exactly 30 minutes duration', () => {
  const startAt = getFutureDate('2024-01-10 10:00');
  const endAt = new Date(startAt.getTime() + 30 * 60 * 1000); // +30 minutos

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
});

test('cannot create an appointment with less than 30 minutes duration', () => {
  const startAt = getFutureDate('2024-01-10 10:00');
  const endAt = new Date(startAt.getTime() + 15 * 60 * 1000); // +15 minutos

  expect(() => {
    new Appointment({
      customer: 'John Doe',
      provider: 'Jane Doe',
      startAt,
      endAt,
    });
  }).toThrow('Appointment must be at least 30 minutes long');
});

test('should generate createdAt automatically', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');
  const beforeCreation = new Date();

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  });

  const afterCreation = new Date();

  expect(appointment.createdAt).toBeTruthy();
  expect(appointment.createdAt).toBeInstanceOf(Date);
  expect(appointment.createdAt!.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
  expect(appointment.createdAt!.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
});

test('should accept a custom createdAt', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');
  const customCreatedAt = new Date('2024-01-01');

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
    createdAt: customCreatedAt,
  });

  expect(appointment.createdAt).toBe(customCreatedAt);
});

test('should have canceledAt as null by default', () => {
  const startAt = getFutureDate('2024-01-10');
  const endAt = getFutureDate('2024-01-11');

  const appointment = new Appointment({
    customer: 'John Doe',
    provider: 'Jane Doe',
    startAt,
    endAt,
  });

  expect(appointment.canceledAt).toBeNull();
});