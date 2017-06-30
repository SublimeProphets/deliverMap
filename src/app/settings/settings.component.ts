import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { 
    this.settings = settingsService.settings;
    this.workspaceSlug = this.settings.workspace.slug;
  }
  settings: any;
  workspaceSlug:string;

  ngOnInit() {}


  public saveSettings() {
    this.settingsService.saveSettingsToLocalStorage(this.settings);
  }
  public loadDefaults() {
    this.settings = this.settingsService.loadDefaults();
  }

  public workspaceChanged() {
    let workspaceObj: Object;

    switch(this.workspaceSlug) {
      case "12d":
        workspaceObj = {
          slug: "12d",
          name: "1-2-Domicile"
        }
      break;

      case "wili":
        workspaceObj = {
          slug: "wili",
          name: "Service Wili"
        }
      break;
    }

    // Add to the settings-Obj
    this.settings.workspace = workspaceObj;


  }


}
