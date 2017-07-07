import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {

  resultsList:Array<any>;

  ngOnInit() {
  }

  searchResults:any;
  constructor( private searchService:SearchService) {
    this.searchService.searchResult$.subscribe((results) => {
      console.log("recieved update from searchService.searchResult");  
      this.resultsList = this.searchService.resultsList;
    })
  }












}

