import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../client/client.component';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'data-table-view',
  templateUrl: './data-table-view.component.html',
  styleUrls: ['./data-table-view.component.scss']
  
})


export class DataTableViewComponent implements OnInit {

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];


offset: number;
ipp: number = 100;
itemsPerPage:any;

// itemsPerPage = new FormControl('100');

@ViewChild('datatable') table: any;

pageLimit(num: number) {
  console.log(num);
    this.ipp = Number(num);
    this.table.pageSize = Number(num);
  }

onPage(event) {
    this.table.limit = Number(this.itemsPerPage.value);
    this.offset = event.offset;
  }



  // Get the clients
  constructor(private clientsService: ClientsService) { }

  clients: any;
  
  getClients(): void {
   
   this.clients = this.clientsService.getClients();
    
   //  console.log(this.clients)
  }
  
  /*
  // Toggles the "starred" state
  onSelect(selectedClient:any) {

    // interpole starred status
    var starredState:boolean = (selectedClient.starred) ? false : true;
    
    this.clientsService.setClientStarred(selectedClient.id, starredState);
  }
  */

  // Actually calls the client from the service and provides them instantly 
  ngOnInit(): void {
    this.getClients();
    this.clientsService.clientsUpdated.subscribe(
      (input) => {
         this.clients = this.clientsService.getClients();
      }
    );


  }
}

