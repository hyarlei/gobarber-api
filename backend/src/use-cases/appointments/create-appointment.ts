import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../../repositories/appointments-repository";

interface CreateAppointmentRequest {
    customer: string;
    providerId: string;
    serviceId: string;
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
        providerId,
        serviceId,
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
            providerId,
            serviceId,
            startAt,
            endAt
        });

        await this.appointmentsRepository.create(appointment);

        return appointment;
    }
}