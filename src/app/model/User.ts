export class User {
    email: string;
    password: string;
    name: string;
    birthday !: string;
    role: string;

    constructor(email: string, password: string, name: string, birthday: string, role: string) {

        this.email = email;
        this.password = password;
        this.name = name;
        this.birthday = birthday;
        this.role = role;

    }




}