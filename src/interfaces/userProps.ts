export interface UserProps {
    id: string;
    fullname: string;
    email: string;
    status: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
}

export interface UserRegisterProps {
    name: string;
    email: string;
    password: string;
}
