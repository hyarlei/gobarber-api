import crypto from 'crypto';

export interface AppointmentProps {
  customer: string;
  providerId: string;
  serviceId: string;
  notes?: string;
  startAt: Date;
  endAt: Date;
  createdAt?: Date;
  canceledAt?: Date;
}

export class Appointment {
  private _id: string;
  private props: AppointmentProps;

  get id() {
    return this._id;
  }

  get customer() {
    return this.props.customer;
  }

  get providerId() {
    return this.props.providerId;
  }

  get serviceId() {
    return this.props.serviceId;
  }

  get notes() {
    return this.props.notes || null;
  }

  get startAt() {
    return this.props.startAt;
  }

  get endAt() {
    return this.props.endAt;
  }

  get createdAt() {
    return this.props.createdAt || null;
  }

  get canceledAt() {
    return this.props.canceledAt || null;
  }

  constructor(props: AppointmentProps, id?: string) {
    const { startAt, endAt } = props;
    const duration = endAt.getTime() - startAt.getTime();

    if (startAt <= new Date()) {
      throw new Error('Invalid start date');
    }

    if (endAt <= startAt) {
      throw new Error('Invalid end date');
    }

    if (!props.customer || props.customer.trim() === '') {
      throw new Error('Customer is required');
    }

    if (duration < 30 * 60 * 1000) {
      throw new Error('Appointment must be at least 30 minutes long')
    }

    if (!props.providerId || props.providerId.trim() === '') {
      throw new Error('Provider ID is required');
    }

    if (!props.serviceId || props.serviceId.trim() === '') {
      throw new Error('Service ID is required');
    }

    this._id = id || crypto.randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }
}