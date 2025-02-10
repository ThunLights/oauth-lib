import WebSocket from "ws";
import { HttpClient } from "./HttpClient/index";

export type Auth = {
    readonly application: string
    readonly secretKey: string
}

export class ThunLights {
    private readonly ws = new WebSocket("wss://oauth.thunlights.com");

    public readonly request: HttpClient;

    constructor(public readonly auth: Auth) {
        this.request = new HttpClient(auth.application, auth.secretKey);
    }
}

export { OauthError } from "./HttpClient/HttpClient.error";
