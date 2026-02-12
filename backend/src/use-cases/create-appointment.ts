import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
    customer: string;
    provider: string;
    startAt: Date;
    endAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
    constructor(
        private appointmentsRepository: AppointmentsRepository
    ) {}

    async execute({
        customer,
        provider,
        startAt,
        endAt
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {

        const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
            startAt,
            endAt
        );

        if (overlappingAppointment) {
            throw new Error('Another appointment overlaps with the given dates');
        }

        const appointment = new Appointment({
            customer,
            provider,
            startAt,
            endAt
        });

        await this.appointmentsRepository.create(appointment);

        return appointment;
    }
}