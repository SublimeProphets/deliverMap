import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {

  constructor(
    public dialog: MdDialog,

  ) { }
  
  @Input("lat") lat:number;
  @Input("lng") lng:number;
  @Input("title") title:string;
  @Output() onChange = new EventEmitter();

  ngOnInit() {
    
  }
  public openDialog():void {
        
    let dialogRef = this.dialog.open(LocationPickerDialog, {
        data: {
          lat: this.lat,
          lng: this.lng,
          title: this.title
        },
        width: "600px"
      });
      
      dialogRef.afterClosed().subscribe((result) => 
      {
      if(typeof result !== "undefined") {
        if(result.doUpdate) {
          this.lat = result.data.lat;
          this.lng = result.data.lng;
          this.onChange.emit({lat: this.lat, lng: this.lng});
        }
      }
      
    });
  }
}


@Component({
  selector: 'LocationPickerDialog',
  templateUrl: 'location-picker-dialog.template.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerDialog implements OnInit {
  data: any;
  map: any;
  
  constructor(@Inject(MD_DIALOG_DATA) public insertedData: any) {
    this.data = insertedData;
  }

  ngOnInit() {
    
    this.data.lat = (typeof this.data.lat == "undefined") ? 47.1367785 : this.data.lat;
    this.data.lng = (typeof this.data.lng == "undefined") ? 7.2467909 : this.data.lng;

    // Set Default if falsey lat/ng
    let centerLocation = L.latLng(this.data.lat, this.data.lng);
    



    this.map = L.map("locationPickerMap", {
            zoomControl: true,
            center: centerLocation,
            zoom: 13,
            minZoom: 1,
            maxZoom: 19,
            layers: [L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            })]
        });

        // Add Controls
        // L.control.zoom({ position: "topright" }).addTo(this.map);
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
          console.log(tmp.latlng);

          this.data.lat = tmp.latlng.lat;
          this.data.lng = tmp.latlng.lng;
        });
        this.map.addLayer(marker);
    
  }
}
