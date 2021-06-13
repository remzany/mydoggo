import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoGalleryService {

  ImagePath = "";
  constructor(private camera:Camera) { }

  public openGallery() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true
    };

    let x = this.camera.getPicture(options).then((fileUri) => {
      let url = "data:image/jpeg;base64," + fileUri;
      return url;
    });

    return x;
  }

}
