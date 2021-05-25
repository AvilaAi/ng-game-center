import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'],
})
export class PianoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  playAudio() {
    var audio = new Audio('../../assets/audios/c3.mp3');
    audio.play();
  }
}
