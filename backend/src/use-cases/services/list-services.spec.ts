import { describe, expect, it } from 'vitest';
import { Service } from '../../entities/service';
import { InMemoryServiceRepository } from '../../repositories/in-memory/in-memory-services-repository';
import { ListServices } from './list-services';

describe('List Services', () => {
    it('should be able to list all services', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const listServices = new ListServices(servicesRepository);

        // Create some services
        const service1 = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        const service2 = new Service({
            name: 'Beard Trim',
            price: 25,
            duration: 15,
            isActive: true
        });

        servicesRepository.items.push(service1, service2);

        const result = await listServices.execute();

        expect(result).toHaveLength(2);
        expect(result[0]).toBe(service1);
        expect(result[1]).toBe(service2);
    });

    it('should return empty array when there are no services', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const listServices = new ListServices(servicesRepository);

        const result = await listServices.execute();

        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('should list both active and inactive services', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const listServices = new ListServices(servicesRepository);

        const activeService = new Service({
            name: 'Haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        const inactiveService = new Service({
            name: 'Old Service',
            price: 30,
            duration: 20,
            isActive: false
        });

        servicesRepository.items.push(activeService, inactiveService);

        const result = await listServices.execute();

        expect(result).toHaveLength(2);
        expect(result.some(s => s.isActive === true)).toBe(true);
        expect(result.some(s => s.isActive === false)).toBe(true);
    });

    it('should return services with all properties', async () => {
        const servicesRepository = new InMemoryServiceRepository();
        const listServices = new ListServices(servicesRepository);

        const service = new Service({
            name: 'Haircut',
            description: 'Classic haircut',
            price: 50,
            duration: 30,
            isActive: true
        });

        servicesRepository.items.push(service);

        const result = await listServices.execute();

        expect(result[0].name).toBe('Haircut');
        expect(result[0].description).toBe('Classic haircut');
        expect(result[0].price).toBe(50);
        expect(result[0].duration).toBe(30);
        expect(result[0].isActive).toBe(true);
    });
});
