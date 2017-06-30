import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {MdSnackBar} from '@angular/material';


@Injectable()
export class SettingsService {
  public settings:Object;
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

blahaha: string = "jajaj";

public saveSettingsToLocalStorage(settingsObj:Object) {
    this.localStorageService.set("settings", settingsObj);
    this.snackBar.open('Die Einstellungen wurden gespeichert','', { duration: 3000  });
}
private getSettingsFromLocalStorage() {
    this.settings = this.localStorageService.get("settings");
}

public loadDefaults() {
    this.settings = {
      filters: {
        noOrdersSinceDays: 100
      },
      workspace: {
        name:"1-2-Domicile",
        slug: "12d"
      }
    }
    this.saveSettingsToLocalStorage(this.settings);
    this.snackBar.open('Die Standardeinstellungen wurden geladen', '', { duration: 3000  });
    return this.settings;  
}




}
