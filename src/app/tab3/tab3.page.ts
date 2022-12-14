import { Component, ElementRef, ViewChild } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonImg } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('foto') foto:IonImg;
  constructor() {}

  public async hazfoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,

    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    let imageUrl = image.webPath;
  
    // Can be set to the src of an image now

    this.foto.src = imageUrl;
  }

}
