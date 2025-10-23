// Types definitions shared between FE and BE
//
// --- Base types (From Tables) ---

/**
 * Defined roles into the DB for the auth.
 * Aligned to schema.sql
 */
export type UserRoleName = 'GiovaneAISM' | 'UserNonGiovaneAISM' | 'AdminAISM' | 'Teacher';

/**
 * Visibility types in the DB.
*/
export type PostVisibility = 'public' | 'young_only' | 'admin_docente_only';

// --- Users Types ---

/**
 * Interface which mdels the User Object sended to FE (excluding personl info).
 */

export interface IUserProfile {
    user_id: string;
    username: string;
    email: string;
    role: UserRoleName; // UI role's name
    is_verified: boolean;
}

/**
 * Entering Login payload Interface (DTO).
 */
export interface ILoginPayload {
    email: string;
    password: string;
}


/**
 * Token JWT Interface (Decoded Payload).
 */
export interface IAuthTokenPayload {
    user_id: string;
    role_name: UserRoleName;
    exp: number;
}


// --- Blog Posts Types ---

/**
 * Blog Post Interface sended to FE (with united/filled data).
 */
export interface ICLientBlogPost {
    post_id: number;
    title: string;
    summary: string;
    content?: string; // Optional
    author_username: string;
    category_name: string;
    created_at: string;
    is_reserved: boolean;
    visibility: PostVisibility;
}

// --- Chat's Types (Initial) ---

export interface IMessage {
    message_id: string;
    sender_id: string;
    sender_username: string;
    content: string;
    timestamp: Date;
    channel_id: string;
}