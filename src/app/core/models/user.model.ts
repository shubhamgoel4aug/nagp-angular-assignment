export class User {
    id: number;
    userName: String;
    password: String;
    isLoggedIn: boolean

    constructor(id: number, name: String, password: String, isLoggedIn: boolean){
        this.id = id;
        this.userName = name;
        this.password = password;
        this.isLoggedIn = isLoggedIn;
    }
}
