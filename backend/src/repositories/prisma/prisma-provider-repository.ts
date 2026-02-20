import { PrismaClient } from "@prisma/client/extension";
import { Provider } from '../../entities/provider';
import { ProvidersRepository } from '../providers-repository';

export class PrismaProviderRepository implements ProvidersRepository {
    constructor(private prisma: PrismaClient) { }

    async create(provider: Provider): Promise<void> {
        await this.prisma.provider.create({
            data: {
                id: provider.id,
                name: provider.name,
                email: provider.email,
                phone: provider.phone,
            }
        })
    }

    async findById(id: string): Promise<Provider | null> {
        const raw = await this.prisma.provider.findUnique({
            where: {
                id
            }
        });
        return raw ? new Provider({
            name: raw.name,
            email: raw.email,
            phone: raw.phone ?? undefined
        }, raw.id) : null;
    }

    async findAll(): Promise<Provider[]> {
        const raws = await this.prisma.provider.findMany();
        return raws.map((raw: any) => new Provider({
            name: raw.name,
            email: raw.email,
            phone: raw.phone ?? undefined
        }, raw.id));
    }

    async update(provider: Provider): Promise<void> {
        await this.prisma.provider.update({
            where: {
                id: provider.id
            },
            data: {
                name: provider.name,
                email: provider.email,
                phone: provider.phone,
            }
        });
    }
}