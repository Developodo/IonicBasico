import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private todo: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private noteS:NotesService,
    private uiS:UiService
  ) {
    this.todo = this.formBuilder.group({
      title :['',[Validators.required,
                  Validators.minLength(5)]],
      description : ['']
    })
  }
  public async logForm(){
    if(!this.todo.valid) return;
    await this.uiS.showLoading();
    try{
      await this.noteS.addNote({
        title:this.todo.get('title').value,
        description:this.todo.get('description').value
      });
      this.todo.reset("");
      this.uiS.showToast("¡Nota insertada correctamente!");
    }catch(err){
      console.error(err);
      this.uiS.showToast(" Algo ha ido mal ;( ","danger");
    } finally{
      this.uiS.hideLoading();
    }
    
    
  }

}
