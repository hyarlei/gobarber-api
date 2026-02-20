import { Service } from '../../entities/service';
import { ServicesRepository } from '../../repositories/services-repository';

interface UpdateServicesRequest {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
    isActive?: boolean;
}

type UpdateServicesResponse = Service;

export class UpdateServices {
    constructor(
        private servicesRepository: ServicesRepository
    ) {}

    async execute({
        id,
        name,
        description,
        price,
        duration,
        isActive
    }: UpdateServicesRequest): Promise<UpdateServicesResponse> {
        const service = await this.servicesRepository.findById(id);

        if (!service) {
            throw new Error('Service not found');
        }

        const updatedService = new Service({
            name: name ?? service.name,
            description: description ?? service.description ?? undefined,
            price: price ?? service.price,
            duration: duration ?? service.duration,
            isActive: isActive ?? service.isActive
        }, service.id);

        await this.servicesRepository.update(updatedService);
        return updatedService;
    }
}