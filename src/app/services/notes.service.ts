import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  DocumentSnapshot,Query, QueryDocumentSnapshot
} from '@angular/fire/compat/firestore'
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private lastDoc : QueryDocumentSnapshot<any>;
  private dbPath: string = 'notes';
  private dbRef: AngularFirestoreCollection<any>
  constructor(private db: AngularFirestore) {
    this.dbRef = this.db.collection(this.dbPath);
  }
  /**
   * @param note nota sin id para ser insertada
   * @returns nota con el id creado
   */
  public async addNote(note: Note): Promise<Note> {
      const { id, ...n } = note;
      let newNote = await this.dbRef.add(n);
      note.id = newNote.id
      return note;
  }
  public removeNote(id): Promise<void> {
    return this.dbRef.doc(id).delete();
  }
 
  public async getNotesByContent(word):Promise<Note[]> {
    if(!word) return;
    let notes:Note[] = []
    let r;

      this.lastDoc = null;
      r = await this.dbRef.ref.orderBy('title').startAt(word).endAt(word+'\uf8ff').get();

    r.docs.forEach(d=>{
      this.lastDoc = d;
      notes.push({id:d.id,...d.data()});
    })
    return notes;
  }

  public async getNotes(refreshing?:boolean):Promise<Note[]> {
    let notes:Note[] = []
    let r;
    if(refreshing || this.lastDoc == null){
      this.lastDoc = null;
      r = await this.dbRef.ref.orderBy('title','desc')
              .limit(10).get();
    }else{
      r = await this.dbRef.ref.orderBy('title','desc')
              .startAfter(this.lastDoc)
              .limit(10).get();
    }
    r.docs.forEach(d=>{
      this.lastDoc = d;
      notes.push({id:d.id,...d.data()});
    })
    return notes;
  }

  public async getNote(id): Promise<Note> {
        let n = await this.dbRef.doc(id).get().toPromise();
        return {id:n.id,...n.data()};
  }

  public async updateNote(note):Promise<void> {
    if(!note.id) return;
    const {id,...n} = note;
    await this.dbRef.doc(note.id).set(n);
  }
}
