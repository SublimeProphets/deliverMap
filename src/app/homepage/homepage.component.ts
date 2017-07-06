import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { NavigatorComponent } from '../navigator/navigator.component';
@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {

  

  ngOnInit() {
  }

  searchResults:any;
  constructor( private navigatorComponent:NavigatorComponent) {
    

    this.navigatorComponent.resultsUpdated.subscribe((results) => {
        this.searchResults = results;
        alert(results);
    });
  }












}

