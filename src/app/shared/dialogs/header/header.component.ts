import { Component } from '@angular/core';

@Component({
  selector: 'ba-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed = true;

  constructor() {}

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
