import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent implements OnInit {
  public user: any;

  constructor() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
  }

  @ViewChild('space') space!: ElementRef;
  @ViewChild('block ') block!: ElementRef;
  @ViewChild('character') character!: ElementRef;

  counter = 0;
  jumping = 0;
  gameIsOver = true;
  gameInitial = true;
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
  }
  ngDoCheck() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
  }

  ngAfterViewInit() {
    const hole = this.space.nativeElement;
    const bird = this.character.nativeElement;
    const block = this.block.nativeElement;

    hole.addEventListener('animationiteration', () => {
      var random = -(Math.random() * 300 + 150);
      hole.style.top = random + 'px';
      this.counter++;
    });
    bird.style.top = '10px';
    this.gameStart(bird, block, hole);
  }

  countDown = setTimeout(() => {}, 100);
  ngOnDestroy() {
    if (this.countDown) {
      clearInterval(this.countDown);
    }
  }

  jump(bird: any) {
    this.jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(() => {
      var characterTop = parseInt(
        window.getComputedStyle(bird).getPropertyValue('top')
      );
      if (characterTop > 6 && jumpCount < 15) {
        bird.style.top = characterTop - 5 + 'px';
      }
      if (jumpCount > 20) {
        clearInterval(jumpInterval);
        this.jumping = 0;
        jumpCount = 0;
      }
      jumpCount++;
    }, 10);
  }

  gameStart(character: any, block: any, hole: any) {
    this.countDown = setInterval(() => {
      if (this.gameIsOver) {
        this.ngOnDestroy();
      }
      var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue('top')
      );
      if (this.jumping === 0 && !this.gameIsOver && characterTop < 480) {
        character.style.top = characterTop + 3 + 'px';
      }
      var blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue('left')
      );
      var holeTop = parseInt(
        window.getComputedStyle(hole).getPropertyValue('top')
      );
      var cTop = -(500 - characterTop);
      if (
        blockLeft < 20 &&
        blockLeft > -50 &&
        (cTop < holeTop || cTop > holeTop + 130)
      ) {
        this.gameIsOver = true;
        this.ngOnDestroy();
        character.style.top = cTop;
      }
    }, 10);
  }

  @HostListener('document:keydown.space', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    const character = this.character.nativeElement;
    this.jump(character);
  }

  onClickStart() {
    this.gameInitial = false;
    this.gameIsOver = !this.gameIsOver;
    if (this.gameIsOver === false) {
      this.counter = 0;
      this.ngAfterViewInit();
    }
  }
}
