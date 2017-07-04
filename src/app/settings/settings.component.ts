import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from "../settings.service";
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService, public dialog: MdDialog) { 
    this.settings = settingsService.settings;
    this.workspaceSlug = this.settings.workspace.slug;
  }
  settings: any;
  workspaceSlug:string;
  val: any;

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


  public editStore(index:number): void {
    let store = this.settings.stores[index];

    let dialogRef = this.dialog.open(EditStoreDialog, {
      data: store,
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
      // Save store to the localStorage
      console.log("closed", result);
    });
  }


}


@Component({
  selector: 'editStoreDialog',
  templateUrl: 'edit-store-dialog.template.html',
  styleUrls: ['./settings.component.less']
})
export class EditStoreDialog {
  tmpData: any;
  constructor(@Inject(MD_DIALOG_DATA) public store: any) {
    this.tmpData = store;
    console.log("woot dialog has", store);
  }
}