import { describe, expect, it } from 'vitest';
import { Provider } from '../../entities/provider';
import { InMemoryProviderRepository } from '../../repositories/in-memory/in-memory-provider';
import { CreateProvider } from './create-provider';

describe('Create Provider', () => {
    it('should be able to create a provider', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const createProvider = new CreateProvider(providersRepository);

        const provider = await createProvider.execute({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        expect(provider).toBeInstanceOf(Provider);
        expect(provider.name).toBe('John Doe');
        expect(provider.email).toBe('john@example.com');
        expect(provider.phone).toBe('123456789');
        expect(providersRepository.items).toHaveLength(1);
        expect(providersRepository.items[0]).toBe(provider);
    });

    it('should be able to create a provider without phone', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const createProvider = new CreateProvider(providersRepository);

        const provider = await createProvider.execute({
            name: 'John Doe',
            email: 'john@example.com'
        });

        expect(provider).toBeInstanceOf(Provider);
        expect(provider.name).toBe('John Doe');
        expect(provider.email).toBe('john@example.com');
        expect(provider.phone).toBeUndefined();
    });

    it('should not be able to create a provider with invalid email', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const createProvider = new CreateProvider(providersRepository);

        await expect(createProvider.execute({
            name: 'John Doe',
            email: 'invalid-email',
            phone: '123456789'
        })).rejects.toThrow('Invalid email format');
    });

    it('should not be able to create a provider without name', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const createProvider = new CreateProvider(providersRepository);

        await expect(createProvider.execute({
            name: '',
            email: 'john@example.com'
        })).rejects.toThrow('Name is required');
    });

    it('should not be able to create a provider without email', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const createProvider = new CreateProvider(providersRepository);

        await expect(createProvider.execute({
            name: 'John Doe',
            email: ''
        })).rejects.toThrow('Email is required');
    });

    it('should generate a unique id for each provider', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const createProvider = new CreateProvider(providersRepository);

        const provider1 = await createProvider.execute({
            name: 'John Doe',
            email: 'john@example.com'
        });

        const provider2 = await createProvider.execute({
            name: 'Jane Doe',
            email: 'jane@example.com'
        });

        expect(provider1.id).not.toBe(provider2.id);
        expect(provider1.id).toBeTruthy();
        expect(provider2.id).toBeTruthy();
    });
});
