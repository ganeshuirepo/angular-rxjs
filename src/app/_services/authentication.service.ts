import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor() { }

}