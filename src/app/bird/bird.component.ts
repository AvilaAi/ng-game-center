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

  @ViewChild('character') character!: ElementRef;
  @ViewChild('wall') wall!: ElementRef;
  @ViewChild('wallTop') wallTop!: ElementRef;
  @ViewChild('star') star!: ElementRef;

  counter = 0;
  jumping = 0;
  gameIsOver = true;
  gameInitial = true;
  isGetStar = false;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
  }
  ngDoCheck() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
  }

  ngAfterViewInit() {
    const bird = this.character.nativeElement;
    const wall = this.wall.nativeElement;
    const wallTop = this.wallTop.nativeElement;
    const star = this.star.nativeElement;

    wall.addEventListener('animationiteration', () => {
      var random = Math.random() * 200 + 100;
      if (random < 150) {
        wallTop.style.height = random + 'px';
      } else {
        wallTop.style.height = 50 + 'px';
      }
      wall.style.height = random + 'px';
      this.isGetStar = false;
    });

    star.addEventListener('animationiteration', () => {
      var random = Math.random() * 450 + 100;

      star.style.top = random + 'px';
    });

    bird.style.top = '10px';
    this.gameStart();
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

  gameStart() {
    const wall = this.wall.nativeElement;
    const wallTop = this.wallTop.nativeElement;
    const character = this.character.nativeElement;
    const star = this.star.nativeElement;

    this.countDown = setInterval(() => {
      if (this.gameIsOver) {
        this.ngOnDestroy();
      }
      var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue('top')
      );
      if (this.jumping === 0 && !this.gameIsOver && characterTop < 460) {
        character.style.top = characterTop + 3 + 'px';
      }

      var wallBottom = parseInt(
        window.getComputedStyle(wall).getPropertyValue('top')
      );
      var wallTopEnd = parseInt(
        window.getComputedStyle(wallTop).getPropertyValue('height')
      );
      var wallLeft = parseInt(
        window.getComputedStyle(wall).getPropertyValue('left')
      );
      var starLeft = parseInt(
        window.getComputedStyle(star).getPropertyValue('left')
      );
      var starTop = parseInt(
        window.getComputedStyle(star).getPropertyValue('top')
      );
      var cTop = -(500 - characterTop);

      if (
        starLeft <= 40 &&
        characterTop >= starTop - 40 &&
        characterTop <= starTop + 40
      ) {
        if (this.isGetStar === false) {
          this.counter++;
          const randomStar = Math.floor(Math.random() * 300) + 100;
          star.style.top = randomStar + 'px';
        }
        this.isGetStar = true;
      }

      if (
        wallLeft < 30 &&
        (characterTop < wallTopEnd || characterTop > wallBottom)
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

    
    if (!this.gameIsOver) {
      const character = this.character.nativeElement;
      this.jump(character);
    }
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
