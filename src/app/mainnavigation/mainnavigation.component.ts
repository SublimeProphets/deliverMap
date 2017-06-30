import { Component, OnInit } from '@angular/core';
import {MapService} from "../map.service";
import { SettingsService } from "../settings.service";





@Component({
  selector: 'mainnavigation',
  templateUrl: './mainnavigation.component.html',
  styleUrls: ['./mainnavigation.component.css']
})
export class MainnavigationComponent implements OnInit {

  selectedMap: string;
  settings: any;

  constructor(
    private mapService: MapService,
    private settingsService:SettingsService) { }

   
  
  

  ngOnInit() {
    this.selectedMap = this.mapService.selectedBaseMap;
    this.settings = this.settingsService.settings;  
  }
  

  public changeBaseMap(): void {

  this.mapService.changeBaseMap(this.selectedMap);
    
  }


}
