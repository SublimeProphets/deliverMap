import { Client } from "../client/client.component";
import { ClientsService } from "../clients.service";
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'client-set-starred',
  templateUrl: './client-set-starred.component.html',
  styleUrls: ['./client-set-starred.component.css']
})
export class ClientSetStarredComponent implements OnInit {
  @Input("id")  id:number;
  @Input("state")  starstate:boolean;
  @Input("label")  label:boolean;
  client: Client;
  public starstatename:string;
  
  constructor(private clientsService:ClientsService) {
   
    
 }

  ngOnInit() {
    console.log(this.starstate);
    if(typeof this.starstate == "undefined") this.starstate = false;
    this.starstatename = (this.starstate) ? "star" : "star_border";
  }

  public setStarred():void {
    console.log(this.starstate);
    this.starstate = this.clientsService.setClientStarred(this.id, this.starstate);
    console.log(this.starstate);
    
  }

}
