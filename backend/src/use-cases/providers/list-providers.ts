import { Provider } from '../../entities/provider';
import { ProvidersRepository } from '../../repositories/providers-repository';

export class ListProviders {
    constructor(
        private providersRepository: ProvidersRepository
    ) {}

    async execute(): Promise<Provider[]> {
        const providers = await this.providersRepository.findAll();
        return providers;
    }
}