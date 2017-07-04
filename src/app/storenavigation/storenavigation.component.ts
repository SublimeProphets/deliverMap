import { Component, OnInit } from '@angular/core';

import { SettingsService, Store, Settings } from "../settings.service";


@Component({
  selector: 'storenavigation',
  templateUrl: './storenavigation.component.html',
  styleUrls: ['./storenavigation.component.css']
})
export class StorenavigationComponent {

  constructor(private settingsService: SettingsService) {
     this.settings = this.settingsService.settings;
     this.stores = this.settings.stores;
     this.storesGroups = this.settings.storesGroups;
  }
  
  settings: Settings;
  stores: Store[];
  storesGroups: any;

  
}
