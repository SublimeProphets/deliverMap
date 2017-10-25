import { Component, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
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
  
  public trigger

  navOpen() {
    this.navToggle.emit(true);
  }
  infoOpen() {
    this.infoToggle.emit(true);
  }
  triggerInfo() {
    console.log("TRIGGERED");
    this.infoToggle.emit(true);
  }
  constructor() {
    
  }















}
