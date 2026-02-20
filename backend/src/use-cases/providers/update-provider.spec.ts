import { describe, expect, it } from 'vitest';
import { Provider } from '../../entities/provider';
import { InMemoryProviderRepository } from '../../repositories/in-memory/in-memory-provider';
import { UpdateProvider } from './update-provider';

describe('Update Provider', () => {
    it('should be able to update a provider', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        providersRepository.items.push(provider);

        const result = await updateProvider.execute({
            id: provider.id,
            name: 'John Updated',
            email: 'johnupdated@example.com'
        });

        expect(result.name).toBe('John Updated');
        expect(result.email).toBe('johnupdated@example.com');
        expect(result.phone).toBe('123456789');
    });

    it('should throw error when provider does not exist', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        await expect(updateProvider.execute({
            id: 'non-existent-id',
            name: 'Test'
        })).rejects.toThrow('Provider not found');
    });

    it('should be able to update only name', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        providersRepository.items.push(provider);

        const result = await updateProvider.execute({
            id: provider.id,
            name: 'New Name'
        });

        expect(result.name).toBe('New Name');
        expect(result.email).toBe('john@example.com');
        expect(result.phone).toBe('123456789');
    });

    it('should be able to update only email', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        providersRepository.items.push(provider);

        const result = await updateProvider.execute({
            id: provider.id,
            email: 'newemail@example.com'
        });

        expect(result.email).toBe('newemail@example.com');
        expect(result.name).toBe('John Doe');
        expect(result.phone).toBe('123456789');
    });

    it('should be able to update only phone', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        providersRepository.items.push(provider);

        const result = await updateProvider.execute({
            id: provider.id,
            phone: '999999999'
        });

        expect(result.phone).toBe('999999999');
        expect(result.name).toBe('John Doe');
        expect(result.email).toBe('john@example.com');
    });

    it('should be able to update multiple fields at once', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789'
        });

        providersRepository.items.push(provider);

        const result = await updateProvider.execute({
            id: provider.id,
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '987654321'
        });

        expect(result.name).toBe('Jane Doe');
        expect(result.email).toBe('jane@example.com');
        expect(result.phone).toBe('987654321');
    });

    it('should preserve entity validation on update', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com'
        });

        providersRepository.items.push(provider);

        await expect(updateProvider.execute({
            id: provider.id,
            email: 'invalid-email'
        })).rejects.toThrow('Invalid email format');
    });

    it('should not be able to update with empty name', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com'
        });

        providersRepository.items.push(provider);

        await expect(updateProvider.execute({
            id: provider.id,
            name: ''
        })).rejects.toThrow('Name is required');
    });

    it('should create a new entity instance with updated values', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const originalProvider = new Provider({
            name: 'John Doe',
            email: 'john@example.com'
        });

        providersRepository.items.push(originalProvider);
        const originalId = originalProvider.id;

        const result = await updateProvider.execute({
            id: originalProvider.id,
            name: 'Updated Name'
        });

        // Should maintain same ID but be a new instance
        expect(result.id).toBe(originalId);
        expect(result.name).toBe('Updated Name');
        
        // The repository should have the updated provider
        const providerInRepository = await providersRepository.findById(originalId);
        expect(providerInRepository?.name).toBe('Updated Name');
    });

    it('should be able to update provider without phone to have phone', async () => {
        const providersRepository = new InMemoryProviderRepository();
        const updateProvider = new UpdateProvider(providersRepository);

        const provider = new Provider({
            name: 'John Doe',
            email: 'john@example.com'
        });

        providersRepository.items.push(provider);

        const result = await updateProvider.execute({
            id: provider.id,
            phone: '123456789'
        });

        expect(result.phone).toBe('123456789');
    });
});
