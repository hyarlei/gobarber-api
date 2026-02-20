import { Provider } from '../../entities/provider';
import { ProvidersRepository } from '../../repositories/providers-repository';

interface CreateProviderRequest {
    name: string;
    email: string;
    phone?: string;
}

type CreateProviderResponse = Provider;

export class CreateProvider {
    constructor(
        private providersRepository: ProvidersRepository
    ) {}

    async execute({ name, email, phone }: CreateProviderRequest): Promise<CreateProviderResponse> {
        const provider = new Provider({
            name,
            email,
            phone
        });

        await this.providersRepository.create(provider);

        return provider;
    }
}