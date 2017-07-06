import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {MdSnackBar} from '@angular/material';


@Injectable()
export class SettingsService {
  
  constructor(
    private localStorageService: LocalStorageService,
    public snackBar: MdSnackBar
    ) { 
    
    // Add default values if localStorage was empty
      if(this.localStorageService.get("settings") === null) {

        this.loadDefaults();
        console.info("localStorage(settings) was empty, forced to load Defaults!", this.settings);
      } else {
        this.getSettingsFromLocalStorage();
        console.info("localStorage(settings) has been read!", this.settings);
      }
    
    
    
  }



public settings:Settings;
private defaultStoresGroups: StoreGroup[] = [
  {
    id:0,
    slug: "diverses",
    name: "Diverses",
    icon: "stores_diverses.svg"
  },
  {
    id:1,
    slug: "migros",
    name: "Migros Genossenschaft",
    icon: "stores_migros.svg"
  },
  {
    id:2,
    slug: "coop",
    name: "Coop",
    icon: "stores_coop.svg"
  },
  {
    id:3,
    slug: "apotheken",
    name: "Apotheken",
    icon: "stores_apotheke.svg"
  },
  {
    id:4,
    slug: "blumen",
    name: "Blumenladen",
    icon: "stores_blumen.svg"
  },
  {
    id:5,
    slug: "denner",
    name: "Denner",
    icon: "stores_denner.svg"
  }

  /*
  {
    id:0,
    slug: "",
    name: "",
    icon: "stores_.svg"
  }
  */

];


private defaultStores: Array<Store> = [
      { 
        id: 11, 
        name: 'Migros Bielerhof', 
        slug: 'Bielerhof Migros',
        group: 1,
        address: "Beispielstrasse", 
        customerCount: 1,
        lat: 47.134946,
        lng: 7.244083
      },
      { 
        id: 12, 
        name: 'Migros Neumarkt', 
        slug: 'Neumarkt Migros',
        group: 1,
        address: "Testweg 12", 
        customerCount: 3,
        lat: 47.140773,
        lng: 7.247239
      },
      { 
        id: 11, 
        name: 'Migros Madretsch', 
        slug: 'Madretsch Migros',
        group: 1,
        address: "Beispielsgasse 23", 
        customerCount: 1,
        lat: 47.131820,
        lng: 7.252453
      },
      { 
        id: 1, 
        name: 'Migros Bözingen', 
        slug: 'Bözingen Migros',
        group: 1,
        address: "Beispielstrasse", 
        customerCount: 1,
        lat: 47.152059,
        lng: 7.267360
      },


      // COOP
       { 
        id: 1, 
        name: 'Coop Megastore Bahnhof', 
        slug: 'Bahnhof Coop',
        group: 2,
        address: "ba", 
        customerCount: 1,
        lat: 47.130289,
        lng: 7.242938
      },
       { 
        id: 1, 
        name: 'City Coop', 
        slug: 'City Coop',
        group: 2,
        address: "", 
        customerCount: 1,
        lat: 47.139634,
        lng: 7.246738
      },


      // APOTHEKEN
      { 
        id: 1, 
        name: 'Apotheke 55', 
        slug: 'Apotheke 55',
        group: 3,
        address: "", 
        customerCount: 1,
        lat: 47.136515,
        lng: 7.246271
      },
      { 
        id: 1, 
        name: 'City Apotheke', 
        slug: 'City-Apotheke',
        group: 3,
        address: "", 
        customerCount: 1,
        lat: 47.135559,
        lng: 7.245548
      },
      { 
        id: 1, 
        name: 'Hilfiker Apotheke', 
        slug: 'Hilfiker',
        group: 3,
        address: "", 
        customerCount: 1,
        lat: 47.132895,
        lng: 7.244160
      },
      { 
        id: 1, 
        name: 'Apotheke Dufour', 
        slug: 'Pharmacie dufour',
        group: 3,
        address: "", 
        customerCount: 1,
        lat: 47.142241,
        lng: 7.252614
      },
      { 
        id: 1, 
        name: 'Battenberg Apotheke', 
        slug: 'Battenberg Apotheke',
        group: 3,
        address: "", 
        customerCount: 1,
        lat: 47.143053,
        lng: 7.272842
      },
      { 
        id: 1, 
        name: 'Madretsch Apotheke', 
        slug: 'Madretsch-Apotheke',
        group: 3,
        address: "", 
        customerCount: 1,
        lat: 47.132033,
        lng: 7.251996
      },

      { 
        id: 1, 
        name: 'Bözingen Apotheke', 
        slug: 'Bözingen Apotheke',
        group: 3,
        address: "", 
        customerCount: 1,
        lat: 47.152504,
        lng: 7.267005
      },


      // DENNER
      { 
        id: 11, 
        name: 'Denner Florastrasse', 
        slug: 'Denner Florastrasse',
        group: 5,
        address: "", 
        customerCount: 5,
        lat: 47.138405,
        lng: 7.247312
      },
      { 
        id: 1, 
        name: 'Denner Bielerhof', 
        slug: 'Denner Bielerhof',
        group: 5,
        address: "", 
        customerCount: 1,
        lat: 47.134999,
        lng: 7.244166
      },
      { 
        id: 1, 
        name: 'Denner Silbergasse', 
        slug: 'Denner Silbergasse',
        group: 5,
        address: "", 
        customerCount: 1,
        lat: 47.134980,
        lng: 7.249562
      },
      { 
        id: 1, 
        name: 'Denner Bözingen', 
        slug: 'Denner Bözingen',
        group: 5,
        address: "", 
        customerCount: 1,
        lat: 47.150470,
        lng: 7.263020
      },
      { 
        id: 1, 
        name: 'Denner Poststrasse (Mett)', 
        slug: 'Denner Poststrasse',
        group: 5,
        address: "", 
        customerCount: 1,
        lat: 47.146270,
        lng: 7.272325
      },
      { 
        id: 1, 
        name: 'Florever', 
        slug: 'Florever',
        group: 4,
        address: "", 
        customerCount: 1,
        lat: 47.133128,
        lng: 7.245424
      },
      { 
        id: 1, 
        name: 'Sunneblueme', 
        slug: 'Sunne-Blume Biel-Mett',
        group: 4,
        address: "", 
        customerCount: 1,
        lat: 47.146341,
        lng: 7.273550
      },
      { 
        id: 1, 
        name: 'Genossenschaft Wein (EGB)', 
        slug: 'Einkaufsgenossenschaft EGB',
        group: 0,
        address: "Schwanengasse", 
        customerCount: 1,
        lat: 47.137421,
        lng: 7.253906
      },
      { 
        id: 1, 
        name: 'Manor', 
        slug: 'Manor',
        group: 0,
        address: "", 
        customerCount: 1,
        lat: 47.137581,
        lng: 7.245810
      },
      { 
        id: 1, 
        name: 'Confiserie Progin', 
        slug: 'Progin',
        group: 0,
        address: "", 
        customerCount: 1,
        lat: 47.135585,
        lng: 7.244915
      }
    ]


public saveSettingsToLocalStorage(settingsObj:Object) {
    this.localStorageService.set("settings", settingsObj);
    console.log("saveSettingsToLocalStorage", settingsObj);
    this.snackBar.open('Die Einstellungen wurden gespeichert','', { duration: 3000  });
}
private getSettingsFromLocalStorage() {
    //this.settings = this.localStorageService.get("settings");
    console.log(this.localStorageService.get("settings"));
    this.settings = this.localStorageService.get("settings") as Settings;
    
}
public getStoreGroupSlug(id) {
    let index = this.settings.storesGroups.map(function(e) { return e.id; }).indexOf(id);
    return this.settings.storesGroups[index].slug;
}
public getStoreGroupById(id:number) {
    let index = this.settings.storesGroups.map(function(e) { return e.id; }).indexOf(id);
    return this.settings.storesGroups[index];
}
public getStoreGroupImage(id, type?:string) {
    
    // get index 
    let index = this.settings.storesGroups.map(function(e) { return e.id; }).indexOf(id);
    
    // failsafe detection of the type
    let suffix = (type == "full") ? "full" : "icon";

    // if not found return undefine image
    if("undefined" === typeof this.settings.storesGroups[index]) {
      return "assets/icons/stores/undefined_" + suffix + ".svg";
    } else {
      return "assets/icons/stores/" + this.settings.storesGroups[index].slug + "_" + suffix + ".svg";
    }
    
}

public loadDefaults() {
    this.settings = {
      filters: {
        noOrdersSinceDays: 100,
        amountForReturningClients: 2
      },
      workspace: {
        name:"1-2-Domicile",
        slug: "12d"
      },
      stores: this.defaultStores,
      storesGroups: this.defaultStoresGroups,
      importAssistant: {
        workspace: "12d",
        fileHasHeader: true
      }
    }
    this.saveSettingsToLocalStorage(this.settings);
    this.snackBar.open('Die Standardeinstellungen wurden geladen', '', { duration: 3000  });
    return this.settings;  
}




}

export interface Settings {
  filters: Object;
  workspace: Object;
  stores: Array<Store>;
  storesGroups: Array<StoreGroup>;
  importAssistant: any;
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
  icon: string;
}
