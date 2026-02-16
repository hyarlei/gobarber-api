import { describe, expect, it } from 'vitest';
import { getFutureDate } from '../../test/utils/get-future-date';
import { Appointment } from '../entities/appointment';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments';
import { CreateAppointment } from './create-appointment';

describe('Create Appointment', () => {
    it('should be able to create an appointment', async () => {
        const startAt = getFutureDate('2024-01-10');
        const endAt = getFutureDate('2024-01-11');

        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(
            appointmentsRepository
        );

        await expect(createAppointment.execute({
            customer: 'John Doe',
            provider: 'Jane Doe',
            startAt,
            endAt,
        })).resolves.toBeInstanceOf(Appointment);
    });

    it('should not be able to create an appointment with overlapping dates', async () => {
        const startAt = getFutureDate('2024-01-10');
        const endAt = getFutureDate('2024-01-15');
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(
            appointmentsRepository
        );

        await createAppointment.execute({
            customer: 'John Doe',
            provider: 'Jane Doe',
            startAt,
            endAt,
        });

        await expect(createAppointment.execute({
            customer: 'John Doe',
            provider: 'Jane Doe',
            startAt: getFutureDate('2024-01-14'),
            endAt: getFutureDate('2024-01-18'),
        })).rejects.toBeInstanceOf(Error);

        await expect(createAppointment.execute({
            customer: 'John Doe',
            provider: 'Jane Doe',
            startAt: getFutureDate('2024-01-08'),
            endAt: getFutureDate('2024-01-12'),
        })).rejects.toBeInstanceOf(Error);

        await expect(createAppointment.execute({
            customer: 'John Doe',
            provider: 'Jane Doe',
            startAt: getFutureDate('2024-01-08'),
            endAt: getFutureDate('2024-01-17'),
        })).rejects.toBeInstanceOf(Error);

        await expect(createAppointment.execute({
            customer: 'John Doe',
            provider: 'Jane Doe',
            startAt: getFutureDate('2024-01-11'),
            endAt: getFutureDate('2024-01-12'),
        })).rejects.toBeInstanceOf(Error);
    });
});