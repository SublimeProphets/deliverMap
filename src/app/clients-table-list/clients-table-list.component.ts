import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClientsService } from "../clients.service";
import { SettingsService } from "../settings.service";

@Component({
  selector: 'clients-table-list',
  templateUrl: './clients-table-list.component.html',
  styleUrls: ['./clients-table-list.component.less']
})
export class ClientsTableListComponent implements OnInit {

  @Input("data") data: any;
  @Input("limit") limit: any;
  @Input("quicksearch") quicksearchEnabled: string;
  
  @ViewChild('table') table: any;
  temp = [];
  originalData:any;
  lastOpenedRow:any = false;
  public now:any = Date.now() / 1000;
  public stores:any;
  public deliveryCountRadius: number = 50;
  constructor(
    public clientsService:ClientsService,
    private settingsService:SettingsService
  ) {
  
  }

  ngOnInit() {

    this.originalData = this.data;
    this.stores = this.settingsService.settings.stores;
    console.log(this.quicksearchEnabled, this.limit);
  }
  
  toggleExpandRow(row) {
    
    // Close previous one
    if(this.lastOpenedRow !== false) this.table.rowDetail.toggleExpandRow(this.lastOpenedRow);
    
    // Open the new
    this.table.rowDetail.toggleExpandRow(row);

    // remember the old one
    this.lastOpenedRow = row;
  }

  
  // quicksearch field
  updateFilter(event) {
    let val = event.target.value.toLowerCase();
    if (val != "") {
      this.temp = this.originalData;

      // filter our data
      let temp = this.temp.filter(function (d) {
        let isValid:boolean = false;
        
        isValid = (d.address.toLowerCase().indexOf(val) !== -1 || !val) ? true : false;
        if(!isValid) {
          isValid = (d.name.toLowerCase().indexOf(val) !== -1 || !val) ? true : false;
        }
        
        return isValid
      });


      // update the rows
      this.data = temp;

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    } else {
      // empty value, so load the complete dataset
      this.data = this.originalData;
    }

  }

  // Toggles the "starred" state
  public showOnMap(id:number) {    
     this.clientsService.clientSelected(id);    
  }
  public changeVisible(id: number): void {
    this.clientsService.changeVisible(id);  
  }
  public markAsFavorit(id: number):void {
   // search the index for the id
    var index = this.data.map(function(e) { return e.id; }).indexOf(id);

    var status = this.data[index].starred;

    if(status) this.data[index].starred = false;
    if(!status) this.data[index].starred = true; 
  }

}
