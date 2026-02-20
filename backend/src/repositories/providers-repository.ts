import { Provider } from '../entities/provider';

export interface ProvidersRepository {
    create(provider: Provider): Promise<void>;
    findById(id: string): Promise<Provider | null>;
    findAll(): Promise<Provider[]>;
    update(provider: Provider): Promise<void>;
}