import { Injectable, EventEmitter } from '@angular/core';
import { Client } from './client/client.component';
import { CLIENTS } from './client/client.mock';
import { LocalStorageService } from 'angular-2-local-storage';
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";

const FILTERSTATEORG: any = {
    abo: { active: false, value: false},
    area: {
      active: false,
      value: 0
    } ,
    defaultStore: {
      active: false,
      value: 0
    }
   };

@Injectable()
export class ClientsService {

  
  clients: any; // current working array (filtered and all...)
  clientsOriginal: any; // Full clients as saved
  public filterstate: any = FILTERSTATEORG;
  

  constructor( 
    private localStorageService: LocalStorageService,
    private http: Http
    ) {
      

       // Add default values if localStorage was empty
      if(this.localStorageService.get("clients") === null) {
        this.setDefaultStorage();
      } else {
        this.clients = this.localStorageService.get("clients");
        this.clientsOriginal = this.localStorageService.get("clients");
      }
      

      // Set the selected client to default
      this.clientSelectedIDcache = 3;
     

};

currentSelected:number = null;

// Emitter for clientsUpdated
clientsUpdated:EventEmitter<boolean> = new EventEmitter();

// Emitter for clientsUpdated
visibilityUpdated:EventEmitter<any> = new EventEmitter();

// Emitter for clientSelected
clientSelectedID:EventEmitter<number> = new EventEmitter();
clientSelectedIDcache: number;

//addClientProgress
addClientProgress:EventEmitter<boolean> = new EventEmitter();
mapFinishedMarkers:EventEmitter<boolean> = new EventEmitter();


private activeFilters: Array<string> = [];


  public updateStorage(input:any, isOriginalData:boolean) {
    this.clients = input;
    if(isOriginalData) {
      this.clientsOriginal = input;
      this.localStorageService.set("clients", input);
    }

    
    // return this.clientsUpdated.emit(true);
    
  }
  private fetchStorage() {
    console.log("fetchStorage", this.clients);
    //return this.localStorageService.get("clients");
    return this.clients;
  }
  private setDefaultStorage() {
    this.localStorageService.set("clients",CLIENTS);
    this.clients = CLIENTS;
  }
  private removeStorage() {
    this.clientsUpdated.emit(true);
    this.clients = [];
    console.log("removeStorage typeof clients", typeof this.clients);
    return this.localStorageService.remove("clients");
    
  }

public emitUpdate() {
  return this.clientsUpdated.emit(true);
}

setFilter(filtertype:string): number {
  
  console.group("setfilter");
  
  

  if(filtertype == "reset") {
    
    this.filterstate = {
    abo: { active: false, value: false},
    area: {
      active: false,
      value: 0
    } ,
    defaultStore: {
      active: false,
      value: 0
    }
   };
    
    this.clients = this.clientsOriginal;
    console.log("in setFilter", this.filterstate);
    this.updateStorage(this.clients, false);
    this.emitUpdate();
  } else {
  let filteredData;

  // Do the actual filtering...
    filteredData = this.clientsOriginal;
    console.log(filteredData);

    for(var element in this.filterstate) {
      
      if(this.filterstate[element].active) {
        console.log("im filterung for element");
        switch (element) {
          
            
          case "abo": 
            console.log("case abo");
            if(!this.filterstate[element].value) {
            filteredData = filteredData.filter(client => {
              
              if(typeof client.abo == "number") {
                return client;
              }  
            }
            
            );
            }
            break;


          case "area":
            // If 0 then do all
            if(this.filterstate[element].value != 0) {

            console.log("clients filterfunction AREA CASE", this.filterstate[element].value);
            filteredData = filteredData.filter((client) => {
              if(client.postleihzahl == parseInt(this.filterstate[element].value)) {
                console.log("clients filterfunction filtered area!", this.filterstate[element].value, client.postleihzahl);
                return client;
              } 

            } );
            }
          break;


          case "defaultStore":
          console.log("defualtStore case reached")
            
            

            
            filteredData = filteredData.filter((client) => {
              if(client.defaultStore == this.filterstate[element].value) {
                console.log("OK", client.defaultStore, this.filterstate[element].value);
                return client;
              } else {
                console.log("NONO", client.defaultStore, this.filterstate[element].value);
              }

            } );
            
          break;


          default:
          break;

        }
      }


    } // end for in 
    console.log("before updateStorage", filteredData);
    this.clients = filteredData;
  this.updateStorage(this.clients, false);
  this.emitUpdate();
  
  }



  

  
  console.groupEnd();
  return this.clients.length;
}


  getClient(id:number){
      return this.clients.filter(
        (client) => {
          if(client.id == id) return client
        }
      );    
      
  }


  getClients(){
        console.log("getClients() called, we delivered ", this.clients.length);
        return this.clients      
  }

  emitMapFinishedMarkers(): void {
    this.mapFinishedMarkers.emit(true);
  }

  setClientStarred(id:number, starred:boolean) {

    // search the index for the id
    var index = this.clients.map(function(e) { return e.id; }).indexOf(id);
    
    console.log("setClientStarred", index, starred);
    
    this.clients[index].starred = starred; 

  }




public clientSelected(id:number) {
              

    // search the index for the id
    var index = this.clients.map(function(e) { return e.id; }).indexOf(id);
    
    console.log("selected! id: " + id, index);      

    // Remove old state
    if(this.currentSelected !== null) {
      var oldIndex = this.clients.map(function(e) { return e.id; }).indexOf(this.currentSelected);
      
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

// Set a list of clients  
changeVisible(id: number) {
    console.log("changeVisible()");
    // search the index for the id
    var index = this.clients.map(function(e) { return e.id; }).indexOf(id);
    var state = (this.clients[index].visible) ? false : true;
    
    
    this.clients[index].visible = state;

    this.visibilityUpdated.emit({id:id,visible:state});
    //return this.updateStorage(this.clients);

    
  } 


removeClients() {
    this.removeStorage();
  }
  
// Add a single Client
  addClient(input: Client[]) {
    
    

    // Cache old one
    let newArray = this.clients;
    // if("undefined" !== typeof input[0].lng || "undefined" !== typeof input[0].lat ) {

      // Only do if necessary



    if ("undefined" === typeof input[0].lat || "undefined" === typeof input[0].lat ){
      
      // Add coordinates
      this.getCoordinates(input[0].address + ", " + input[0].city).subscribe(      
          res => {
            
            console.log("coordinates updated!", res);
            input[0].lng = ("undefined" === typeof res.lng) ? "0" : res.lng;
            input[0].lat = ("undefined" === typeof res.lat) ? "0" : res.lat; 
            // write coordinates into object
            

            // Add Object to array
            newArray.push(input[0]);      
            this.addClientProgress.emit(true);
            
            return this.updateStorage(newArray, true);
            
          }
        );

     } else {
       
       
       
       
       
       if(this.clients == []) {
        var length:number = 0;
        
       } else {
         var length:number = this.clients.length + 1;
       }
        
       
       newArray.push(input[0]);
       this.addClientProgress.emit(true);
       
       return this.updateStorage(newArray, true);
       
     }
    
    




    
    
    

  }







private getCoordinates(address) {
    

    var combinedAndEncodedSearchString = encodeURIComponent(address);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + combinedAndEncodedSearchString + '&key=AIzaSyChYDkxrB4vvRYBVUI459bTyvMhXo6oOTE';
    
    return this.http.get(url).map(
      res =>{
        const response = res.json();
        let filtered;
        // Just get the locations, containing 2 properties lng and lat 
        if("undefined" !== typeof response.results[0]) {
          filtered = response.results[0].geometry.location;
        } else {
          filtered = {lng:0, lat: 0}
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

}
