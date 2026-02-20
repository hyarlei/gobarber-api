import { describe, expect, it } from 'vitest';
import { Service } from '../../entities/service';
import { InMemoryServiceRepository } from '../../repositories/in-memory/in-memory-services-repository';
import { UpdateServices } from './update-services';

describe('Update Services', () => {
    it('should be able to update a service', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        const result = await updateServices.execute({
            id: service.id,
            name: 'Premium Haircut',
            price: 80
        });

        expect(result.name).toBe('Premium Haircut');
        expect(result.price).toBe(80);
        expect(result.duration).toBe(30);
        expect(result.isActive).toBe(true);
    });

    it('should throw error when service does not exist', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        await expect(updateServices.execute({
            id: 'non-existent-id',
            name: 'Test'
        })).rejects.toThrow('Service not found');
    });

    it('should be able to update only name', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            description: 'Classic cut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        const result = await updateServices.execute({
            id: service.id,
            name: 'New Name'
        });

        expect(result.name).toBe('New Name');
        expect(result.description).toBe('Classic cut');
        expect(result.price).toBe(50);
        expect(result.duration).toBe(30);
    });

    it('should be able to update only description', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        const result = await updateServices.execute({
            id: service.id,
            description: 'New description'
        });

        expect(result.description).toBe('New description');
        expect(result.name).toBe('Haircut');
    });

    it('should be able to update only price', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        const result = await updateServices.execute({
            id: service.id,
            price: 75
        });

        expect(result.price).toBe(75);
        expect(result.name).toBe('Haircut');
        expect(result.duration).toBe(30);
    });

    it('should be able to update only duration', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        const result = await updateServices.execute({
            id: service.id,
            duration: 45
        });

        expect(result.duration).toBe(45);
        expect(result.name).toBe('Haircut');
        expect(result.price).toBe(50);
    });

    it('should be able to update isActive status', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        const result = await updateServices.execute({
            id: service.id,
            isActive: false
        });

        expect(result.isActive).toBe(false);
        expect(result.name).toBe('Haircut');
    });

    it('should be able to update multiple fields at once', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        const result = await updateServices.execute({
            id: service.id,
            name: 'Premium Haircut',
            description: 'Luxury experience',
            price: 100,
            duration: 60,
            isActive: false
        });

        expect(result.name).toBe('Premium Haircut');
        expect(result.description).toBe('Luxury experience');
        expect(result.price).toBe(100);
        expect(result.duration).toBe(60);
        expect(result.isActive).toBe(false);
    });

    it('should preserve entity validation on update', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        await expect(updateServices.execute({
            id: service.id,
            price: -10
        })).rejects.toThrow('Price must be greater than zero');
    });

    it('should create a new entity instance with updated values', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const updateServices = new UpdateServices(servicesRepository);

        const originalService = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(originalService);
        const originalId = originalService.id;

        const result = await updateServices.execute({
            id: originalService.id,
            name: 'Updated Name'
        });

        // Should maintain same ID but be a new instance
        expect(result.id).toBe(originalId);
        expect(result.name).toBe('Updated Name');
        
        // The repository should have the updated service
        const serviceInRepository = await servicesRepository.findById(originalId);
        expect(serviceInRepository?.name).toBe('Updated Name');
    });
});
