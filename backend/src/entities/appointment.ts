import { randomUUID } from "crypto";

export interface AppointmentProps {
  customer: string;
  provider: string;
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

  get provider() {
    return this.props.provider;
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

    if (!props.provider || props.provider.trim() === '') {
      throw new Error('Provider is required');
    }

    if (duration < 30 * 60 * 1000) {
      throw new Error('Appointment must be at least 30 minutes long')
    }

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }
}