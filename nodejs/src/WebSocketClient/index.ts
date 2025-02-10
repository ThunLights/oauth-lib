import { EventEmitter } from "events";

import { ResponseData as CodeApiResponse } from "../HttpClient/HttpClient.code";
import { ResponseData as AccessTokenApiResponse } from "../HttpClient/HttpClient.accessToken";
import { ResponseData as RefreshTokenApiResponse } from "../HttpClient/HttpClient.refreshToken";

import type StrictEventEmitter from "strict-event-emitter-types";
import type WebSocket from "ws";
import type { Auth } from "../index";

const event = EventEmitter as {
    new(): StrictEventEmitter<EventEmitter, {
        error: (content: string) => void
        welcome: (content: string) => void
        code: (content: CodeApiResponse) => void
        accessToken: (content: AccessTokenApiResponse) => void
        refreshToken: (content: RefreshTokenApiResponse) => void
    }>
};

export class WebSocketClient extends event {
    constructor(public readonly ws: WebSocket, public readonly auth: Auth) {
        super();
    }
}
