import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  @ViewChild('leftRef') left!: ElementRef;
  @ViewChild('rightRef') right!: ElementRef;

  @HostListener('mouseenter') onMouseEnter() {
    if (this.isLeftHovered()) {
      this.container.nativeElement.classList.add('left-is-hovered');
    } else if (this.isRightHovered()) {
      this.container.nativeElement.classList.add('right-is-hovered');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.container.nativeElement.classList.remove('left-is-hovered', 'right-is-hovered');
  }

  constructor(private elementRef: ElementRef) { }
  get container() {
    return this.elementRef.nativeElement.querySelector('.container');
  }

  isLeftHovered() {
    return this.left.nativeElement.matches(':hover');
  }

  isRightHovered() {
    return this.right.nativeElement.matches(':hover');
  }
}

