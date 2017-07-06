import { Component, OnInit, NgZone, OnDestroy, ViewEncapsulation } from '@angular/core';





  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
  
  
  constructor(private ngZone: NgZone) {

    window.angularComponentRef = {
      zone: this.ngZone, 
      componentFn: (value) => this.callFromOutside(value), 
      component: this
    };


    



  }
  callFromOutside(value) {
      this.ngZone.run(() => {
       console.log('calledFromOutside ' + value);
      })
  }

 


  
}
