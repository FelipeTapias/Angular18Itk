interface ResponseHttp {
    httpStatusCode: number;
}

export interface SessionsResponse extends ResponseHttp{
    contentResult: string;
}