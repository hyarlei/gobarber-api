import { expect, test } from 'vitest';
import { Provider } from './provider';

test('create a provider', () => {
  const provider = new Provider({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  });

  expect(provider).toBeInstanceOf(Provider);
  expect(provider.name).toBe('John Doe');
  expect(provider.email).toBe('john@example.com');
  expect(provider.phone).toBe('+1234567890');
});

test('should generate a unique ID automatically', () => {
  const provider = new Provider({
    name: 'John Doe',
    email: 'john@example.com'
  });

  expect(provider.id).toBeTruthy();
  expect(typeof provider.id).toBe('string');
  expect(provider.id.length).toBeGreaterThan(0);
});

test('should generate different IDs for different providers', () => {
  const provider1 = new Provider({
    name: 'John Doe',
    email: 'john@example.com'
  });

  const provider2 = new Provider({
    name: 'Jane Smith',
    email: 'jane@example.com'
  });

  expect(provider1.id).not.toEqual(provider2.id);
});

test('should accept a custom ID', () => {
  const customId = 'custom-provider-id-123';

  const provider = new Provider({
    name: 'John Doe',
    email: 'john@example.com'
  }, customId);

  expect(provider.id).toBe(customId);
});

test('should generate valid UUID format', () => {
  const provider = new Provider({
    name: 'John Doe',
    email: 'john@example.com'
  });

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  expect(provider.id).toMatch(uuidRegex);
});

test('provider should have a name', () => {
  const provider = new Provider({
    name: 'John Doe',
    email: 'john@example.com'
  });

  expect(provider.name).toBe('John Doe');
});

test('provider should have an email', () => {
  const provider = new Provider({
    name: 'John Doe',
    email: 'john@example.com'
  });

  expect(provider.email).toBe('john@example.com');
});

test('cannot create a provider without a name', () => {
  expect(() => {
    new Provider({
      name: '',
      email: 'john@example.com'
    });
  }).toThrow('Name is required');
});

test('cannot create a provider without an email', () => {
  expect(() => {
    new Provider({
      name: 'John Doe',
      email: ''
    });
  }).toThrow('Email is required');
});

test('should return phone when provided', () => {
  const provider = new Provider({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  });

  expect(provider.phone).toBe('+1234567890');
});

test('should return undefined when phone is not provided', () => {
  const provider = new Provider({
    name: 'John Doe',
    email: 'john@example.com'
  });

  expect(provider.phone).toBeUndefined();
});