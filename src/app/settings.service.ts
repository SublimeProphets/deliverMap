import { Injectable, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { MdSnackBar } from '@angular/material';
import {Http, URLSearchParams} from "@angular/http";
import * as myGlobals from "./globals";
import {Observable} from "rxjs";
import { CLIENTS } from './client/client.mock';

@Injectable()
export class SettingsService {

  datastorageMode: string;
  seetingsHasBeenUpdated: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private localStorageService: LocalStorageService,
    public snackBar: MdSnackBar,
    private http:Http
  ) {

    
    // First load defaults so it does not fail completely
    this.loadDefaults();

    // Check with datastorage is active - for that check if we have localstorage and PHP 
    if (this.localStorageService.get("isDatastorageLocal") === null) {
      
      this.readPHPsettingsIfTrue();

    } else {


      if(this.localStorageService.get("isDatastorageLocal") == true) {
        this.datastorageMode = "local";
        this.getSettingsFromLocalStorage();
      } else {
        this.datastorageMode = "php";
        this.readPHPsettingsIfTrue();
      }


       
    }

/*
    // Add default values if localStorage was empty
    if (this.localStorageService.get("settings") === null) {

      this.loadDefaults();
      console.info("localStorage(settings) was empty, forced to load Defaults!", this.settings);
    } else {
      this.getSettingsFromLocalStorage();
      console.info("localStorage(settings) has been read!", this.settings);
    }
    */
  }

  private readPHPsettingsIfTrue() {
    
    this.changeDatastorage("local");

    // Temporarly deactivated 

    /*
    this.phpRequest("isDatastoragePHP", false).subscribe((data) => {
        
        // state is false, then activate localStorage
          if(!data.state)  {
            // if PHP also don't know it is activated, fallback on local storage
            this.changeDatastorage("local");
          } else {
            
            // Yes, PHP is activated, so let's read the settings!!
            this.phpRequest("settings").subscribe((data) => {
              
              this.settings = data.result;
              this.seetingsHasBeenUpdated.emit(true);
              console.log("YES I SET PHP SETTINGS NOW", this.settings);
            })

          }
      }, (err) => {
        console.log("getDatastorage subscribe, i failed", err);
      });
      */
  }

  public changeDatastorage(slug:string) {
    
    switch(slug) {
      case "local":
        this.localStorageService.set("isDatastorageLocal", true);
        this.phpRequest("isDatastoragePHP", "false");
        this.datastorageMode = "local";
        this.settings.datastorage = "local";
        this.saveSettings(this.settings);
      break;
      
      case "php":
        this.localStorageService.set("isDatastorageLocal", false);
        this.phpRequest("isDatastoragePHP", "true").subscribe((data) => { 
          console.log(data)
          this.datastorageMode = "php";
          this.settings.datastorage = "php";
          this.saveSettings(this.settings);
      
    });
        
      break;
    }


  }

  public saveAnotherSetting(name, content) {
    if(this.settings.datastorage == "local") {
      this.localStorageService.set(name, content);
    } else {
      this.phpRequest(name, content);
    }
  }

  

  private phpRequest(name, content?):Observable<any> {
    
    /*
    let typeDetector = (typeof content == "undefined") ? "getDatastorage" : "setDatastorage";
    let con = (typeof content == "undefined") ? "" : content;

    let submitData = {
      type: typeDetector,
      name: name,
      content: con
    }
    console.log("http submitData", submitData);
    */ 
    let data = new URLSearchParams();

     if (typeof content == "undefined" || content == false) {
        console.log("getDatastorage");
        data.append('type', "getDatastorage");    
     } else {
       console.log(content);
       data.append('type', "setDatastorage");    
       data.append('content', JSON.stringify(content));    
     }

     // append name in all cases
     data.append('name', name);    

    return this.http.post(myGlobals.hostURL, data)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
  }


  public settings: any;
  private defaultStoresGroups: StoreGroup[] = myGlobals.DEFAULT_STORESGROUPS


  private defaultStores: Array<Store> = myGlobals.DEFAULT_STORES;

public setClients(clients, workspace?:string) {
  
  let ws = (typeof workspace !== "undefined") ? workspace : this.settings.workspace.slug;
  
  this.settings.clients[ws] = clients;
  this.saveSettings();
}
public getClients(workspace?) {
  let ws = (typeof workspace !== "undefined") ? workspace : this.settings.workspace.slug;
  return this.settings.clients[ws];
}

  public saveSettings(settingsObj?: Object) {
      settingsObj = (typeof settingsObj == "undefined") ? this.settings : settingsObj;

    if(this.datastorageMode == "local") {
      this.localStorageService.set("settings", settingsObj);
      // console.log("saveSettings", settingsObj);

      // TODO: not nice to just reload the website - make a way to force clientsService to reload clients if settings.workspace.slug changed
      window.location.reload();
      
    } else {

      this.phpRequest("settings", settingsObj).subscribe((result) => {
        console.log("tried to save settings", result);

        // TODO: not nice to just reload the website - make a way to force clientsService to reload clients if settings.workspace.slug changed
        window.location.reload();
        
    });;
  }
  


this.snackBar.open('Die Einstellungen wurden gespeichert', '', { duration: 3000 });
    
  }
  private getSettingsFromLocalStorage() {
    //this.settings = this.localStorageService.get("settings");
    console.log(this.localStorageService.get("settings"));
    this.settings = this.localStorageService.get("settings") as Settings;

  }
  public getStoreGroupSlug(id) {
    let index = this.settings.storesGroups.map(function (e) { return e.id; }).indexOf(id);
    return this.settings.storesGroups[index].slug;
  }
  public getStoreGroupById(id: number) {
    let index = this.settings.storesGroups.map(function (e) { return e.id; }).indexOf(id);
    return this.settings.storesGroups[index];
  }

  public getStoreGroupIdBySlug(slug: string):number {
    let index = this.settings.storesGroups.map(function (e) { return e.slug; }).indexOf(slug);
    if(index > 0 ) {
      return this.settings.storesGroups[index].id;
    } else {
      return 0;
    }

    
  }
  public getStoreGroupImage(element, type?: string) {
  
    let index;

    // failsafe detection of the type
    let suffix = (type == "full") ? "full" : "icon";

    // if not found return undefine image
    if ("object" != typeof this.settings.storesGroups[element]) {
      
      return "assets/icons/stores/undessfined_" + suffix + ".svg";
    } else {
      
      return "assets/icons/stores/" +this.settings.storesGroups[element].slug +"_" + suffix + ".svg";
    }

  }

  public loadDefaults(writeToLocalStorage?:boolean  ) {
    this.settings = {
      filters: {
        noOrdersSinceDays: 100,
        amountForReturningClients: 5,
        predefined: [
          {
            name: "top",
            label: "Top Kunden"
          },
          {
            name: "new",
            label: "Neuste Kunden"
          },
          {
            name: "returning",
            label: "Wiederkehrende Kunden"
          },
          {
            name: "loworders",
            label: "Wenig bestellungen"
          },
          {
            name: "longago",
            label: "Lange keine Bestellungen"
          },
          {
            name: "starred",
            label: "Favoriten"
          }
        ]
      },
      workspace: myGlobals.DEFAULT_WORKSPACES.domicile,
      datastorage: "local",
      map: {
        center: {
          lat: 47.1367785,
          lng: 7.2467909
        },
        zoom: 14,
        minZoom: 11,
        maxZoom: 18
        
      },
      stores: this.defaultStores,
      storesGroups: this.defaultStoresGroups,
      clients: {
        domicile: CLIENTS,
        wili: CLIENTS
      },
      importAssistant: {
        workspace: "domicile",
        fileHasHeader: true,
        lastImportDate: 0,
        importResults: {
          showSuccess: true,
          showCorrupt: true,
          showSkipped: false
        }
      },
      search: {
        filters: {
          clients: {
            active: true,
            name: "Kunden"
          },
          stores: {
            active: false,
            name: "Geschäfte"
          },
          places: {
            active: true,
            name: "Orte / Strassen"
          }
        }
      }
    }
    if(writeToLocalStorage) {
      this.saveSettings(this.settings);
      this.snackBar.open('Die Standardeinstellungen wurden geladen', '', { duration: 3000 });
    }
    
    return this.settings;
  }





}

export interface Settings {
  filters: any;
  workspace: any;
  stores: Array<Store>;
  storesGroups: Array<StoreGroup>;
  importAssistant: any;
  search: any;
  datastorage: string;
  map: any;
}


export interface Store {
  id: number;
  name: string;
  slug: string;
  group: any; // write always lowercase
  address?: string;
  city?: string;
  plz?: number;
  customerCount?: number;
  lat?: number;
  lng?: number;
  type?: string;
}

export interface StoreGroup {
  id: number;
  name: string;
  slug?: string;
  image: {
    full: string,
    icon: string
  }
}
