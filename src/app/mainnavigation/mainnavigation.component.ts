import { Component, OnInit } from '@angular/core';
import {MapService} from "../map.service";





@Component({
  selector: 'mainnavigation',
  templateUrl: './mainnavigation.component.html',
  styleUrls: ['./mainnavigation.component.css']
})
export class MainnavigationComponent implements OnInit {

  selectedMap: string;
  settings: Object = {
    workspace: {
      slug: "12d",
      name: "1-2-Domicile"
    }
  }
  constructor(private mapService: MapService) { }

   
  
  

  ngOnInit() {
    this.selectedMap = this.mapService.selectedBaseMap;
    
  }
  

  public changeBaseMap(): void {

  this.mapService.changeBaseMap(this.selectedMap);
    
  }


}
