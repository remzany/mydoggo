import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {PhotoGalleryService} from '../../services/photo-gallery.service';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-diagnose-add',
  templateUrl: './diagnose-add.component.html',
  styleUrls: ['./diagnose-add.component.scss'],
})
export class DiagnoseAddComponent implements OnInit {

  lastSelected_01:any = null;
  lastSelected_02:any = null;

  item:{title:string, description:string, image:boolean} = {title:"", description:"", image: false};
  selectedTag:string = "";

  imageItem: {display:string} = {display: "save"};
  diagnoseID: string;

  showCameraGalery: boolean = false;

  ImagePath = "";
  // galleryImage:any;
  
  isLoading = false;


  ngAfterViewInit(){
  }

  constructor(
    private renderer:Renderer2,
     private api:ApiService,
      private modal:ModalController,
      private file: File,
       private camera:Camera,
       private crop:Crop,
       private platform: Platform,
       private webview:WebView,
       private base64:Base64,
       private domSanitizer:DomSanitizer,
      public actionSheetController: ActionSheetController,
      private photoGalleryService: PhotoGalleryService) { }

  ngOnInit() {}

  click(ev:any){
    let x;

    if(ev.localName == "tspan"){
      let y = ev.id;
      y = y.substr(1);
      this.selectedTag = y;
      x =document.getElementById(y);
      this.renderer.setStyle(ev, 'fill', '#f00');
      this.renderer.setStyle(x, 'fill', '#f00');
    }else{
      this.selectedTag = ev.id;
      x =document.getElementById("_" + ev.id);
      this.renderer.setStyle(ev, 'fill', '#f00');
      this.renderer.setStyle(x, 'fill', '#f00');
    }

    if(this.lastSelected_01 != null && this.lastSelected_01 != ev && this.lastSelected_02 != ev){
      this.renderer.setStyle(this.lastSelected_01, 'fill', '#fff');

      if(this.lastSelected_01.localName == "tspan")
        this.renderer.setStyle(this.lastSelected_01, 'fill', '#000');

    }

    if(this.lastSelected_02 != null && this.lastSelected_01 != ev && this.lastSelected_02 != ev){
      this.renderer.setStyle(this.lastSelected_02, 'fill', '#fff');

      if(this.lastSelected_02.localName == "tspan")
        this.renderer.setStyle(this.lastSelected_02, 'fill', '#000');
    }

      

    this.lastSelected_01 = ev;
    this.lastSelected_02 = x;
    
  }

  save(){
    if(this.item.title == "" && this.item.title == null) return;
    if(this.item.description == "" && this.item.description == null) return;
    if(this.selectedTag == "" && this.selectedTag == null) return;

    if(this.item.image) this.showCameraGalery = true;
    else this.createDiagnose(this.item.title, this.item.description, this.selectedTag, "");
  }

  changeValue(){
    this.item.image != this.item.image;

    this.imageItem.display = this.item.image ? "next" : "save";

  }

  confirmImage(){
    this.createDiagnose(this.item.title, this.item.description, this.selectedTag, this.ImagePath)
  }
    
  createDiagnose(title, description, tag, image){
    this.api.createDiagnose(title, description, tag, image).subscribe(res => {
      this.diagnoseID = res._id;
      
      this.modal.dismiss();

    })
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA, 'camera');
        }
      },
      {
        text: 'Use Gallery',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, 'gallery');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  pickImage(sourceType, type) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 516,
      correctOrientation: true
    }
    
    if(type === "camera"){
      this.camera.getPicture(options).then((imageData) => {
        this.cropImage(imageData, 'camera')
  
      }, (err) => {
        // Handle error
      });
    }else{
      this.openGallery();
    }

  }

  public openGallery() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum:false,
      targetWidth: 516,
      correctOrientation: true
    }; this.camera.getPicture(options).then((fileUri) => {
      this.ImagePath = "data:image/jpeg;base64," + fileUri;
    });
  }


  cropImage(url: string, source: string) {
    this.crop.crop(url, { quality: 100, targetWidth: -1, targetHeight: -1 })
      .then(
        newImage => {
          console.log('new image path is: ' + newImage);
          if(source === 'camera') this.showImage(newImage);
        },
        error => alert(JSON.stringify(error))
      );
  }

  // setGalleryImage(newImage: string) {
  //   if (this.platform.is('ios')) {
  //     newImage = this.webview.convertFileSrc(newImage);
  //   }
  //   this.base64.encodeFile(newImage).then((base64File: string) => {
  //     const imageSrc = base64File.split(',');
  //     this.galleryImage =
  //       this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' +
  //         imageSrc[1]);
  //   });
  // } 

  showImage(ImagePath) {
    this.isLoading = true;
    const copyPath = ImagePath;
    const splitPath = copyPath.split('/');
    const imageName = splitPath[splitPath.length - 1].split("?")[0];
    const filePath = ImagePath.split(imageName)[0];
    
    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.ImagePath = base64;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });

  }
}
