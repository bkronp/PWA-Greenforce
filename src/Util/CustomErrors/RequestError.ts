import {RequestErrorParams} from "./@types";

class RequestError extends Error {
    label: string;
    status: number;
    info: Object;

    constructor(parameters : RequestErrorParams, ...params: any) {
        super(...params)
        
        if (Error.captureStackTrace) {
        Error.captureStackTrace(this, RequestError)
        }

        this.message = parameters.message;
        this.status = parameters.status;
        this.label = parameters.label || '';
        this.info = parameters.info || {};
    }
}

export default RequestError;