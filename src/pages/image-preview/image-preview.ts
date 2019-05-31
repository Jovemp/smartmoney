import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ImagePreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-preview',
  templateUrl: 'image-preview.html',
})
export class ImagePreviewPage {

  image;
  newImage;

  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public camera: Camera) {
    this.image = window['Ionic']['WebView'].convertFileSrc(navParams.get('image'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagePreviewPage');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  openCameraModal() {
    const options: CameraOptions = {
      quality: 50,
      correctOrientation: true,
      allowEdit: true,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = window['Ionic']['WebView'].convertFileSrc(imageData);
      this.newImage  = imageData;
    }, (err) => {
    });
  }

  save() {
    this.dismiss({ image: this.newImage });
  }

}
