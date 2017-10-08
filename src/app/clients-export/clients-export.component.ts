import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../settings.service";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'clients-export',
  templateUrl: './clients-export.component.html',
  styleUrls: ['./clients-export.component.css']
})
export class ClientsExport implements OnInit {

  clients: any;
  keysGetter = Object.keys;
  workspace: string;
  

  // Get the clients
  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    
    
    this.workspace = this.settingsService.settings.workspace.slug;
  }
  public workspaceChanged(workspace) {
    this.workspace = workspace;
  }

  public exportAsCSV() {
    
    
    this.clients = this.settingsService.getClients(this.workspace);
    // Create a export friendly array of clients
    this.clients = this.cleanClients(this.clients);
    
    // Title
    let d = new Date();
    let title = "mdmap_export_" + d.getFullYear() + d.getMonth() + d.getDay() + "_" + d.getHours() +"-" + d.getMinutes() ;
    
     new Angular2Csv(this.clients, title);
  }


private cleanClients(clients) {
  
  // for each client...
  let tmpClients:any = [];
  for(let client in clients) {
    
    // make a new empty object and for each property as defined above...
    let tmpClient = {};
    console.log(this.settingsService.settings.workspace.exportColumns);
    for(let key in this.settingsService.settings.workspace.exportColumns) {
      // For starred we need a special detector to transform "TRUE" into "x" (stupid shit..)
      if(this.settingsService.settings.workspace.exportColumns[key].slug != "starred") {
        // add this property and check if value was undefined
        tmpClient[this.settingsService.settings.workspace.exportColumns[key].slug] = (typeof clients[client][this.settingsService.settings.workspace.exportColumns[key].slug] == "undefined") ? "" : clients[client][this.settingsService.settings.workspace.exportColumns[key].slug];
      } else {
        tmpClient[this.settingsService.settings.workspace.exportColumns[key].slug] = (clients[client][this.settingsService.settings.workspace.exportColumns[key].slug] == true) ? "x" : "";
      }
      
    }
    
    // add to array
    tmpClients.push(tmpClient);
  }
  
  return tmpClients;
}



  


}
