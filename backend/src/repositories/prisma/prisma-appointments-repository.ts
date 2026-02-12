import { PrismaClient } from "@prisma/client/extension";
import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";

export class PrismaAppointmentsRepository implements AppointmentsRepository {
    constructor(private prisma: PrismaClient) {}

    async create(appointment: Appointment): Promise<void> {
        await this.prisma.appointment.create({
            data: {
                id: appointment.id,
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
                    // Caso 1: O novo agendamento começa durante um existente
                    {
                        AND: [
                            { startAt: { lte: startAt } },
                            { endAt: { gt: startAt } },
                        ],
                    },
                    // Caso 2: O novo agendamento termina durante um existente
                    {
                        AND: [
                            { startAt: { lt: endAt } },
                            { endAt: { gte: endAt } },
                        ],
                    },
                    // Caso 3: O novo agendamento engloba um existente
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
            startAt: raw.startAt,
            endAt: raw.endAt,
        }), raw.id;
    }
}