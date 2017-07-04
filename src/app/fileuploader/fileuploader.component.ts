
import {ChangeDetectionStrategy, Component, Input, EventEmitter, OnInit} from "@angular/core";
import { UploadResult } from '../xlsx-file-upload/xlsx-file-upload.component';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../client/client.component';
import { CLIENTS } from '../client/client.mock';
import { ClientsService } from '../clients.service';

import { SettingsService } from "../settings.service";




@Component({
  selector: 'fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
 public uploaderContent: BehaviorSubject<string> = new BehaviorSubject('please drop file in');
  constructor(
    private clientsService: ClientsService,
    private settingsService: SettingsService
    
    ) {} 
  
    ngOnInit():void {
      
		this.clientsService.addClientProgress.subscribe(
      () => {
        console.log("AddClientProgrrss");
        this.progressTracker("lol");
      }
    );

    }

  public xlsxUploaded(result: UploadResult) {
    
    // this.uploaderContent.next(JSON.stringify(result));
    
    this.uploaderContent.next("File erfolgreich hochgeladen");


    // Clear previous entries
    this.clientsService.removeClients();


    let res = result.payload[0];
    let totalProperties = this.numKeys(res);


    
    

    
    //temporary Object for one Client
    var tmpClient: Client[];


    // needed to check if row matches with previous one
    var previousRow: number = 0;

    // to determine the first rouimport { HttpModule, JsonpModule } from '@angular/http';nd (where we do not have to push the object
    var firstRound: boolean = true;

    var i = 0;

    // Iterates all cells
    for (var key in res) {
        
      
    
      // get letter out of cellname
      var keyLetter:string = key.replace(/[0-9]/g, '');

      // get number out of cellname
      var keyNumber:number = Number(key.replace( /^\D+/g, ''));
      
      // Same row...
      if(keyNumber == previousRow) {
        
        switch(keyLetter) {
          

          // Name
          case "A":
            tmpClient[0].name = res[key].v;
          break;

          // Addresse
          case "B":
            tmpClient[0].address = res[key].v;
          break;

          // Addresse
          case "C":
            tmpClient[0].postleihzahl = res[key].v;
          break;

          // PLZ
          case "D":
            tmpClient[0].city = res[key].v;
          break;

          // Telephone
          case "E":
            tmpClient[0].tel = res[key].v;
          break;

          // Addresse
          case "F":
            tmpClient[0].email = res[key].v;
            console.error("EMAIL", tmpClient[0].email );
          break;
          
          // Addresse
          case "G":
            tmpClient[0].abo = res[key].v;
            console.error("ABO", tmpClient[0].abo );
          break;
          
          // DeliveryCount
          case "H":
            tmpClient[0].deliveryCount = res[key].v;
          break;

          // defaultStore
          case "I":
            tmpClient[0].defaultStore = res[key].v;
            
            
            // //if(storeObj) tmpClient[0].storeGroup = storeObj.group;
          break;

          // lastDeliveryDate
          case "J":
            tmpClient[0].lastDeliveryDate = new Date(res[key].v);
          break;

          // Latitude
          case "K":
            if(res[key].v !== "") {
              tmpClient[0].lat = res[key].v;
            }
          break;

          //Longitude
          case "L":
            
            if(res[key].v !== "") {
              tmpClient[0].lng = res[key].v;
            }
          break;

        }
        // tmpClient = {name:res[key]};


      } else {

          

            
          

          if(!firstRound){






            









            
            //Lookup group membership
          
            tmpClient[0].storeGroup = this.lookupStoreGroup(tmpClient[0].defaultStore);
            console.log("lookupStoreGroup", this.lookupStoreGroup(tmpClient[0].defaultStore));
          
            console.log("fileupload adds client with following content", tmpClient)
            
            
            // Finally 
            
              this.clientsService.addClient(tmpClient);
          }

        // New Row, new Object - we can already add Name here
        tmpClient =[<Client>{
            id: previousRow,
            name: res[key].v,
            visible: true,
            starred: false,
            selected: false,
            isOpen: false,
            draggable: false,
            label: "A",
            DOMID: "client-id-" + previousRow
        }];

        // Yes, we executed it at least once
        firstRound = false;
        
        i++;

        
        console.log("check if end is reached",result, totalProperties, i);

        if(totalProperties <= i) {
          console.error("ALL IMPORTED");
          
          //Do something if the end of the loop
          this.clientsService.emitUpdate();
        }

      }

      // update previousRow stuff
      if(keyNumber != 0) previousRow = keyNumber;
      this.totalSteps = previousRow;
      
 
}
//Do something if the end of the loop
          this.clientsService.emitUpdate();
  
  


    // Data extracted, update the clients now


    
    
    
  }
totalSteps: number;
progressCount: number = 0;
percent:number = 0;

private progressTracker(stepdone:any) {
  
  this.progressCount++;

  // Prozente
  this.percent = 100 / this.totalSteps * this.progressCount;


  // this.uploaderContent.next("<div class='percent'>" + percent + "%</div><div class='subline'>(" + this.progressCount +" von " + this.totalSteps + ")</div>");
}
numKeys(o) {
   var res = 0;
   for (var k in o) {
       if (o.hasOwnProperty(k)) res++;
   }
   return res;
}


// Lookup the stores objects to find the right group membership. StoreSlugString has to be any because it may also pass undefined.
private  lookupStoreGroup(storeSlugString:any) :string {
  if(typeof storeSlugString === "undefined") {
            return "unknown";
          } else {
            let storeArray = this.settingsService.settings.stores.map(function(e) { if( e.slug == storeSlugString ) return e.group });
            console.log(storeArray);

            for(var i = 0; i <= storeArray.length; i++) {
              console.log(typeof storeArray[i])
              if(typeof storeArray[i] == "string") {
               console.log("JAAAH IG STINRG!")
               return storeArray[i];
                
              } 

            }
            
          }
}

            


}
