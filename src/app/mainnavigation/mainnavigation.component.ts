import { Component, OnInit } from '@angular/core';
import {MapService} from "../map.service";
import { SettingsService } from "../settings.service";
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import * as myGlobals from "../globals";



@Component({
  selector: 'mainnavigation',
  templateUrl: './mainnavigation.component.html',
  styleUrls: ['./mainnavigation.component.css']
})
export class MainnavigationComponent implements OnInit {

  selectedMap: string;
  workspace:any;
  route:any;
  showMapFeatures: boolean = false;
  showFilters: boolean = false;
  version: string = myGlobals.VERSION;
  
  constructor(
    private mapService: MapService,
    private settingsService:SettingsService,
    private router:Router
    ) { 
       router.events.subscribe((url:any) => {
         
         var string = "foo",
        substring = "oo";
        
        
        
        this.showFilters = (url.url.indexOf("map") !== -1 || url.url == "/clients") ? true : false;
        this.showMapFeatures = (url.url.indexOf("map") !== -1) ? true : false;

       });
    }

   
  
  

  ngOnInit() {
    this.selectedMap = this.mapService.selectedBaseMap;
    
    // copy to not  reflect immediately change of workspace in settings
    console.log(this.settingsService.settings.workspace);
    this.workspace = Object.assign({}, this.settingsService.settings.workspace);
    console.log(this.workspace);
    // JSON.stringify(this.settingsService.settings.workspace);  
    // this.workspace = JSON.parse(this.workspace);

    this.route = this.router.url;
    console.log(this.route)
  }
  

  public changeBaseMap(): void {

  this.mapService.changeBaseMap(this.selectedMap);
    
  }


}
