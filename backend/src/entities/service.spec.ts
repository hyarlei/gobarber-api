import { expect, test } from 'vitest';
import { Service } from "./service";

test('create an service', () => {
    const service = new Service({
        name: 'Haircut',
        price: 50,
        duration: 30,
        isActive: true
    });

    expect(service).toBeInstanceOf(Service);
    expect(service.name).toBe('Haircut');
    expect(service.price).toBe(50);
    expect(service.duration).toBe(30);
    expect(service.isActive).toBe(true);
});

test('should generate a unique ID automatically', () => {
    const service = new Service({
        name: 'Haircut',
        price: 50,
        duration: 30,
        isActive: true
    });

    expect(service.id).toBeTruthy();
    expect(typeof service.id).toBe('string');
    expect(service.id.length).toBeGreaterThan(0);
});

test('should generate different IDs for different services', () => {

  const service1 = new Service({
    name: 'Haircut',
    price: 50,
    duration: 30,
    isActive: true
  });

  const service2 = new Service({
    name: 'Haircut',
    price: 50,
    duration: 30,
    isActive: true
  });

  expect(service1.id).not.toEqual(service2.id);
});

test('should accept a custom ID', () => {
  const customId = 'custom-id-123';

  const service = new Service({
    name: 'Haircut',
    price: 50,
    duration: 30,
    isActive: true
  }, customId);

  expect(service.id).toBe(customId);
});

test('should generate valid UUID format', () => {

  const service = new Service({
    name: 'Haircut',
    price: 50,
    duration: 30,
    isActive: true
  });

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  expect(service.id).toMatch(uuidRegex);
});

test('service should have a name', () => {

  const service = new Service({
    name: 'Haircut',
    price: 50,
    duration: 30,
    isActive: true
  });

  expect(service.name).toBe('Haircut');
});

test('cannot create a service without a name', () => {

  expect(() => {
    new Service({
      name: '',
      price: 50,
      duration: 30,
      isActive: true
    });
  }).toThrow()
});

test('cannot create a service with price zero or negative', () => {
  expect(() => {
    new Service({
      name: 'Haircut',
      price: 0,
      duration: 30,
      isActive: true
    });
  }).toThrow('Price must be greater than zero');
})

test('cannot create a service with duration zero or negative', () => {
  expect(() => {
    new Service({
      name: 'Haircut',
      price: 50,
      duration: 0,
      isActive: true
    });
  }).toThrow('Duration must be greater than zero');
})

test('should set isActive to true by default when not provided', () => {
  const service = new Service({
    name: 'Haircut',
    price: 50,
    duration: 30,
    isActive: undefined  // TypeScript pode reclamar, mas testa o spread
  });

  expect(service.isActive).toBe(true);
});

test('shold return null when description is not provided', () => {
  const service = new Service({
    name: 'Haircut',
    price: 50,
    duration: 30,
    isActive: true
  });

  expect(service.description).toBeNull();
})