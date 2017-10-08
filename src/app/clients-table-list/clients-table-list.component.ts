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
  @Input("quicksearch") quicksearchEnabled: boolean;

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
    // new Date((parseInt(res[key].v) - (25567 + 1)) * 86400 * 1000)

      var now = Date.now();
    

    
    console.log(this.quicksearchEnabled);
    this.originalData = this.data;
    this.stores = this.settingsService.settings.stores;
    
    var date = new Date(this.originalData[0].lastDeliveryDate); // some mock date
    var milliseconds = date.getTime(); 

    console.log(milliseconds);
    console.log(now);

    
    console.log(Math.round((now-milliseconds)/(1000*60*60*24)));
  }
  

getOverlayStyle() {
    
    let transform = 'translateY(-50%) translateX(-50%)';

    return {
      'top': 'auto',
      'bottom': '5%',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.deliveryCountRadius / 3.5 + 'px'
    };
}
  toggleExpandRow(row) {
    
    // Close previous one
    if(this.lastOpenedRow !== false) this.table.rowDetail.toggleExpandRow(this.lastOpenedRow);
    
    // Open the new
    this.table.rowDetail.toggleExpandRow(row);

    // remember the old one
    this.lastOpenedRow = row;
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  updateFilter(event) {
    let val = event.target.value.toLowerCase();
    if (val != "") {
      this.temp = this.originalData;

      // filter our data
      let temp = this.temp.filter(function (d) {
        let isValid:boolean = false;
        console.log(d);
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
      console.log("filtered", this.data);
    } else {
      this.data = this.originalData;
    }

  }

  // Toggles the "starred" state
  public showOnMap(id:number) {    
     this.clientsService.clientSelected(id);
    // this.infoToggle.emit(true);
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
