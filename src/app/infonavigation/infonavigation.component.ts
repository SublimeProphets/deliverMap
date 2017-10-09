import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Client } from '../client/client.component';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'infonavigation',
  templateUrl: './infonavigation.component.html',
  styleUrls: ['./infonavigation.component.less']
})
export class InfonavigationComponent implements OnInit {

@Output() infoToggle = new EventEmitter<boolean>();

  // Get the clients
  constructor(private clientsService: ClientsService) {

    


   }
   filterstate: any = {
    abo: false 
   };
  clients: any;
  myBezirk: any;
  bezirk:Array<Object> = [
    {code: 2500, name: "2500 Stadtzentrum"},
    {code: 2501, name: "2501 Altstadt"},
    {code: 2502, name: "2502 Mett"},
    {code: 2503, name: "2503 Bözingen"},
    {code: 2504, name: "2504 Port"},
    {code: 2506, name: "2506 Vingelz"},
    {code: 2560, name: "2560 Nidau"}
  ];
  
  getClients(): void {
   
   this.clients = this.clientsService.getClients();
    
   //  console.log(this.clients)
  }

  public changeVisible(id: number): void {
    this.clientsService.changeVisible(id);  
  }

  public changeStarred(id:number) {
    // search the index for the id
    var index = this.clients.map(function(e) { return e.id; }).indexOf(id);

    var status = this.clients[index].starred;

    if(status) this.clients[index].starred = false;
    if(!status) this.clients[index].starred = true;

        
  }
  

  // Toggles the "starred" state
  onSelect(selectedClient:any) {    
     this.clientsService.clientSelected(selectedClient.id);
    // this.infoToggle.emit(true);
  }

  // Actually calls the client from the service and provides them instantly 
  ngOnInit(): void {
    this.getClients();
    
    this.clientsService.clientsUpdated.subscribe(
      (input) => {
         this.clients = this.clientsService.getClients();
         console.log("infoliste updated");
      }
    );


    //Check for new visibility
		this.clientsService.visibilityUpdated.subscribe(
      (data) => {
         
         // search the index for the id
    		var index = this.clients.map(function(e) { return e.id; }).indexOf(data.id);
        
        
				
        this.clients[index].visible = data.visible;
      }
    );


  }
}
