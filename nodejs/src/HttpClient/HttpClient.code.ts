import { HttpClientBase } from "./HttpClient.base";
import { OauthError } from "./HttpClient.error";

type ResponseData = {
    accessToken: string
    refreshToken: string
}

export class Code extends HttpClientBase {
    public async verify(code: string): Promise<ResponseData | OauthError> {
        try {
            const response = await fetch(`https://oauth.thunlights.com/check/code/${code}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    application: this.applicationId,
                    secret: this.secretKey,
                }),
            });
            if (response.status === 200) {
                return await response.json();
            }
            if (response.status === 400) {
                const { content } = await response.json();
                return new OauthError(content, { status: 400 });
            }

            return new OauthError("ERR", { status: response.status });
        } catch (error) {
            return new OauthError("ERR");
        }
    }
}
