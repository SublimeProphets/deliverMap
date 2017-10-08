import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchService } from "../search.service";

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsComponent implements OnInit {

  resultsList:Array<any> = [];
  hasResults:boolean = false;
  showOverlay:boolean = false;
  
  constructor(private searchService:SearchService) { 

    this.searchService.searchResult$.subscribe((results) => {
            
            this.resultsList = this.searchService.resultsList;
            
            // Does i have items?
            if(this.resultsList.length <= 0) {
              //hide myself
              this.hasResults = false;
              this.showOverlay = false;
            } else {
              this.hasResults = true;
              this.showOverlay = true;
            }

    console.log("recieved update from searchService.searchResult", this.resultsList.length);
            // this.searchHasResults = true;
            
        })

  }

  ngOnInit() {
  }

  public closeOverlay() {
    this.showOverlay = false;
  }

}
