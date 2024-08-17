import { Injectable } from '@angular/core';
import { Status, UserRole } from '../utility/Enums';

@Injectable({
  providedIn: 'root',
})

export class AllEnumsService {
  public UserRole = UserRole;
  public Status = Status;

  constructor() {}
}
