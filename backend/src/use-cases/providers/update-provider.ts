import { Provider } from '../../entities/provider';
import { ProvidersRepository } from '../../repositories/providers-repository';

interface UpdateProviderRequest {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
}

type UpdateProviderResponse = Provider;

export class UpdateProvider {
    constructor(
        private providersRepository: ProvidersRepository
    ) {}

    async execute({
        id,
        name,
        email,
        phone
    }: UpdateProviderRequest): Promise<UpdateProviderResponse> {
        const provider = await this.providersRepository.findById(id);

        if (!provider) {
            throw new Error('Provider not found');
        }

        const updatedProvider = new Provider(
            {
                name: name ?? provider.name,
                email: email ?? provider.email,
                phone: phone ?? provider.phone ?? undefined
            },
            id
        );

        await this.providersRepository.update(updatedProvider);

        return updatedProvider;
    }
}