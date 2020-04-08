import { Trucks } from './Trucks';
import { Loads } from './Loads';

export class User {
    email:string;
    password:string;
    name:string;
    surname: string;
    username: string;
    options: string;
    role: string;
    loads: Loads[];
    trucks: Trucks[];
}
