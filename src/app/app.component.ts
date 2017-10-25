import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { SearchService } from "./search.service";





  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit  {
  public sidenavOpened:boolean = false;
  @ViewChild('infonav') infonav: MdSidenav;

  constructor(private searchService:SearchService) {

    
  }

  ngOnInit() {
    console.log(this.infonav);
    
    this.searchService.searchResult$.subscribe((results) => {
      console.log(results)
      if(results.hasResults) {
        
        this.infonav.open();
      } else {
        this.infonav.close();
      }
      
      
    });
  }

}
