import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
    public items: Appointment[] = [];

    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
    }

    async findOverlappingAppointment(startAt: Date, endAt: Date): Promise<Appointment | null> {
        const overlappingAppointment = this.items.find(appointment => {
            return areIntervalsOverlapping(
                { start: appointment.startAt, end: appointment.endAt },
                { start: startAt, end: endAt },
                { inclusive: true }
            );
        },);

        if (!overlappingAppointment) {
            return null;
        }

        return overlappingAppointment;
    }
}