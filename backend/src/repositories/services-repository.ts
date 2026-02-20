import { Service } from '../entities/service';

export interface ServicesRepository {
    create(service: Service): Promise<void>;
    findById(id: string): Promise<Service | null>;
    findAll(): Promise<Service[]>;
    findActive(): Promise<Service[]>;
    update(service: Service): Promise<void>;
}