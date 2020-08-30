import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../../model/TodoList';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
/*
  Generated class for the ListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListProvider {

  todoCollectionRef: AngularFirestoreCollection<TodoList>;
  todo: Observable<TodoList[]>;
  list: Observable<TodoList[]>;
  userEmail: any;

  constructor(public http: HttpClient, public angularFire: AngularFirestore, public afAuth: AngularFireAuth) {
    if (this.afAuth.auth.currentUser) {
      this.userEmail = this.afAuth.auth.currentUser.email;
      this.todoCollectionRef = this.angularFire.collection<TodoList>('users/'+ this.userEmail +'/lists');
      console.log("your email for list provider", this.afAuth.auth.currentUser.email);
    }
    else {
      console.log("you need login first");
      this.todoCollectionRef = this.angularFire.collection<TodoList>('/lists');
    }
    this.todoCollectionRef.valueChanges();
  }

  getList() {
    this.list = this.todoCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TodoList;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
    return this.list;
  }

  insertList(list: TodoList) {
    this.todoCollectionRef.add(list).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    });
  }

  updateList(id: any, name: string) {
    this.todoCollectionRef.doc(id).update({
      "name": name,
    });
  }

  updateListImage(id: any, imgURL: string) {
    this.todoCollectionRef.doc(id).update({
      "imgURL": imgURL,
    });
  }

  deleteList(id: any) {
    this.todoCollectionRef.doc(id).delete();
    console.log('delete sucess list with id ' + id);
  }
}
