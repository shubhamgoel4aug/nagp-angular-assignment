import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    let users = service.getUsers(); 
    expect(users.length).toBeGreaterThan(0);
  });

  it('valid login', () => {
    let login = service.login("Hero", "xyz#9876"); 
    expect(login).toEqual(true);
  });

  it('invalid login', () => {
    let login = service.login("Hero", "xy#9876");
    expect(login).toEqual(false);
  });
});
