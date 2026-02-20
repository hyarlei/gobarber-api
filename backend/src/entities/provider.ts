import crypto from 'crypto';

export interface ProviderProps {
    name: string;
    email: string;
    phone?: string;
}

export class Provider {
    private _id: string;
    private props: ProviderProps;

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

    constructor(props: ProviderProps, id?: string) {
        if (!props.name || props.name.trim() === '') {
            throw new Error('Name is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!props.email || props.email.trim() === '') {
            throw new Error('Email is required');
        }
        if (!emailRegex.test(props.email)) {
            throw new Error('Invalid email format');
        }

        this._id = id || crypto.randomUUID();
        this.props = props;
    }
}