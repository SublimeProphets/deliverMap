import { Component, OnInit } from '@angular/core';
import { Store, STORES } from '../stores/stores.component';


@Component({
  selector: 'storenavigation',
  templateUrl: './storenavigation.component.html',
  styleUrls: ['./storenavigation.component.css']
})
export class StorenavigationComponent {


  

  stores: Store[] = STORES;
  

  
}
