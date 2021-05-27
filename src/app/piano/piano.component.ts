import { Component, HostListener, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'],
})
export class PianoComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  notes = [
    { note: 'c', keyCode: 67, src: '../../assets/audios/g2.mp3' },
    { note: 'v', keyCode: 86, src: '../../assets/audios/g22.mp3' },
    { note: 'a', keyCode: 65, src: '../../assets/audios/a2.mp3' },
    { note: 'z', keyCode: 90, src: '../../assets/audios/a22.mp3' },
    { note: 'q', keyCode: 81, src: '../../assets/audios/b2.mp3' },
    { note: 's', keyCode: 83, src: '../../assets/audios/c3.mp3' },
    { note: 'e', keyCode: 69, src: '../../assets/audios/c33.mp3' },
    { note: 'd', keyCode: 68, src: '../../assets/audios/d3.mp3' },
    { note: 'r', keyCode: 82, src: '../../assets/audios/d33.mp3' },
    { note: 'f', keyCode: 70, src: '../../assets/audios/e3.mp3' },
    { note: 'g', keyCode: 71, src: '../../assets/audios/f3.mp3' },
    { note: 'y', keyCode: 89, src: '../../assets/audios/f33.mp3' },
    { note: 'h', keyCode: 72, src: '../../assets/audios/g3.mp3' },
    { note: 'u', keyCode: 85, src: '../../assets/audios/g33.mp3' },
    { note: 'j', keyCode: 74, src: '../../assets/audios/a3.mp3' },
    { note: 'i', keyCode: 73, src: '../../assets/audios/a33.mp3' },
    { note: 'k', keyCode: 75, src: '../../assets/audios/b3.mp3' },
    { note: 'l', keyCode: 76, src: '../../assets/audios/c4.mp3' },
  ];

  isPlayOnKey = false;
  tips = [
    { name: ' 💡 Tips', value: 'ghjgl jhlh gdj gf gfdfghsg hjiijhgh' },
    {
      name: ' 🌸 Upon the journey',
      value: 'ghjgl jhlh gdd fgs sdfghsg hjiijhgg',
    },
    {
      name: ' 🌀 Aoi aoi ano sora',
      value: 'sghu h g sghuuiuil sghu h g gli gli rrgg',
    },
    {
      name: ' 🧹 Wingardium leviosaaaa',
      value: 'adgfd jh f dgfera adgfd jl ki yijua gd',
    },
    {
      name: ' 👑 Winter is comming',
      value: 'lruilril irhuirhi usghushu hsrghsrg rvsdrvdr gzdrgzrd shuilhuil',
    },
  ];
  tipActive = this.tips[1].value.split('');

  playAudio(n: any) {
    var audio = new Audio(n.src);
    audio.play();
    var keyPlayed = this.el.nativeElement.querySelector('#' + n.note);
    var vol = this.el.nativeElement.querySelector('#volumRange');
    vol = (vol.value / 100).toFixed(1);
    audio.volume = vol;
    keyPlayed.classList.add('playing');
    setTimeout(() => {
      keyPlayed.classList.remove('playing');
    }, 400);
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    const target = this.notes.find((obj) => {
      return obj.keyCode === event.keyCode;
    });
    target && this.playAudio(target);

    if (this.isPlayOnKey) {
      if (target && target.note === this.tipActive[this.initId]) {
        this.initId++;
        if (this.tipActive[this.initId] === ' ') {
          this.initId++;
        }
        if (this.initId >= this.tipActive.length) {
          this.initId = 0;
        }
      }
    }
  }
  initId = 0;

  playOnKeyboard(tipId: any) {
    this.initId = 0;
    this.tipActive = this.tips[tipId].value.split('');
    this.isPlayOnKey = true;
  }
}
