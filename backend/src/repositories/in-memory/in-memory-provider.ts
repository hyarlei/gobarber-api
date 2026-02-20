import { Provider } from '../../entities/provider';
import { ProvidersRepository } from '../providers-repository';

export class InMemoryProviderRepository implements ProvidersRepository {
    public items: Provider[] = [];

    async create(provider: Provider): Promise<void> {
        this.items.push(provider);
    }

    async findById(id: string): Promise<Provider | null> {
        const provider = this.items.find(item => item.id === id);
        return provider || null;
    }

    async findAll(): Promise<Provider[]> {
        return this.items;
    }

    async update(provider: Provider): Promise<void> {
        const index = this.items.findIndex(item => item.id === provider.id);
        if (index !== -1) {
            this.items[index] = provider;
        }
    }
}