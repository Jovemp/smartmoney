import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryDaoProvider } from '../../providers/category-dao/category-dao';
import { AccountProvider } from '../../providers/account/account';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';


@IonicPage()
@Component({
  selector: 'page-new-entry',
  templateUrl: 'new-entry.html',
})
export class NewEntryPage {
  categories = [];
  entryForm: FormGroup;
  currentBalance: number = 0;

  entry = {}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private builder: FormBuilder,
    public categoryDao: CategoryDaoProvider,
    public account: AccountProvider,
    public geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public dataPicker: DatePicker) {
    this.entryForm = builder.group({
      amount: new FormControl('', Validators.compose([Validators.required])),
      category_id: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    const entryId = this.navParams.get("entryId");
    this.loadData(entryId);
  }

  submitForm() {
    console.log('Submit Form');
    console.log(JSON.stringify(this.entry));
    // rotina do bd
    this.insertBD();
    this.goBack();
  }

  goBack() {
    console.log('Go Back');
    // sair sem fazer nada
    this.navCtrl.pop();
  }

  insertBD() {
    console.log('Inicio da gravação do BD');
    const amount = this.entry['amount'];
    const categoryId = this.entry['category_id'];
    const latitude = this.entry['latitude'];
    const longitude = this.entry['longitude'];
    const address = this.entry['address'];
    const image = this.entry['image'];
    const description = this.entry['description'];
    const entryAt = this.entry['entry_at'];
    this.account.addEntry(amount, categoryId, latitude, longitude, address, image, description, entryAt)
      .then(() => console.log('insert realizado com sucesso'))
  }

  loadData(entryId = null) {
    if (entryId > 0) {
      this.loadEntry(entryId);
    }

    this.categoryDao.getAll()
      .then((categories: any[]) => {
        this.categories = categories;
      });
    this.account
      .loadBalance()
      .then((balance) => this.currentBalance = balance);
  }

  loadEntry(entryId) {
    
  }

  openDateModel() {
    this.dataPicker.show({
      date: this.entry['entry_at'] ? new Date(this.entry['entry_at']) : new Date(),
      mode: 'datetime',
      titleText: 'Selecione uma data',
      okText: 'Ok',
      cancelText: 'Cancelar',
      todayText: 'Hoje',
      nowText: 'Agora',
      locale: 'pt_BR',
      is24Hour: true,
      androidTheme: this.dataPicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    }).then(date => {
      this.entry['entry_at'] = date;
    });
  }

  openDescriptionModal() {
    let prompt = this.alertCtrl.create({
      title: 'Descrição'
    });
    prompt.addInput({
      name: 'description',
      placeholder: '',
      value: this.entry['description']
    });
    prompt.addButton('Cancelar');
    prompt.addButton({
      text: 'OK',
      handler: (data) => {
        this.entry['description'] = data['description'];
      }
    })
    prompt.present();
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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.entry['image'] = base64Image;
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Erro de câmera',
        subTitle: `Não foi possivel abrir sua câmera, por favor, verifique se já deu permissão.`,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  openGeoLocationModal() {

    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    loading.present();

    let nativeGeoCoderoptions: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };

    this.geolocation.getCurrentPosition().then((geocode) => {
      const latitude = geocode.coords.latitude;
      const longitude = geocode.coords.longitude;

      this.nativeGeocoder.reverseGeocode(latitude, longitude, nativeGeoCoderoptions)
        .then((result: NativeGeocoderReverseResult[]) => {
          loading.dismiss();

          if (result.length > 0) {
            const locality = result[0].subLocality;
            const address = result[0].thoroughfare;
            const number = result[0].subThoroughfare;
            let completeAddress = `${address}, ${number} - ${locality}`;

            let alert = this.alertCtrl.create({
              title: 'Usar esta localização',
              cssClass: 'custom-alert',
              subTitle: completeAddress
            });
            alert.addButton('Não')
            alert.addButton({
              text: 'Sim',
              handler: () => {
                this.entry['latitude'] = latitude;
                this.entry['longitude'] = longitude;
                this.entry['address'] = completeAddress;
              }
            })
            alert.present();
          } else {
            let alert = this.alertCtrl.create({
              title: 'Erro de localização',
              subTitle: `Não foi possivel encontrar o endereço desta localização.`,
              buttons: ['OK']
            });
            alert.present();
          }
        })
        .catch((error: any) => console.log(error));
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Erro',
        subTitle: `Erro ao capturar a localização, por favor, certifique-se que o GPS esta ligado.`,
        buttons: ['OK']
      });
      alert.present();
    });
  }


}
