import { Injectable } from '@angular/core';
import { Constants } from '../models/app.constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  Users: User[] = [
    {id: 1, userName: "Hero", password: "xyz#9876", isLoggedIn: false},
    {id: 2, userName: "Louis", password: "xyz#6789", isLoggedIn: false}
  ]

  constructor() { }

  getUsers(): User[] {
    return this.Users;
  }

  login(userName: String, password: String): boolean {
    if(this.getUsers().filter(x => x.userName === userName && x.password === password).length === 1)
      return true;
    else
      return false;
  }
}
