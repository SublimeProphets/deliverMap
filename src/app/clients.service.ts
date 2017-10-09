import { Injectable, EventEmitter } from '@angular/core';
import { Client } from './client/client.component';
import { CLIENTS } from './client/client.mock';
import { LocalStorageService } from 'angular-2-local-storage';
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { OrderbyPipe } from "./orderby.pipe";
import { SettingsService } from "./settings.service";
import { FILTERSTATEORG } from "./globals";



@Injectable()
export class ClientsService {

  clients: any; // current working array (filtered and all...)
  clientsOriginal: any; // Full clients as saved
  public filterstate: any; //readable object which determines the states for the filters.component and more
  private timestamp: any; // for time calculations


  constructor(
    private localStorageService: LocalStorageService,
    private settingsService: SettingsService,
    private http: Http
  ) {

    // For Date calculations
    this.timestamp = Date.now();
    this.filterstate = JSON.parse(JSON.stringify(FILTERSTATEORG));

    // Initially load clients from localstorage or PHP
    this.clients = this.settingsService.getClients();
    this.clientsOriginal = this.clients;

    // Listen for settings updates and rebuild clients if needed.
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




  // function to update the clients with a new array
  public updateStorage(input: any, isOriginalData: boolean) {
    this.clients = input;
    if (isOriginalData) {
      this.clientsOriginal = input;
      this.settingsService.setClients(this.clientsOriginal);
    }
  }

  private fetchStorage() {
    return this.clients;
  }

  private removeStorage() {
    this.clientsUpdated.emit(true);
    this.clients = [];
    return this.localStorageService.remove("clients");
  }

  public emitUpdate() {
    return this.clientsUpdated.emit(true);
  }

  // restores original array of clients
  private resetFilter() {
    this.filterstate = JSON.parse(JSON.stringify(FILTERSTATEORG));
    this.clients = this.clientsOriginal;
    this.updateStorage(this.clients, false);
    this.emitUpdate();
  }

  // will be called through routing (map/filter/XYZ) or straight from filters.component.ts
  public controlFilter(basetype: string, name: string, status?: any, value?: any) {
    switch (basetype) {

      case "reset":
        this.resetFilter();
        break;

      case "custom":
        // activate customfiltering
        this.filterstate._active = true;
        this.filterstate.custom._active = true;
        this.filterstate.predefined._active = false;

        if (name == "activate") {
          this.filterstate.custom._active = status;

        } else {

          // Update status - it can be undefinied, this is when we only want to activate the checkbox
          if (typeof name != "undefined" && name != "activate")
            this.filterstate.custom[name].active = status;

          // Update value if given
          if (typeof value != "undefined")
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

        switch (name) {

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
            this.setFilter();

            break;

          case "longago":
            this.filterstate.custom.firstOrderDate.active = true;
            let noOrdersSinceDays = this.settingsService.settings.filters.noOrdersSinceDays;
            var d = new Date();
            d.setMonth(d.getDate() - noOrdersSinceDays);
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
    if (!this.filterstate.custom._active && !this.filterstate.predefined._active)
      this.resetFilter();

    // this will be emitted and mainly used by filters to show the amount of filtered clients
    return {
      filterstate: this.filterstate,
      clientsFound: this.clients.length,
      clientsTotal: this.clientsOriginal.length
    };

  }

  // Do the actual filtering...
  setFilter(): void {

    // Copy the array temporarly
    let filteredData = this.clientsOriginal;

    // Filter the whole array
    filteredData = filteredData.filter(client => {

      // default is valid, if no filter triggers it stays valid.
      let isValid = true;


      // ABO
      if (this.filterstate.custom.abo.active) {

        if (this.filterstate.custom.abo.value) {
          isValid = (typeof client.abo == "number") ? true : false;
        } else {
          isValid = (typeof client.abo == "number") ? false : true;
        }
      }


      // STARRED / FAVORIT
      if (this.filterstate.custom.starred.active) {
        if (this.filterstate.custom.starred.value) {
          isValid = (client.starred) ? true : false;
        } else {
          if (typeof client.starred == "undefined") {
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
        isValid = this.compareDates(client.firstOrderDate, this.filterstate.custom.firstOrderDate.value, "validFromDate", );
      }
      // LONG AGO
      if (this.filterstate.custom.longago.active && this.filterstate.custom.longao.value != 0 && isValid) {
        isValid = this.compareDates(client.lastDeliveryDate, this.filterstate.custom.longago.value, "validToDate");
      }

      // DEFAULT STORE
      if (this.filterstate.custom.defaultStore.active && this.filterstate.custom.defaultStore.value && isValid) {
        isValid = (client.defaultStore == this.filterstate.custom.defaultStore.value) ? true : false;
      }

      // RETURNING
      if (this.filterstate.custom.returning.active && this.filterstate.custom.returning.value && isValid) {
        isValid = (client.deliveryCount >= this.filterstate.custom.returning.value) ? true : false;
      }

      // LOW ORDERS
      if (this.filterstate.custom.loworders.active && this.filterstate.custom.loworders.value && isValid) {
        isValid = (client.deliveryCount <= this.filterstate.custom.loworders.value) ? true : false;
      }

      // if still valid, add it to the filtered array
      if (isValid) return client;


    });

    /********** ORDERING AND LIMITS */

    // TOPCLIENTS (has to be seperate so we can sort it and then slice it)
    if (this.filterstate.custom.top.active) {
      filteredData.sort(function (a, b) { return (a.deliveryCount < b.deliveryCount) ? 1 : ((b.deliveryCount < a.deliveryCount) ? -1 : 0); });
      filteredData = filteredData.slice(0, this.filterstate.custom.top.value);
    }


    // finally attach the data to the main array
    this.clients = filteredData;
    this.updateStorage(this.clients, false);
    this.emitUpdate();

  }





  // get a single Client
  getClient(id: number) {
    return this.clients.filter(
      (client) => {
        if (client.id == id) return client
      }
    );

  }

  // get All Clients
  getClients() {
    return this.clients
  }

  getStarredClients() {
    return this.clients.filter(client => {
      if (client.starred) return client
    })
  }


  setClientStarred(id: number, starred: boolean): boolean {

    var index = this.clients.map(function (e) { return e.id; }).indexOf(id);
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


  // compares the entered days with today and calculates how many days are between.
  public daysSinceDate(date): any {

    if (typeof date !== "string") {
      return "Keine"
    } else {
      let now = Date.now();
      let tmpDate = new Date(date); // some mock date
      var milliseconds = tmpDate.getTime();
      return Math.round((now - milliseconds) / (1000 * 60 * 60 * 24))
    }

  }


  // Set a list of clients  
  changeVisible(id: number) {
    // search the index for the id
    var index = this.clients.map(function (e) { return e.id; }).indexOf(id);
    var state = (this.clients[index].visible) ? false : true;
    this.clients[index].visible = state;

    this.visibilityUpdated.emit({ id: id, visible: state });

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
        return filtered;
      }
    )
  }

  private compareDates(clientDate, inputDate, mode) {
    //Check if property exists
    if (typeof clientDate !== "undefined") {

      // calculate clientMS
      clientDate = new Date(clientDate); // some mock date
      let clientMS = clientDate.getTime();

      // calculate InputMS
      inputDate = new Date(inputDate);
      let inputMS = inputDate.getTime();

      let isValid: any;

      switch (mode) {

        // normale methode
        case "validFromDate":

          isValid = ((clientMS - inputMS) >= 1) ? true : false;
          break;

        case "validUntilDate":
          isValid = ((inputMS - clientMS) >= 1) ? true : false;
          break;

      }
      return isValid;
    } else {
      //client has no date so fail
      return false;
    }
  }

}
