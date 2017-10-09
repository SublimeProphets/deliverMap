import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import { SettingsService } from "../settings.service";

@Component({
  selector: 'client-edit-dialog',
  templateUrl: './client-edit-dialog.component.html',
  styleUrls: ['./client-edit-dialog.component.less']
})
export class ClientEditDialog implements OnInit {

  constructor(
    public dialog: MdDialog
  ) { }
  
  @Input("client") client:any;
  @Output() onChange = new EventEmitter();
  
  

  ngOnInit() {
  }
  public openDialog():void {
                  
    let dialogRef = this.dialog.open(clientEditDialogForm, {
        data: this.client,
        width: "80%"
      });
      
      dialogRef.afterClosed().subscribe((result) => 
      {
      if(typeof result !== "undefined") {
        if(result.doUpdate) {
          
          this.onChange.emit(this.client);
        }
      }
      
    });
  }
}


@Component({
  selector: 'clientEditDialogForm',
  templateUrl: './client-edit-dialog-form.template.html',
  styleUrls: ['./client-edit-dialog.component.less']
})
export class clientEditDialogForm implements OnInit {
  data: any;
  map: any;
  public stores:any;
  
  constructor(
    @Inject(MD_DIALOG_DATA) public insertedData: any,
    public settingsService:SettingsService
  ) {
    this.data = insertedData;
    this.stores = this.settingsService.settings.stores;
  }

  ngOnInit() {
    
    // set default LatLng if none submitted
    this.data.lat = (typeof this.data.lat == "undefined") ? this.settingsService.settings.map.center.lat : this.data.lat;
    this.data.lng = (typeof this.data.lng == "undefined") ? this.settingsService.settings.map.center.lng: this.data.lng;

    // Set Default if falsey lat/ng
    let centerLocation = L.latLng(this.data.lat, this.data.lng);
    

    this.map = L.map("locationPickerMap", {
            zoomControl: true,
            center: centerLocation,
            zoom: 8,
            minZoom: 2,
            maxZoom: 19,
            layers: [L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            })]
        });

        // Add Controls
        
        L.control.scale().addTo(this.map);



        // Add draggable marker
        let coords = {lat: this.data.lat,  lng: this.data.lng};
                var marker = L.marker(coords,{
                        icon: L.icon({
                            iconUrl: "assets/images/marker-icon.png",
                            shadowUrl: "assets/images/marker-shadow.png"
                        }),
                        draggable: true,
                        opacity: 1,
                        riseOnHover: true
        }).on("move",(e) => {
          let tmp:any = e;

          this.data.lat = tmp.latlng.lat;
          this.data.lng = tmp.latlng.lng;
        });
        this.map.addLayer(marker);
    
  }
}
