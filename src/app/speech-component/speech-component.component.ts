import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from 'src/service/VoiceRecognitionService ';

@Component({
  selector: 'app-speech-component',
  templateUrl: './speech-component.component.html',
  styleUrls: ['./speech-component.component.scss']
})
export class SpeechComponent implements OnInit {
  textToShow: string = ''
  tempWords: string = '';
  robot = new SpeechSynthesisUtterance();
  voices = speechSynthesis.getVoices()
  //voices = window.speechSynthesis.getVoices();
  constructor(public readonly voiceRecognitionService: VoiceRecognitionService) {

  }

  ngOnInit(): void {
    var text = this.voiceRecognitionService.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      this.voiceRecognitionService.translate(transcript).subscribe((x: any) => {
        this.speak(x);
      })
    });

  }

  speak(text: any) {
    this.robot.text = text.translatedText;
    this.voices = speechSynthesis.getVoices()
    this.voices.map(x => {
        if (x.name === "Google UK English Male") {
          this.robot.voice = x
        }
      })
    speechSynthesis.speak(this.robot)
  }

  start() {
    this.voiceRecognitionService.start();
  }

  stop() {
    this.voiceRecognitionService.stop();
  }

}