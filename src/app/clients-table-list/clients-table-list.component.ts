import { Component, OnInit, Input, ViewChild } from '@angular/core';

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

  constructor() {

  }

  ngOnInit() {
    console.log(this.limit);
    this.originalData = this.data;
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
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
        console.log(d);
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
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



}
