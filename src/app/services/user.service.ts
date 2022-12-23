import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable, of, Subject } from 'rxjs';
require('firebase/compat/auth')

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: firebase.User = null;
  public currentUserChange: Subject<firebase.User> = new Subject<firebase.User>();
  public hasReachedDB: boolean = false;

  constructor() {
    const _this = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        _this.currentUser = user;
        _this.currentUserChange.next(_this.currentUser);
      } else {
        _this.currentUser = null;
        _this.currentUserChange.next(_this.currentUser);
      }
      _this.hasReachedDB = true;
    });
  }

  public getUser(): Observable<firebase.User> {
    if (this.hasReachedDB) {
      return of(this.currentUser);
    }
    else {
      return this.currentUserChange;
    }
  }

  public signOut() {
    const _this = this;
    firebase.auth().signOut()
    .then(() => {
      this.currentUser = null;
    })
  }
}
