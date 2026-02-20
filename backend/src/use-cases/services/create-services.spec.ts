import { describe, expect, it } from 'vitest';
import { Service } from '../../entities/service';
import { InMemoryServiceRepository } from '../../repositories/in-memory/in-memory-services-repository';
import { CreateService } from './create-services';

describe('Create Service', () => {
    it('should be able to create a service', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const createService = new CreateService(servicesRepository);

        const result = await createService.execute({
            name: 'Haircut',
            description: 'Classic haircut with scissors',
            price: 50,
            duration: 30,
            isActive: true
        });

        expect(result).toBeInstanceOf(Service);
        expect(result.name).toBe('Haircut');
        expect(result.price).toBe(50);
        expect(result.duration).toBe(30);
        expect(servicesRepository.items).toHaveLength(1);
        expect(servicesRepository.items[0]).toBe(result);
    });

    it('should be able to create a service without optional fields', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const createService = new CreateService(servicesRepository);

        const result = await createService.execute({
            name: 'Beard Trim',
            price: 25,
            duration: 15
        });

        expect(result).toBeInstanceOf(Service);
        expect(result.name).toBe('Beard Trim');
        expect(result.description).toBeNull();
        expect(result.isActive).toBe(true); // Default value
    });

    it('should be able to create multiple services', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const createService = new CreateService(servicesRepository);

        await createService.execute({
            name: 'Haircut',
            price: 50,
            duration: 30
        });

        await createService.execute({
            name: 'Beard Trim',
            price: 25,
            duration: 15
        });

        expect(servicesRepository.items).toHaveLength(2);
        expect(servicesRepository.items[0].name).toBe('Haircut');
        expect(servicesRepository.items[1].name).toBe('Beard Trim');
    });

    it('should create service as active by default', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const createService = new CreateService(servicesRepository);

        const result = await createService.execute({
            name: 'Hair Coloring',
            price: 100,
            duration: 60
        });

        expect(result.isActive).toBe(true);
    });

    it('should be able to create an inactive service', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const createService = new CreateService(servicesRepository);

        const result = await createService.execute({
            name: 'Old Service',
            price: 30,
            duration: 20,
            isActive: false
        });

        expect(result.isActive).toBe(false);
    });
});

