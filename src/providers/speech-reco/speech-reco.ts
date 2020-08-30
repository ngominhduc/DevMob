import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
/*
  Generated class for the SpeechRecoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeechRecoProvider {

  speechText: String;
  options = {
    language: 'en-US',
  }

  constructor(
    public http: HttpClient,
    public speechRecognition: SpeechRecognition
  ) {
    console.log('Hello SpeechRecoProvider Provider');
  }

  checkPermission() {
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))

    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission().then(
            () => console.log('Granted'),
            () => console.log('Denied')
          )
        }
      })
  }

  startListening() {
    this.checkPermission();

    return new Promise<string>(resolve =>
      this.speechRecognition.startListening(this.options)
        .subscribe((matches: string[]) => {
          if (matches && matches.length > 0) {
            return resolve(matches[0])
          }
        },
          (onerror) => console.log('error:', onerror)
        )
    );
  }

  stopListening() {
    this.speechRecognition.stopListening();
  }
}
