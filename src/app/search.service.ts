import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import {GeocodingService} from "./geocoding.service";
import {MapService} from "./map.service"; // TODO no
import { ClientsService } from "./clients.service";
import {Location} from "./core/location.class";  // TODO no
import {Map} from "leaflet"; // TODO no
import { SettingsService } from "./settings.service";


@Injectable()
export class SearchService {
  public searchResult$ = new Subject<any>();    
  public searchStorage:any;
  private searchString: string = "";
  public lastResultItem: any;
  public resultsList: any;

  constructor(
     private geocoder: GeocodingService, 
        private mapService: MapService,
        private clientService:ClientsService,
        private settingsService:SettingsService
  ) { 
    // Get default for filters
     this.searchStorage = this.settingsService.settings.search.filters;
        
  }

  public executeSearch(term) {
    this.searchString = term.toLowerCase();
    this.findItems();
  }

  private addResultItem(item) {
    console.log("addResultItem",item);
    this.resultsList.push(item)
    
  }
   private pushResultItems():void {
        this.searchResult$.next(true);
        
    }

  private findItems() {
    
        
        // Empty the array
        this.resultsList = [];

        // If it's empty then emit empty string and break;
        if (this.searchString == "") { 
          this.pushResultItems();
          return; 
        }

        // PLACES / LOCATION
        if(this.searchStorage.places.active) {
            this.geocoder.geocode(this.searchString)
            .subscribe(location => {
                if(location.length > 0) {
                    location.forEach(function(item){
                        item.type = "location";
                        this.addResultItem(item);

                    }, this);
                    this.pushResultItems();
                }
                
            
          }, error => console.error(error));
        }
        


        if(this.searchStorage.clients.active) {
            
            
            //console.log("suche in clients", this.clientService.clients);
            
            this.clientService.clients.forEach(function(item) {
              //  console.log(this.searchString);
                item.type = "client";
                if( item.name.toLowerCase().indexOf(this.searchString) >= 0) {
                   
                    this.addResultItem(item);
                } else if(typeof item.address != "undefined") {
                   
                    if(item.address.toLowerCase().indexOf(this.searchString) >= 0) {
                        this.addResultItem(item);
                    }
                } else {
                  
                }

            }, this);
            
            
        }
        this.pushResultItems();

        if(this.searchStorage.stores.active) {
            
            
            
            this.settingsService.settings.stores.forEach(function(item) {
                item.type = "stores_" + item.group;
                if( item.name.toLowerCase().indexOf(this.searchString) >= 0) {
                    this.addResultItem(item);
                } else if(item.address.toLowerCase().indexOf(this.searchString) >= 0) {
                    this.addResultItem(item);
                }

            }, this);
            
            
        }
        this.pushResultItems();

        

  }

}
