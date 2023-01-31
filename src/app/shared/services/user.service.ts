import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CollectionReference, doc, docData, DocumentData, Firestore, setDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collectionName = "Users";
  private userCollection: CollectionReference<DocumentData>
  
  constructor(private firestore: Firestore, private auth: Auth) { 
    this.userCollection = collection(this.firestore, this.collectionName)
  }

  
  public createUser(user: User, id: string) {
    const userRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return setDoc(userRef, user);
  }

  public getCurrentUser(): Observable<User>{
  const id = this.auth.currentUser?.uid;
  const userDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
  return docData(userDocRef, {idField: 'id', }) as Observable<User>
}
}
