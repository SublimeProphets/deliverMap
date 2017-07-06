import {Component, Input, EventEmitter} from "@angular/core";
import {GeocodingService} from "../geocoding.service";
import {MapService} from "../map.service";
import { ClientsService } from "../clients.service";
import {Location} from "../core/location.class";
import {Map} from "leaflet";
import { SettingsService } from "../settings.service";
import * as Rx from 'rxjs'; // TODO load only needed components

@Component({
    selector: "navigator",
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.less'],
    providers: []
})


export class NavigatorComponent  {


    constructor(
        private geocoder: GeocodingService, 
        private mapService: MapService,
        private clientService:ClientsService,
        private settingsService:SettingsService) {
            
        this.address = "";



    }

    @Input('showOptions') showOptions: boolean;
    public resultsUpdated:EventEmitter<any> = new EventEmitter();
    address: string;
    private searchResultMarker: any;
    private stores = this.settingsService.settings.stores;
    public searchStorage:any = {
        clients: {
            active: true
        },
        stores: {
            active: false
        },
        places: {
            active: true
        },
        results: []
    };
    searchHasFocus: boolean;
    searchHasResults: boolean;
    showSearchResults: boolean = false;


    ngOnInit() {


        var obs = Rx.Observable.interval(500).take(5)
            .do(i => console.log("obs value "+ i) );

            obs.subscribe(value => console.log("observer 1 received " + value));

obs.subscribe(value => console.log("observer 2 received " + value));


        // idk why this was here..
        // this.mapService.disableMouseEvent("goto");
        //this.mapService.disableMouseEvent("place-input");
        
        this.searchHasFocus = (this.showOptions) ? true : false; //Check for showOptions in attribute, if true then always show
        this.searchHasResults = false;
    }

    toggleInputFocus(state:boolean) {
        
            this.searchHasFocus = (this.showOptions) ? true : state; //Check for showOptions in attribute, if true then always show
    }
    closeSearchResults(): void {
        
            this.showSearchResults = false;
    }
    openSearchResults(): void {
        this.showSearchResults = true;
    }

    resetResults(): void {
        this.searchStorage.results = [];
        this.searchHasResults = false;

        // Delete old marker if it exists..
        if(typeof this.searchResultMarker == "object") 
            this.mapService.map.removeLayer(this.searchResultMarker);

    }

    private addResultItem(item): void {
        this.searchStorage.results.push(item);
        this.searchHasResults = true;
        this.showSearchResults = true;
        this.resultsUpdated.emit(this.searchStorage.results);
    }

    


    goto() {
        if (!this.address) { return; }
        
        // Back to 0
        this.resetResults();


        // PLACES / LOCATION
        if(this.searchStorage.places.active) {
            this.geocoder.geocode(this.address)
            .subscribe(location => {
                
                if(location.length > 0) {

                
                    location.forEach(function(item){
                        item.type = "location";
                        this.addResultItem(item);

                    }, this);
                
                    
                
                    
                }

            }, error => console.error(error));
        }


        if(this.searchStorage.clients.active) {
            
            var fullClientList = this.clientService.getClients();
            
            var searchText = this.address.toLowerCase();
            fullClientList.forEach(function(item) {
                console.log(item);
                item.type = "client";
                if( item.name.toLowerCase().indexOf(searchText) >= 0) {
                    this.addResultItem(item);
                } else if(typeof item.address != "undefined") {
                    if(item.address.toLowerCase().indexOf(searchText) >= 0) {
                        this.addResultItem(item);
                    }
                }

            }, this);
            
            
        }

        if(this.searchStorage.stores.active) {
            
            
            var searchText = this.address.toLowerCase();
            this.stores.forEach(function(item) {
                item.type = "stores_" + item.group;
                if( item.name.toLowerCase().indexOf(searchText) >= 0) {
                    this.addResultItem(item);
                } else if(item.address.toLowerCase().indexOf(searchText) >= 0) {
                    this.addResultItem(item);
                }

            }, this);
            
            
        }







    }






    public selectResult(result) {
        
        
        console.log(result);

        

        /*
            this.mapService.map.fitBounds(location.viewBounds, {});
            console.log(location);
            this.address = location.address;

            // CREATE MARKER THERE
            var popupContent = "<p>Suchergebniss</p>";
                popupContent += "<p class='name'>" + location.address + "</p>";
            let coords = {lat: location.latitude,  lng: location.longitude};
             this.searchResultMarker = L.marker(coords,{
                    icon: L.icon({
                        iconUrl: "../../assets/images/marker-icon_active.png",
                        shadowUrl: "../../assets/images/marker-shadow.png"
                    }),
                    draggable: false,
                    opacity: 1,
                    riseOnHover: true
                }).bindPopup(popupContent).addTo(this.mapService.map).openPopup();

*/
    }


}
