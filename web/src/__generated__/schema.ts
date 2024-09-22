export interface paths {
    "/auth/sign-in": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_signIn"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sign-in/refresh-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthController_signInRefreshToken"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sign-out": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_signOut"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/conversations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ConversationsController_conversations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/messages/{conversationId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["MessagesController_messages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invitations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["InvitationsController_recievedInvitations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        SignInDTO: {
            code: string;
        };
        UserDTO: {
            id: string;
            username: string;
            email: string;
            profilePicture: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        SignInResponseDTO: {
            user: components["schemas"]["UserDTO"];
            accessToken: string;
        };
        ApiExcpetion: {
            /** @enum {string} */
            message: "NO_TOKEN" | "INVALID_OAUTH_TOKEN" | "INVALID_TOKEN";
            statusCode: number;
        };
        SignInRefreshTokenResponseDTO: {
            user: components["schemas"]["UserDTO"];
            accessToken: string;
        };
        UserPublicDTO: {
            id: string;
            username: string;
            profilePicture: string;
        };
        ConversationUserDTO: {
            user: components["schemas"]["UserPublicDTO"];
        };
        ConversationDTO: {
            id: string;
            /** Format: date-time */
            createdAt: string;
            conversationUsers: components["schemas"]["ConversationUserDTO"][];
        };
        MessageDTO: {
            id: string;
            text: string;
            isDeleted: boolean;
            /** Format: date-time */
            createdAt: string;
            user: components["schemas"]["UserPublicDTO"];
        };
        InvitationDTO: {
            id: string;
            /** Format: date-time */
            createdAt: string;
            fromUser: components["schemas"]["UserPublicDTO"];
            toUser: components["schemas"]["UserPublicDTO"];
        };
        SendMessageDTO: {
            text: string;
            to: string;
        };
        SendMessageEvent: {
            /** @enum {string} */
            messageType: "SEND_MESSAGE";
            dtoPayload: components["schemas"]["SendMessageDTO"];
            responsePayload: components["schemas"]["MessageDTO"];
        };
        IncomingMessageEvent: {
            /** @enum {string} */
            messageType: "INCOMING_MESSAGE";
            dtoPayload: components["schemas"]["MessageDTO"];
        };
        WsAuthPayload: {
            accessToken: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AuthController_signIn: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SignInDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SignInResponseDTO"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiExcpetion"];
                };
            };
        };
    };
    AuthController_signInRefreshToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SignInRefreshTokenResponseDTO"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiExcpetion"];
                };
            };
        };
    };
    AuthController_signOut: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ConversationsController_conversations: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConversationDTO"][];
                };
            };
        };
    };
    MessagesController_messages: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conversationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageDTO"][];
                };
            };
        };
    };
    InvitationsController_recievedInvitations: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvitationDTO"][];
                };
            };
        };
    };
}
