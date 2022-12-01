import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { NotesService } from './services/notes.service';
import { UiService } from './services/ui.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NotesService,
    UiService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
