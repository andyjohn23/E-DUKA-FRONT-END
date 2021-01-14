import { Profile } from './profile';

export class User {
    id:number;
    token: string;
    auth: boolean;
    access: string;
    email: string;
    firstname: string;
    lastname: string;
    role: boolean;
    profile: Profile;
}
