
import { Component, OnInit } from '@angular/core';
import {ClientsService} from "../clients.service";
import { SettingsService, Settings } from "../settings.service";
import { DateAdapter, MD_DATE_FORMATS, NativeDateAdapter } from "@angular/material";


// Custom Dateformat output for material datepicker to match input[type=date]
// https://stackoverflow.com/questions/44452966/angular-2-material-2-datepicker-date-format

export class AppDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {

        if (displayFormat === 'input') {
            const day = ('0' + (date.getDate())).slice(-2); 
            
            const month = ('0' + (date.getMonth()+1)).slice(-2);
            const year = date.getFullYear();
            // return `${day}-${month}-${year}`;
            return `${year}-${month}-${day}`;
        } else {
            return date.toDateString();
        }
    }
}
export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};




@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less'],
  providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MD_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class FiltersComponent implements OnInit {
  
  

  constructor(private clientsService: ClientsService,private settingsService:SettingsService, private dateAdapter:DateAdapter<Date>) { 
  // dateAdapter.setLocale('en'); // DD.MM.YYYY
  this.filterstate = this.clientsService.filterstate;
  console.log("INIT", this.filterstate);

  }

  inProgress: boolean = false;
  clients: any;
  public filterstate: any;
  public counter:any = {
    clientsFound:0,
    clientsTotal:0
  }
  public dateNow = new Date();
  

  settings: Settings = this.settingsService.settings;
 
  

ngOnInit() {
  this.counter = {
      clientsFound: this.clientsService.clients.length,
      clientsTotal: this.clientsService.clientsOriginal.length
  }
}
  
  
public controlFilter(basetype:string, name?:string, status?:any, value?:any) {
  if (typeof status !== "undefined") this.inProgress = true;
  setTimeout(() => {
    let result = this.clientsService.controlFilter(basetype, name, status, value);
  
    this.counter = {
      clientsFound: result.clientsFound,
      clientsTotal: result.clientsTotal
    }
    this.filterstate = result.filterstate;
    this.inProgress = false;
  //   console.log("filtercomponent got new filterstates", this.filterstate);

  }, 50)
  
  
}

  
  

}

