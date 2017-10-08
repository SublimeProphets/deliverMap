import { Injectable, EventEmitter } from '@angular/core';
import { Client } from './client/client.component';
import { CLIENTS } from './client/client.mock';
import { LocalStorageService } from 'angular-2-local-storage';
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { OrderbyPipe } from "./orderby.pipe";
import { SettingsService } from "./settings.service";


// Empty Filterset to restore if reset called
const FILTERSTATEORG = {
  _active: false,
  custom: {
    _active: false,
    abo: { active: false, value: true },
    area: {
      active: false,
      value: 0
    },
    defaultStore: {
      active: false,
      value: ""
    },
    lastDeliveryDate: {
      active: false,
      value: ""
    },
    firstOrderDate: {
      active: false,
      value: ""
    },
    starred: {
      active: false,
      value: true
    },
    new: {
      active: false,
      value: ""
    },
    top: {
      active: false,
      value: 50
    },
    returning: {
      active: false,
      value: 10
    },
    loworders: {
      active: false,
      value: 3
    },
    longago: {
      active: false,
      value: 100
    }
  },
  predefined: {
          _active: false,
          value: 0
        }

};

@Injectable()
export class ClientsService {


  clients: any; // current working array (filtered and all...)
  clientsOriginal: any; // Full clients as saved
  public filterstate: any;
  private timestamp: any;
  

  constructor(
    private localStorageService: LocalStorageService,
    private settingsService:SettingsService,
    private http:Http
  ) {
    
    // For Date calculations
    this.timestamp = Date.now();
    this.filterstate = JSON.parse(JSON.stringify(FILTERSTATEORG));

    // Add default values if localStorage was empty
    
    this.clients = this.settingsService.getClients();
    this.clientsOriginal = this.clients;
    
    console.log(this.clients);
    this.settingsService.seetingsHasBeenUpdated.subscribe(() => {
      this.clients = this.settingsService.getClients();
      this.clientsOriginal = this.settingsService.getClients();
    })

    // Set the selected client to default
    this.clientSelectedIDcache = 0;


  };

  currentSelected: number = null;

  // Emitter for clientsUpdated
  clientsUpdated: EventEmitter<boolean> = new EventEmitter();

  // Emitter for clientsUpdated
  visibilityUpdated: EventEmitter<any> = new EventEmitter();

  // Emitter for clientSelected
  clientSelectedID: EventEmitter<number> = new EventEmitter();
  clientSelectedIDcache: number;

  //addClientProgress
  addClientProgress: EventEmitter<boolean> = new EventEmitter();
  mapFinishedMarkers: EventEmitter<boolean> = new EventEmitter();


  private activeFilters: Array<string> = [];


  public updateStorage(input: any, isOriginalData: boolean) {
    this.clients = input;
    if (isOriginalData) {
      this.clientsOriginal = input;
      this.settingsService.setClients(this.clientsOriginal);
      
    }



  }
  private fetchStorage() {
    console.log("fetchStorage", this.clients);
    //return this.localStorageService.get("clients");
    return this.clients;
  }
  /* private setDefaultStorage() {
    this.localStorageService.set("clients", CLIENTS);
    this.clients = CLIENTS;
  } */
  private removeStorage() {
    this.clientsUpdated.emit(true);
    this.clients = [];
    console.log("removeStorage typeof clients", typeof this.clients);
    return this.localStorageService.remove("clients");

  }

  public emitUpdate() {
    console.info("clientsUpdated emitted");
    return this.clientsUpdated.emit(true);
  }

private resetFilter() {
  this.filterstate = JSON.parse(JSON.stringify(FILTERSTATEORG));
    this.clients = this.clientsOriginal;
    this.updateStorage(this.clients, false);
    this.emitUpdate();
}


public controlFilter(basetype:string, name:string, status?:any, value?:any) {
  console.log("controlFilte launched");
  switch(basetype) {

    case "reset":
        this.resetFilter();
    break;
    case "custom":

      // activate customfiltering
      this.filterstate._active = true;
      this.filterstate.custom._active = true;
      this.filterstate.predefined._active = false;
      
      if(name == "activate") {
        console.log("ACTIVATE", status);
        this.filterstate.custom._active = status;
      } else {
      // Update status - it can be undefinied, this is when we only want to active the checkbox
      if(typeof name != "undefined" && name != "activate") 
        this.filterstate.custom[name].active = status;

      // Update value if given
      if(typeof value != "undefined") 
        this.filterstate.custom[name].value = value;
      
      
      this.setFilter();
      }
        

    break;
    case "predefined":
      // reset to empty custom one
      
      this.filterstate = JSON.parse(JSON.stringify(FILTERSTATEORG));;
      this.filterstate._active = true;
      this.filterstate.predefined._active = true;
      this.filterstate.predefined.value = name;

      switch(name) {

        case "activate":
          this.filterstate.predefined._active = status;
        break;
        
        case "top": 
            this.filterstate.custom.top.active = true;
            this.setFilter();
        break;

        case "new": 
          this.filterstate.custom.firstOrderDate.active = true;
          
          var d = new Date();
          d.setMonth(d.getMonth() - 1);
          
          this.filterstate.custom.firstOrderDate.value = d;
          console.log("NEW CASE REACHED", d);
          this.setFilter();
          
        break;

        case "longago": 
          this.filterstate.custom.firstOrderDate.active = true;
          let noOrdersSinceDays = this.settingsService.settings.filters.noOrdersSinceDays;
          var d = new Date();
          d.setMonth(d.getDate() - noOrdersSinceDays);
          console.log("LONG CASE REACHED", d);
          this.filterstate.custom.firstOrderDate.value = d;
          this.setFilter();
          
        break;

        case "returning":
          this.filterstate.custom.returning.active = true;          
          this.setFilter();
          
        break;
        case "loworders":
          this.filterstate.custom.loworders.active = true;          
          this.setFilter();
          
        break;
        case "starred":
          this.filterstate.custom.starred.active = true;          
          this.setFilter();
        break;
      } 
    break;

  }

  // If both filters are not active, reset everyhting
  if(!this.filterstate.custom._active && !this.filterstate.predefined._active)
    this.resetFilter();


  return { 
    filterstate:  this.filterstate,
    clientsFound: this.clients.length,
    clientsTotal: this.clientsOriginal.length
};

}


  setFilter(): void {
    
      let filteredData;

      // Do the actual filtering...
      filteredData = this.clientsOriginal;
      

      console.log(filteredData);

      filteredData = filteredData.filter(client => {

        let isValid = true;
        


        // ABO
        if (this.filterstate.custom.abo.active) {
          
          if(this.filterstate.custom.abo.value)  {
            isValid = (typeof client.abo == "number") ? true : false;    
          } else {
            isValid = (typeof client.abo == "number") ? false : true;  
          }
        } 


        // STARRED / FAVORIT
        if (this.filterstate.custom.starred.active) {
          console.log("filter for starred", this.filterstate.custom.starred.value);
          if(this.filterstate.custom.starred.value)  {
            isValid = (client.starred) ? true : false;    
          } else {
            if(typeof client.starred == "undefined") {
              isValid = true;
            } else {
              isValid = (!client.starred) ? true : false;  
            }
            
          }
        } 

        // PLZ
        
        if (this.filterstate.custom.area.active && this.filterstate.custom.area.value != 0 && isValid) {
          isValid = (client.postleihzahl == parseInt(this.filterstate.custom.area.value)) ? true : false;
        }

        // LAST DELIVERY DATE
        if (this.filterstate.custom.lastDeliveryDate.active && this.filterstate.custom.lastDeliveryDate.value != 0 && isValid) {
            isValid = this.compareDates(client.lastDeliveryDate, this.filterstate.custom.lastDeliveryDate.value, "validFromDate");
        }

        // FIRST ORDER DATE
        if (this.filterstate.custom.firstOrderDate.active && this.filterstate.custom.firstOrderDate.value != 0 && isValid) {
            isValid = this.compareDates(client.firstOrderDate, this.filterstate.custom.firstOrderDate.value, "validFromDate",);
        }
         // LONG AGO
        if (this.filterstate.custom.longago.active && this.filterstate.custom.longao.value != 0 && isValid) {
             isValid = this.compareDates(client.lastDeliveryDate, this.filterstate.custom.longago.value, "validToDate");
        }
        
        // DEFAULT STORE
        if(this.filterstate.custom.defaultStore.active && this.filterstate.custom.defaultStore.value && isValid) {
           console.log("FILTER FOR DEFAULTSOTR", client.defaultStore, this.filterstate.custom.defaultStore.value)
           isValid =  (client.defaultStore == this.filterstate.custom.defaultStore.value) ? true : false;
        }

        // RETURNING
        if(this.filterstate.custom.returning.active && this.filterstate.custom.returning.value && isValid) {
           isValid =  (client.deliveryCount >= this.filterstate.custom.returning.value) ? true : false;
        }

        // LOW ORDERS
        if(this.filterstate.custom.loworders.active && this.filterstate.custom.loworders.value && isValid) {
           isValid =  (client.deliveryCount <= this.filterstate.custom.loworders.value) ? true : false;
        }
       

        if(isValid) return client;


      });

      /********** ORDERING AND LIMITS */
      
       // NEW
        if(this.filterstate.custom.top.active) {
          console.info("filter TOP called");
           filteredData.sort(function(a,b) {return (a.deliveryCount < b.deliveryCount) ? 1 : ((b.deliveryCount < a.deliveryCount) ? -1 : 0);} ); 
           filteredData = filteredData.slice(0, this.filterstate.custom.top.value);
        }

           
      console.log("before updateStorage", filteredData);
      this.clients = filteredData;
      this.updateStorage(this.clients, false);
      this.emitUpdate();

    
    
  }






  getClient(id: number) {
    return this.clients.filter(
      (client) => {
        if (client.id == id) return client
      }
    );

  }


  getClients() {
    console.log("getClients() called, we delivered ", this.clients.length);
    return this.clients
  }
  getStarredClients() {
    return this.clients.filter(client => {
      if(client.starred) return client 
    })
  }

  emitMapFinishedMarkers(): void {
    this.mapFinishedMarkers.emit(true);
  }

  setClientStarred(id: number, starred: boolean): boolean {

    // search the index for the id
    var index = this.clients.map(function (e) { return e.id; }).indexOf(id);

    console.log("setClientStarred", index, starred);

    this.clients[index].starred = starred;

    return starred;

  }


  public updateClient(id, client) {
    var index = this.clients.map(function (e) { return e.id; }).indexOf(id);
    this.clients[index] = client;
    this.updateStorage(this.clients, true);

  }

  public clientSelected(id: number) {


    // search the index for the id
    var index = this.clients.map(function (e) { return e.id; }).indexOf(id);

    console.log("selected! id: " + id, index);

    // Remove old state
    if (this.currentSelected !== null) {
      var oldIndex = this.clients.map(function (e) { return e.id; }).indexOf(this.currentSelected);

      if ("undefined" !== typeof this.clients[oldIndex].selected)
        this.clients[oldIndex].selected = false;
    }

    this.currentSelected = id;
    this.clients[index].selected = true;

    // broadcast
    this.updateStorage(this.clients, false);
    this.clientSelectedID.emit(index);



  }

  // Set a list of clients  
  setClients(input: string) {

    return this.updateStorage(input, true);

  }

  // compares the entered days with today and calculates how many days are between.
  public daysSinceDate(date):any {
   
    if(typeof date !== "string") {
      return "Keine"
    } else {
      let now = Date.now();
    let tmpDate = new Date(date); // some mock date
    var milliseconds = tmpDate.getTime(); 
    return Math.round((now-milliseconds)/(1000*60*60*24))
  }
  
}


  // Set a list of clients  
  changeVisible(id: number) {
    console.log("changeVisible()");
    // search the index for the id
    var index = this.clients.map(function (e) { return e.id; }).indexOf(id);
    var state = (this.clients[index].visible) ? false : true;


    this.clients[index].visible = state;

    this.visibilityUpdated.emit({ id: id, visible: state });
    //return this.updateStorage(this.clients);


  }


  removeClients() {
    this.removeStorage();
  }





  private getCoordinates(address) {


    var combinedAndEncodedSearchString = encodeURIComponent(address);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + combinedAndEncodedSearchString + '&key=AIzaSyChYDkxrB4vvRYBVUI459bTyvMhXo6oOTE';

    return this.http.get(url).map(
      res => {
        const response = res.json();
        let filtered;
        // Just get the locations, containing 2 properties lng and lat 
        if ("undefined" !== typeof response.results[0]) {
          filtered = response.results[0].geometry.location;
        } else {
          filtered = { lng: 0, lat: 0 }
        }

        console.log(filtered);



        return filtered;
      }
    )
  }


  /*
    
    getClients(): 
    Client[] {
      return CLIENTS;
    }
  
  */
private compareDates(clientDate, inputDate, mode) {
            //Check if property exists
            if(typeof clientDate !== "undefined") {
              
              // calculate clientMS
              clientDate = new Date(clientDate); // some mock date
              let clientMS = clientDate.getTime();

              // calculate InputMS
              inputDate = new Date(inputDate);
              let inputMS = inputDate.getTime();

              let isValid:any;

              switch(mode) {
              
              // normale methode
              case "validFromDate":
                
                isValid =  ((clientMS - inputMS) >= 1) ? true : false;
              break;

              case "validUntilDate":
                isValid =  ((inputMS - clientMS) >= 1) ? true : false;
              break;
              
            }
              

              //Calculate how many days
              
              console.log("LDD", clientMS, inputMS, (inputMS - clientMS) / (1000 * 60 * 60 * 24));
              return isValid;
            } else {
              //client has no date so fail
              return false;
            }
          }
          
}
