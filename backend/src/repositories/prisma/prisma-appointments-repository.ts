import { PrismaClient } from "@prisma/client/extension";
import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";

export class PrismaAppointmentsRepository implements AppointmentsRepository {
    constructor(private prisma: PrismaClient) {}

    async create(appointment: Appointment): Promise<void> {
        await this.prisma.appointment.create({
            data: {
                id: appointment.id,
                provider: appointment.provider,
                customer: appointment.customer,
                startAt: appointment.startAt,
                endAt: appointment.endAt
            }
        })
    }

    async findOverlappingAppointment(
        startAt: Date,
        endAt: Date
    ): Promise<Appointment | null> {
        const raw = await this.prisma.appointment.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            { startAt: { lte: startAt } },
                            { endAt: { gt: startAt } },
                        ],
                    },
                    {
                        AND: [
                            { startAt: { lt: endAt } },
                            { endAt: { gte: endAt } },
                        ],
                    },
                    {
                        AND: [
                            { startAt: { gte: startAt } },
                            { endAt: { lte: endAt } },
                        ],
                    },
                ],
            },
        });

        if (!raw) {
            return null;
        }

        return new Appointment({
            customer: raw.customer,
            provider: raw.provider,
            startAt: raw.startAt,
            endAt: raw.endAt,
        }), raw.id;
    }
}