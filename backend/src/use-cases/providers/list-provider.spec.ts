import { describe, expect, it } from 'vitest';
import { Provider } from '../../entities/provider';
import { InMemoryProviderRepository } from '../../repositories/in-memory/in-memory-provider';
import { ListProviders } from './list-providers';

describe('List Providers', () => {
    it('should be able to list all providers', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const listProviders = new ListProviders(providersRepository);

        const provider1 = new Provider({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        const provider2 = new Provider({
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '987654321'
        });

        providersRepository.items.push(provider1, provider2);

        const result = await listProviders.execute();

        expect(result).toHaveLength(2);
        expect(result[0]).toBe(provider1);
        expect(result[1]).toBe(provider2);
    });

    it('should return empty array when there are no providers', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const listProviders = new ListProviders(providersRepository);

        const result = await listProviders.execute();

        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('should return providers with all properties', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const listProviders = new ListProviders(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        providersRepository.items.push(provider);

        const result = await listProviders.execute();

        expect(result[0].name).toBe('John Doe');
        expect(result[0].email).toBe('john@example.com');
        expect(result[0].phone).toBe('123456789');
        expect(result[0].id).toBeTruthy();
    });

    it('should return providers with and without phone', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const listProviders = new ListProviders(providersRepository);

        const providerWithPhone = new Provider({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        const providerWithoutPhone = new Provider({
            name: 'Jane Doe',
            email: 'jane@example.com'
        });

        providersRepository.items.push(providerWithPhone, providerWithoutPhone);

        const result = await listProviders.execute();

        expect(result).toHaveLength(2);
        expect(result[0].phone).toBe('123456789');
        expect(result[1].phone).toBeUndefined();
    });
});
