import { Component, Input } from "@angular/core";
import { GeocodingService } from "../geocoding.service";
import { MapService } from "../map.service";
import { ClientsService } from "../clients.service";
import { Location } from "../core/location.class";
import { Map } from "leaflet";
import { SettingsService } from "../settings.service";
import * as Rx from 'rxjs'; // TODO load only needed components
import { Subject } from "rxjs/Subject";
import { SearchService } from "../search.service";

@Component({
    selector: "navigator",
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.less'],
    providers: []
})


export class NavigatorComponent {


    constructor(
        private geocoder: GeocodingService,
        private mapService: MapService,
        private clientService: ClientsService,
        private settingsService: SettingsService,
        private searchService: SearchService
    ) {

        this.clients = this.clientService.getClients();
        this.stores = this.settingsService.settings.stores;

        this.searchService.searchResult$.subscribe((results) => {
            console.log("recieved update from searchService.searchResult");
            this.results = this.searchService.resultsList;
            this.searchHasResults = true;
            this.showSearchResults = true;
        })




    }

    @Input('showOptions') showOptions: boolean;
    searchTerm$ = new Subject<string>();

    searchString: string;

    private searchResultMarker: any;
    private stores: any;
    private clients: any;
    public searchStorage: any;
    public results = [];


    searchHasFocus: boolean;
    searchHasResults: boolean; // switchen the disabled state of the button
    showSearchResults: boolean = false;


    ngOnInit() {

        // Get default for filters
        this.searchStorage = this.settingsService.settings.search.filters;

        //Check if options are shown default
        this.searchHasFocus = (this.showOptions) ? true : false; //Check for showOptions in attribute, if true then always show

        // while initialization there are no results...
        this.searchHasResults = false;

        // recieve the latest input
        this.searchTerm$.debounceTime(300).subscribe((term) => {
            this.searchService.executeSearch(term);
            //this.searchString = term.toLowerCase();
            //this.searchService.executeSearch(term);
            //this.goto();
        })




    }

    toggleInputFocus(state: boolean) {
        // this.searchHasFocus = (this.showOptions) ? true : state; //Check for showOptions in attribute, if true then always show
    }
    closeSearchResults(): void {
        this.showSearchResults = false;
    }
    openSearchResults(): void {
        this.showSearchResults = true;
    }

    resetResults(): void {
        this.results = [];
        this.searchHasResults = false;

        // Delete old marker if it exists..
        if (typeof this.searchResultMarker == "object")
            this.mapService.map.removeLayer(this.searchResultMarker);

    }

    private addResultItem(item): void {
        this.results.push(item);
        this.searchHasResults = true;
        this.showSearchResults = true;
        //  this.searchResult$.next(item);
        console.log("searchResult$ next")

    }





    goto() {
        if (!this.searchString) { return; }

        // Back to 0
        this.resetResults();


        // PLACES / LOCATION
        if (this.searchStorage.places.active) {
            this.geocoder.geocode(this.searchString)
                .subscribe(location => {
                    if (location.length > 0) {
                        location.forEach(function (item) {
                            item.type = "location";
                            this.addResultItem(item);

                        }, this);

                    }

                }, error => console.error(error));
        }


        if (this.searchStorage.clients.active) {




            this.clients.forEach(function (item) {
                //    console.log(item);
                item.type = "client";
                if (item.name.toLowerCase().indexOf(this.searchString) >= 0) {
                    this.addResultItem(item);
                } else if (typeof item.address != "undefined") {
                    if (item.address.toLowerCase().indexOf(this.searchString) >= 0) {
                        this.addResultItem(item);
                    }
                }

            }, this);


        }

        if (this.searchStorage.stores.active) {



            this.stores.forEach(function (item) {
                item.type = "stores_" + item.group;
                if (item.name.toLowerCase().indexOf(this.searchString) >= 0) {
                    this.addResultItem(item);
                } else if (item.address.toLowerCase().indexOf(this.searchString) >= 0) {
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
