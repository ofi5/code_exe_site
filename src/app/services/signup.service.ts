import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Signup } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private dbPath = '/members';

  membersRef: AngularFireList<Signup>;

  constructor(private db: AngularFireDatabase) {
    this.membersRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Signup> {
    return this.membersRef;
  }

  create(signup: Signup): any {
    return this.membersRef.push(signup);
  }

}
