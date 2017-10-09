import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../client/client.component';
import { ClientsService } from '../clients.service';
import { SettingsService } from "../settings.service";

@Component({
  selector: 'data-table-view',
  templateUrl: './data-table-view.component.html',
  styleUrls: ['./data-table-view.component.scss']

})


export class DataTableViewComponent implements OnInit {

  // Get the clients
  constructor(
    private clientsService: ClientsService,
    private settingsService: SettingsService) { 
      this.workspace = this.settingsService.settings.workspace.slug;
    }
  workspace:string ;
  clients: any;
  offset: number;
  ipp: number = 100;
  itemsPerPage: any;
  @ViewChild('datatable') table: any;

  pageLimit(num: number) {
    this.ipp = Number(num);
    this.table.pageSize = Number(num);
  }

  onPage(event) {
    this.table.limit = Number(this.itemsPerPage.value);
    this.offset = event.offset;
  }

  public updateClient(id, client) {
    this.clientsService.updateClient(id, client);
  }


  getClients(): void {
    this.clients = this.clientsService.getClients();
  }

  
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

