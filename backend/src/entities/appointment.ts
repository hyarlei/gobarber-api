import { randomUUID } from "crypto";

export interface AppointmentProps {
  customer: string;
  startAt: Date;
  endAt: Date;
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

  get startAt() {
    return this.props.startAt;
  }

  get endAt() {
    return this.props.endAt;
  }

  constructor(props: AppointmentProps, id?: string) {
    const { startAt, endAt } = props;

    // Validações
    if (startAt <= new Date()) {
      throw new Error('Invalid start date');
    }

    if (endAt <= startAt) {
      throw new Error('Invalid end date');
    }

    // Atribuições
    this._id = id ?? randomUUID();
    this.props = props;
  }
}