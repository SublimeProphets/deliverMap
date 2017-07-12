import { Component, OnInit } from '@angular/core';
import {MapService} from "../map.service";
import { SettingsService } from "../settings.service";
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'mainnavigation',
  templateUrl: './mainnavigation.component.html',
  styleUrls: ['./mainnavigation.component.css']
})
export class MainnavigationComponent implements OnInit {

  selectedMap: string;
  settings: any;
  route:any;
  showMapFeatures: boolean = false;
  showFilters: boolean = false;
  constructor(
    private mapService: MapService,
    private settingsService:SettingsService,
    private router:Router
    ) { 
       router.events.subscribe((url:any) => {
         console.log(url.url)
         
         var string = "foo",
        substring = "oo";
        
        
        
        this.showFilters = (url.url.indexOf("map") !== -1 || url.url == "/clients") ? true : false;
        this.showMapFeatures = (url.url.indexOf("map") !== -1) ? true : false;

       });
    }

   
  
  

  ngOnInit() {
    this.selectedMap = this.mapService.selectedBaseMap;
    this.settings = this.settingsService.settings;  
    this.route = this.router.url;
    console.log(this.route)
  }
  

  public changeBaseMap(): void {

  this.mapService.changeBaseMap(this.selectedMap);
    
  }


}
