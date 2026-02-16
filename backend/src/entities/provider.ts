import crypto from 'crypto';

export interface ServiceProps {
    name: string; 
    email: string;
    phone?: string;
}

export class Service {
    private _id: string;
    private props: ServiceProps;

    get id() {
        return this._id;
    }

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get phone() {
        return this.props.phone
    }

    constructor(props: ServiceProps, id?: string) {
        if (!props.name || props.name.trim() === '') {
            throw new Error('Name is required');
        }

        if (!props.email || props.email.trim() === '') {
            throw new Error('Email is required');
        }

        this._id = id || crypto.randomUUID();
        this.props = props;
    }
}