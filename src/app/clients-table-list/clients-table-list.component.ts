import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'clients-table-list',
  templateUrl: './clients-table-list.component.html',
  styleUrls: ['./clients-table-list.component.css']
})
export class ClientsTableListComponent implements OnInit {

  @Input() data:any;

  constructor() { }

  ngOnInit() {
  }

}
