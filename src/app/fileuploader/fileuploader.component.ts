
import { ChangeDetectionStrategy, Component, Input, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { UploadResult } from '../xlsx-file-upload/xlsx-file-upload.component';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../client/client.component';
import { CLIENTS } from '../client/client.mock';
import { ClientsService } from '../clients.service';
import { Subject } from "rxjs/Subject";
import { SettingsService, Settings } from "../settings.service";
import { Http } from "@angular/http";
import * as myGlobals from "../globals";



@Component({
  selector: 'fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
  public uploaderContent: BehaviorSubject<string> = new BehaviorSubject('please drop file in');
  public workspace: any;
  public columns: any;
  public settings: Settings;
  private totalImportCells: number = 0;
  private currentImportCell: number = 0;
  private previousRowNumber: number = 0;
  private uploadResult: any;
  private queue: any;
  //temporary Object for one Client
  private tmpClient: Client[];
  public timePassedSinceImport: Number;
  public totalRows: number = 0; // 
  public progress: any = {
    buffer: 0,
    bufferPercent: 0,
    finished: 0,
    finishedPercent: 0
  }

  public userProgress: number = 1; // represents the numbered md-card's

  @ViewChild('missingtable') missingTable: any;


  importResults: any = {
    success: [],
    missingCoordinates: [],
    failure: []
  };

  constructor(
    private clientsService: ClientsService,
    private settingsService: SettingsService,
    private http: Http

  ) { }

  ngOnInit(): void {

    this.settings = this.settingsService.settings;
    let now = Date();
    this.workspace = this.settings.workspace;
  }

  // Update workspace when user change radiobutton
  public workspaceChanged(workspace) {
    this.workspace = myGlobals.DEFAULT_WORKSPACES[workspace];
  }


  // Called after the file is uploaded
  public xlsxUploaded(result: UploadResult) {

    // Update information
    this.uploaderContent.next("File erfolgreich hochgeladen");
    this.userProgress = 2;

    // Set last importDate
    this.settingsService.settings.importAssistant.lastImportDate = Date();

    // reset progress
    this.progress = {
      buffer: 0,
      bufferPercent: 0,
      finished: 0,
      finishedPercent: 0
    }

    // easier access to ressource
    let res = result.payload[0];
    this.uploadResult = result.payload[0];

    // Check how many row the file contains
    for (var key in res) {
      let num = Number(key.replace(/^\D+/g, ''));
      if (num > this.totalRows) this.totalRows = num;
    }

    // base templated
    this.tmpClient = [<Client>{
      id: previousRow,
      name: "",
      visible: true,
      starred: false,
      selected: false,
      isOpen: false,
      draggable: false,
      label: "A",
      DOMID: "client-id-" + previousRow
    }, <Client>{
      id: previousRow,
      name: "",
      visible: true,
      starred: false,
      selected: false,
      isOpen: false,
      draggable: false,
      label: "A",
      DOMID: "client-id-" + previousRow
    },];




    // needed to check if row matches with previous one
    var previousRow: number = 0;
    var previousCell: string = "";

    // to determine the first rouimport { HttpModule, JsonpModule } from '@angular/http';nd (where we do not have to push the object
    var firstRound: boolean = true;


    var i = 0;
    var ms = Date.now();

    // Iterates all cells
    for (var key in res) {

      let skipToFailure = false;

      // get letter out of cellname
      let keyLetter: string = key.replace(/[0-9]/g, '');

      // get number out of cellname
      let keyNumber: number = Number(key.replace(/^\D+/g, ''));



      // Same row...
      if (keyNumber == previousRow) {

        switch (keyLetter) {


          // Name
          case "A":
            this.tmpClient[previousRow].name = res[key].v;
            break;

          // Addresse
          case "B":
            this.tmpClient[previousRow].address = res[key].v;
            break;

          // Addresse
          case "C":
            this.tmpClient[previousRow].postleihzahl = res[key].v;
            break;

          // PLZ
          case "D":
            this.tmpClient[previousRow].city = res[key].v;
            break;

          // Telephone
          case "E":
            this.tmpClient[previousRow].tel = res[key].v;
            break;

          // eMail oder ServiceTime
          case "G":
            switch (this.workspace.slug) {
              case "domicile":
                this.tmpClient[previousRow].email = res[key].v;
                break;

              case "wili":
                this.tmpClient[previousRow].serviceTime = res[key].v;
                break;
            }
            break;

          // abo oder serviceTyp
          case "F":

            switch (this.workspace.slug) {
              case "domicile":
                this.tmpClient[previousRow].abo = res[key].v;
                break;

              case "wili":
                this.tmpClient[previousRow].serviceType = res[key].v;
                break;
            }
            break;

          // DeliveryCount
          case "H":
            this.tmpClient[previousRow].deliveryCount = res[key].v;
            break;

          // defaultStore
          case "I":
            this.tmpClient[previousRow].defaultStore = res[key].v;

            // get StoreGroup
            let index = this.settingsService.settings.stores.map(function (e) { return e.slug; }).indexOf(res[key].v);

            // if not found set 0 
            let storeGroup = (index == -1) ? 0 : this.settingsService.settings.stores[index].group;

            // set as property
            this.tmpClient[previousRow].storeGroup = storeGroup;

            break;

          // lastDeliveryDate
          case "J":
            // LBS 
            // this.tmpClient[previousRow].lastDeliveryDate = new Date((parseInt(res[key].v) - (25567 + 1)) * 86400 * 1000);

            // already conform
            this.tmpClient[previousRow].lastDeliveryDate = res[key].v;

            break;

          //FirstOrderDate
          case "K":
            this.tmpClient[previousRow].firstOrderDate = res[key].v;
            //this.tmpClient[previousRow].firstOrderDate = new Date((parseInt(res[key].v) - (25567 + 1)) * 86400 * 1000);
            break;

          // Starred
          case "L":
            this.tmpClient[previousRow].starred = (res[key].v == "true") ? true : false;
            break;

          // Comments
          case "M":
            this.tmpClient[previousRow].comments = res[key].v;
            break;

          // Latitude
          case "N":


            if (res[key].v !== 0 && typeof res[key].v == "number") {
              this.tmpClient[previousRow].lat = res[key].v;
            }
            break;

          //Longitude
          case "O":

            if (res[key].v !== 0 && typeof res[key].v == "number") {
              this.tmpClient[previousRow].lng = res[key].v;
            }
            break;

        }
        // this.tmpClient = {name:res[key]};


      } else {

        if (skipToFailure) {

          this.importResults.failure.push(this.tmpClient[previousRow]);
        } else {





          if (!firstRound) {

            //Lookup group membership








            // Finally 
            if ("undefined" === typeof this.tmpClient[previousRow].lat || "undefined" === typeof this.tmpClient[previousRow].lat) {

              if (typeof this.tmpClient[previousRow].address == "undefined") {

                this.importResults.missingCoordinates.push(this.tmpClient[previousRow]);
              } else {
                this.updateProgess(false);

                // Add coordinates
                let latLng = this.getCoordinates(this.tmpClient[previousRow].address + ", " + this.tmpClient[previousRow].postleihzahl + " " + this.tmpClient[previousRow].city, previousRow, i).subscribe(
                  (res) => {

                  },
                  err => {

                  }
                );
              }

            } else {

              // once true once false to increae buffer as well as finished
              this.updateProgess(false);
              this.updateProgess(true);

              // i already have coordinates
              this.importResults.success.push(this.tmpClient[previousRow]);
            }




          }

          // update previousRow stuff
          if (keyNumber != 0 && keyNumber != previousRow) previousRow = keyNumber;


          // New Row, new Object - we can already add Name here
          this.tmpClient[previousRow] = <Client>{
            id: previousRow,
            name: res[key].v,
            visible: true,
            selected: false,
            isOpen: false,
            draggable: false,
            label: "A",
            DOMID: "client-id-" + previousRow,
          };

          // Yes, we executed it at least once
          firstRound = false;
          i++;

        }
      }
    }
  }


  numKeys(o) {
    var res = 0;
    for (var k in o) {
      if (o.hasOwnProperty(k)) res++;
    }
    return res;
  }

  private updateProgess(isFinished): void {

    if (isFinished) {
      this.progress.finished++
      this.progress.finishedPercent = 100 / this.totalRows * this.progress.finished;

      // Check if finished
      if (this.progress.finishedPercent >= 99) this.userProgress = 3;

    } else {
      this.progress.buffer++;
      this.progress.bufferpercent = 100 / this.totalRows * this.progress.buffer;
    }
    console.info("progress:", this.progress.finishedPercent, this.progress.finished);
  }


  // Lookup the stores objects to find the right group membership. StoreSlugString has to be any because it may also pass undefined.
  private lookupStoreGroup(storeSlugString: any): string {
    if (typeof storeSlugString === "undefined") {
      return "unknown";
    } else {
      let storeArray = this.settingsService.settings.stores.map(function (e) { if (e.slug == storeSlugString) return e.group });
      for (var i = 0; i <= storeArray.length; i++) {
        if (typeof storeArray[i] == "string") {
          return storeArray[i];

        }

      }

    }
  }


  private getCoordinates(address, index, iteration) {


    var combinedAndEncodedSearchString = encodeURIComponent(address);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + combinedAndEncodedSearchString + '&key=AIzaSyChYDkxrB4vvRYBVUI459bTyvMhXo6oOTE';

    return this.http.get(url).map(
      res => {
        if (res.status < 200 || res.status >= 300) {
          this.importResults.failure.push(this.tmpClient[index]);
        } else {
          const response = res.json();
          let filtered;

          // Just get the locations, containing 2 properties lng and lat 
          if ("undefined" !== typeof response.results[0]) {

            filtered = response.results[0].geometry.location;
            this.tmpClient[index].lat = filtered.lat;
            this.tmpClient[index].lng = filtered.lng;
            this.importResults.success.push(this.tmpClient[index]);

          } else {

            filtered = { lng: 0, lat: 0 }
            this.importResults.missingCoordinates.push(this.tmpClient[index]);
          }

          // update status
          this.updateProgess(true);


        }



      },
      // onComplete
      () => {

      }
    )
  }


  // Todo old editing try
  editing: {};
  updateValue(event, cell, cellValue, row) {
    
    this.editing[row.$$index + '-' + cell] = false;
    this.importResults[row.$$index][cell] = event.target.value;
  }

  // Opens the row in the missing section
  lastOpenedRow: any = false;
  public toggleExpandRow(row) {

    // Close previous one
    if (this.lastOpenedRow !== false) this.missingTable.rowDetail.toggleExpandRow(this.lastOpenedRow);

    // Open the new
    this.missingTable.rowDetail.toggleExpandRow(row);

    // remember the old one
    this.lastOpenedRow = row;
  }


  public updateRow(id, values) {
    
    let index = this.importResults.missingCoordinates.map(function (e) { return e.id; }).indexOf(id);

    this.importResults.missingCoordinates.splice(index, 1);
    this.importResults.success.push(values);

  }
  public saveImportedData(): void {

    // Calculate topusers

    // first sort string
    this.importResults.success.sort(this.predicateBy("deliveryCount")).reverse();

    // then add ranking as property
    for (let i = 0; i < this.importResults.success.length; i++) {
      this.importResults.success[i].ranking = i + 1;
    }



    this.clientsService.updateStorage(this.importResults.success, true);
  }
  private predicateBy(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }
}
