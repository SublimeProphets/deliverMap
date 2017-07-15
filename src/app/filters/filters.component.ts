
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
 
  
  bezirk:Array<Object> = [
    {code: 1, name: "ALLE ANZEIGEN"},
    {code: 2500, name: "2500 Stadtzentrum"},
    {code: 2501, name: "2501 Altstadt"},
    {code: 2502, name: "2502 Mett"},
    {code: 2503, name: "2503 Bözingen"},
    {code: 2504, name: "2504 Port"},
    {code: 2506, name: "2506 Vingelz"},
    {code: 2560, name: "2560 Nidau"}
  ];

ngOnInit() {
  
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
    console.log("filtercomponent got new filterstates", this.filterstate);

  }, 50)
  console.log(name, value);
  
}


  
  

}

