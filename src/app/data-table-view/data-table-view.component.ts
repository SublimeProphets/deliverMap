import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client.component';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'data-table-view',
  templateUrl: './data-table-view.component.html',
  styleUrls: ['./data-table-view.component.css']
})


export class DataTableViewComponent implements OnInit {


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

