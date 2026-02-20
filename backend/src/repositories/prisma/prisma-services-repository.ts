import { PrismaClient } from "@prisma/client/extension";
import { Service } from '../../entities/service';
import { ServicesRepository } from '../services-repository';

export class PrismaServiceRepository implements ServicesRepository {
    constructor(private prisma: PrismaClient) { }

    async create(service: Service): Promise<void> {
        await this.prisma.service.create({
            data: {
                id: service.id,
                name: service.name,
                description: service.description,
                price: service.price,
                duration: service.duration,
                isActive: service.isActive,
            }
        })
    }

    async findById(id: string): Promise<Service | null> {
        const raw = await this.prisma.service.findUnique({
            where: {
                id
            }
        });
        return raw ? new Service({
            name: raw.name,
            description: raw.description ?? undefined,
            price: raw.price,
            duration: raw.duration,
            isActive: raw.isActive
        }, raw.id) : null;
    }

    async findAll(): Promise<Service[]> {
        const raws = await this.prisma.service.findMany();
        return raws.map((raw: any) => new Service({
            name: raw.name,
            description: raw.description ?? undefined,
            price: raw.price,
            duration: raw.duration,
            isActive: raw.isActive
        }, raw.id));
    }

    async findActive(): Promise<Service[]> {
        const raws = await this.prisma.service.findMany({
            where: {
                isActive: true
            }
        });
        return raws.map((raw: any) => new Service({
            name: raw.name,
            description: raw.description ?? undefined,
            price: raw.price,
            duration: raw.duration,
            isActive: raw.isActive
        }, raw.id));
    }
''
    async update(service: Service): Promise<void> {
        await this.prisma.service.update({
            where: {
                id: service.id
            },
            data: {
                name: service.name,
                description: service.description,
                price: service.price,
                duration: service.duration,
                isActive: service.isActive
            }
        })
    }
}