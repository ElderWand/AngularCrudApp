import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  @ViewChild('container')
  container!: ElementRef;
  @ViewChild('left')
  left!: ElementRef;
  @ViewChild('right')
  right!: ElementRef;

  onLeftHover() {
    this.container.nativeElement.classList.add('hover-left');
  }

  onLeftLeave() {
    this.container.nativeElement.classList.remove('hover-left');
  }

  onRightHover() {
    this.container.nativeElement.classList.add('hover-right');
  }

  onRightLeave() {
    this.container.nativeElement.classList.remove('hover-right');
  }
}

