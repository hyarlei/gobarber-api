import crypto from 'crypto';

export interface ServiceProps {
    name: string;
    description?: string;
    price: number;
    duration: number;
    isActive?: boolean;
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

    get description() {
        return this.props.description ?? null;
    }

    get price() {
        return this.props.price;
    }

    get duration() {
        return this.props.duration;
    }

    get isActive() {
        return this.props.isActive;
    }

    constructor(props: ServiceProps, id?: string) {
        if (!props.name || props.name.trim() === '') {
            throw new Error('Name is required');
        }
        
        if (props.price <= 0) {
            throw new Error('Price must be greater than zero');
        }

        if (props.duration <= 0) {
            throw new Error('Duration must be greater than zero');
        }

        this._id = id || crypto.randomUUID();
        this.props = {
            ...props,
            isActive: props.isActive ?? true,
        };
    }
}