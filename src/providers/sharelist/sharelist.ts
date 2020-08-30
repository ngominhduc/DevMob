import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../../model/TodoList';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
/*
  Generated class for the ListProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharelistProvider {
  todoCollectionRef: AngularFirestoreCollection<TodoList>;
  todo: Observable<TodoList[]>;
  list: Observable<TodoList[]>;
  constructor(public http: HttpClient, public angularFire: AngularFirestore) {
   this.todoCollectionRef = this.angularFire.collection<TodoList>('lists');
   this.list = this.todoCollectionRef.snapshotChanges().pipe(
     map(actions => actions.map(a => {
      const data = a.payload.doc.data() as TodoList;
      const id = a.payload.doc.id;
      return { id, ...data };
     }))
   )
  }

  getList() {
    return this.list;
  }

  insertList(list: TodoList){
      this.todoCollectionRef.add(list).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    });
  }

  sharelist(id: any, data:any){
    this.todoCollectionRef.doc(id).update({
      shareto : firebase.firestore.FieldValue.arrayUnion(data)
    })
  }

  deletesharedlist(id: any, data:any){
    this.todoCollectionRef.doc(id).update({
      shareto : firebase.firestore.FieldValue.arrayRemove(data)
    })
  }

  updateList(id: any, data:any) {
    this.todoCollectionRef.doc(id).update({
      "name" : data.name
    });
  }
  
  deleteList(id: any) {
    this.todoCollectionRef.doc(id).delete();
    console.log('delete sucess list with id ' + id);
  }
}
