import { Service } from '../../entities/service';
import { ServicesRepository } from '../../repositories/services-repository';

interface CreateServiceRequest {
    name: string;
    description?: string;
    price: number;
    duration: number;
    isActive?: boolean;
}

type CreateServiceResponse = Service;

export class CreateService {
    constructor(
        private servicesRepository: ServicesRepository
    ) {}

    async execute({
        name,
        description,
        price,
        duration,
        isActive
    }: CreateServiceRequest): Promise<CreateServiceResponse> {

        const service = new Service({
            name,
            description,
            price,
            duration,
            isActive
        });
        await this.servicesRepository.create(service);
        return service;
    }
}