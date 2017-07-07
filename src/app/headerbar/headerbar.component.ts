import { Component, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NavigatorComponent} from "../navigator/navigator.component";

@Component({
  selector: 'header-bar',
  templateUrl: './headerbar.template.html',
  styleUrls: ['./headerbar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderBar {
  
  @Output() navToggle = new EventEmitter<boolean>();
  @Output() infoToggle = new EventEmitter<boolean>();
  
  navOpen() {
    this.navToggle.emit(true);
  }
  infoOpen() {
    this.infoToggle.emit(true);
  }

  constructor() {
    
  }















}
