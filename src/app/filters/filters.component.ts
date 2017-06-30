
import { Component, OnInit } from '@angular/core';
import {ClientsService} from "../clients.service";
import { Store, STORES } from '../stores/stores.component';


@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  

  constructor(private clientsService: ClientsService) { 




  }

  progressbar: string = "determinate";
  clients: any;
  filterstate: any;
  stores = STORES;
  
  filteredClientsTotal: number = 0;
  bezirk:Array<Object> = [
    {code: 1, name: "ALLE ANZEIGEN"},
    {code: 2500, name: "2500 Stadtzentrum"},
    {code: 2501, name: "2501 Altstadt"},
    {code: 2502, name: "2502 Mett"},
    {code: 2503, name: "2503 Bözingen"},
    {code: 2504, name: "2504 Port"},
    {code: 2506, name: "2506 Vingelz"},
    {code: 2560, name: "2560 Nidau"}
  ];
  
  


  setFilter(whatToFilter: string): void {
    
      this.progressbar = "indeterminate";
      console.log(this.filterstate);  
      // Update the cached filtestate array
      if(whatToFilter !== "reset") this.filterstate[whatToFilter].active = true;
      this.clientsService.filterstate = this.filterstate;
      
      this.filteredClientsTotal = this.clientsService.setFilter(whatToFilter);
      
      // if it was a reset, get the original filterstate array
      if(whatToFilter == "reset")  {
        this.filterstate = this.clientsService.filterstate;
       
      }
      
    }
    

  
  
ngOnInit() {
  this.filterstate = this.clientsService.filterstate;
}

}
