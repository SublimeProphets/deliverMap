import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { SettingsService } from "../settings.service";
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
// import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import {Observable, Subject, Subscription} from "rxjs";
import {Http} from "@angular/http";

import * as myGlobals from "../globals";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  encapsulation: ViewEncapsulation.None
})



export class SettingsComponent {

  constructor(
    private settingsService: SettingsService, 
    public dialog: MdDialog
  ) { 
    this.settings = settingsService.settings;
    this.workspaceSlug = this.settings.workspace.slug;
    
    
    // Add a timestamp to update table accordingly if not set 
    this.settings.storesGroups = this.settings.storesGroups.map(function(element) {
      if(typeof element.updated == "undefined") {
        element.updated = Date.now().toString();
      }
      return element;
    });
    
  }
  settings: any;
  workspaceSlug:string;
  
  

  



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




  private updateStoreStuff(result: any, basement: string, isNew:boolean) {

      // Base determines if its a group or a store
      let baseObj = (basement == "stores") ? this.settings.stores : this.settings.storesGroups;


      console.group("editStoreGroup dialogRef.AfterClosed()");
      switch(typeof result) {

        case "boolean":
          console.log("do nothing due to abort");
        break;

        case "string":
          // Add new one
         
          
        break;

        case "number":
          let index = baseObj.map(function(e) { return e.id; }).indexOf(result);
          baseObj.splice(index, 1);
          console.log("i wanna delete this fucker");
        break;

        default:
             if(isNew) {
              console.log("is New one");

              // Figure out the highest id 
              let highestIDsoFar = Math.max.apply(Math,baseObj.map(function(o){return o.id;}))
              console.log("highest ID", highestIDsoFar);

              // Add 1 to the highest ID and set it as a property
              result.id = highestIDsoFar + 1;

              baseObj.push(result);
          } else {

            // abort the script it undefined -> happens when user close the window through clicking the shadow-layer
            if(typeof result == "undefined") {
              return;
            }
            console.log("update existing one", result);
            
 
            // figure out index
            let index = baseObj.map(function(e) { return e.id; }).indexOf(result.id);


            // TODO cheap  dirty forcing of reload through splicing the array and then add it again. 
            baseObj[index].name = result.name;
            baseObj[index].slug = result.slug;
            baseObj[index].updated = Date.now().toString();;
            
            if(basement == "stores") {
              this.settings.stores = baseObj;
            } else {
             this.settings.storesGroups = baseObj; 
            }

            
            this.saveSettings();

              
              
      

          }
        break;
      }
      
      // Save store to the localStorage
      
      // this.settings = this.settingsService.settings;
      
      
      //this.settings = this.settingsService.settings;
console.log("my groups after working", this.settings.storesGroups);


  }


  public editStore(id:any): void {
    let isNew = (id == "new") ? true : false;
    let storeObj = (id == "new") ? {} : this.settings.stores[id];

    let dialogRef = this.dialog.open(EditStoreDialog, {
      data: {
        store: storeObj,
        storesGroups: this.settings.storesGroups,
        isNew: isNew
      },
      width: "500px"
    });
    
    dialogRef.afterClosed().subscribe((result) => {this.updateStoreStuff(result, "stores", isNew)});
  }
  public editStoresGroup(event:any): void {
    console.log("editStoresGROUPS",event);
   
    let store = (event == "new") ? {} : this.settingsService.getStoreGroupById(event.row.id);
    let isNew = (event == "new") ? true : false;
    let dialogRef = this.dialog.open(EditStoreGroupDialog, {
      data: {
        groups:store,
        isNew: isNew
      },
      width: "400px"
    });

    dialogRef.afterClosed().subscribe((result) => {this.updateStoreStuff(result, "storesGroups", isNew)});
    console.groupEnd();
  }  




}


@Component({
  selector: 'editStoreDialog',
  templateUrl: 'edit-store-dialog.template.html',
  styleUrls: ['./settings.component.less']
})
export class EditStoreDialog {
  tmpData: any;
  storesGroups: any;
  isNew:boolean
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.tmpData = data.store;
    this.storesGroups = data.storesGroups;
    this.isNew = data.isNew;
    
  }
}

@Component({
  selector: 'editStoreGroupDialog',
  templateUrl: 'edit-store-group-dialog.template.html',
  styleUrls: ['./settings.component.less']
})
export class EditStoreGroupDialog {
  tmpData: any;
  isNew: boolean;
  public uploader: FileUploader = new FileUploader({ url: myGlobals.hostURL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public uploadFeedback: any;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(@Inject(MD_DIALOG_DATA) public data: any, private http:Http) {
    this.tmpData = JSON.parse(JSON.stringify(data.groups));
    this.tmpData.slugOriginal = this.tmpData.slug;
    this.isNew = data.isNew;
    this.uploadFeedback = {
      full: "Bitte Datei auswählen und einfügen",
      icon: "Bitte Datei auswählen und einfügen"
    }

    //uploader
    

  }

  fileChange(event, slug, size) {
    
    

    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        formData.append("type", "file");
        formData.append("filename", slug);
        formData.append("size", size);
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        this.http.post(myGlobals.hostURL, formData)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                (data) => {
                  if(typeof data.error !== "undefined") {
                    this.uploadFeedback[size] = data.error;
                  } else {
                    this.uploadFeedback[size] = "Logo (" + size + ") erfolgreich hochgeladen";
                    this.tmpData.image[size] = data.fileurl + '?random=' + Date.now();
                    console.log(this.tmpData.image[size]);
                  }
                  
                  console.log('success', data);

                },
                (error) => {
                  this.uploadFeedback[size] = error;
                }
            )
    }
}
}
