import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { SearchService } from '../search.service';
import { SettingsService, Settings } from "../settings.service";

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {

  resultsList:Array<any>;
  public starredClients:any;

  ngOnInit() {
      this.starredClients = this.clientsService.getStarredClients().slice(0,100);
    }


  searchResults:any;
  constructor( private searchService:SearchService, public settingsService:SettingsService, public clientsService:ClientsService) {}









}

