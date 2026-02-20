import { Service } from "../../entities/service";
import { ServicesRepository } from "../services-repository";

export class InMemoryServiceRepository implements ServicesRepository {
    public items: Service[] = [];

    async create(service: Service): Promise<void> {
        this.items.push(service);
    }

    async findById(id: string): Promise<Service | null> {
        const service = this.items.find(item => item.id === id);
        return service || null;
    }

    async findAll(): Promise<Service[]> {
        return this.items;
    }

    async findActive(): Promise<Service[]> {
        return this.items.filter(item => item.isActive === true);
    }

    async update(service: Service): Promise<void> {
        const index = this.items.findIndex(item => item.id === service.id);
        if (index !== -1) {
            this.items[index] = service;
        }
    }
}