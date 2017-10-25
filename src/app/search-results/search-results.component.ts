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
  public isVisible:boolean = false;

  constructor(private searchService:SearchService) { 

    this.searchService.searchResult$.subscribe((results) => {
            
            this.resultsList = this.searchService.resultsList;
            
            // Does i have items?
            if(this.resultsList.length <= 0) {
              //hide myself
              this.hasResults = false;
              this.isVisible = false;
            } else {
              this.hasResults = true;
              this.isVisible = true;
            }

    
            
        })

  }

  ngOnInit() {
  }

  public close() {
    this.searchService.executeSearch(""); // Execute empty search so it will close
    this.isVisible = false;
  }

  
}
