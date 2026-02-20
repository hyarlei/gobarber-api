import { Service } from '../../entities/service';
import { ServicesRepository } from '../../repositories/services-repository';

type ListServicesResponse = Service[];

export class ListServices {
    constructor(
        private servicesRepository: ServicesRepository
    ) {}

    async execute(): Promise<ListServicesResponse> {
        const services = await this.servicesRepository.findAll();
        return services;
    }
}