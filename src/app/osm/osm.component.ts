import {Component, ViewChild, OnInit, OnDestroy, NgZone} from "@angular/core";
import {NavigatorComponent} from "../navigator/navigator.component";
import {ClientsService } from '../clients.service';

import {MapService} from "../map.service";
import {GeocodingService} from "../geocoding.service";
import {Location} from "../core/location.class";
import { SettingsService } from "../settings.service";
import { ActivatedRoute } from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
    selector: "osm",
    templateUrl: './osm.component.html',
    styleUrls: ['./osm.component.css'],
    providers: []
})
export class OSMComponent implements OnInit {

    
    
    
    map: any;
    firstRun: boolean = true;
    clientsMarkers: Array<any> = [];
    clientsLayerGroup: any = L.markerClusterGroup();
    storesMarkers: Array<any> = [];
    storesLayerGroup:any;
    storesLayerGroups:any;
    constructor(
        private mapService: MapService, 
        private geocoder: GeocodingService,
        private clientsService:ClientsService,
        private settingsService:SettingsService,
        private route: ActivatedRoute,
        public snackBar: MdSnackBar
    ) {}            

    ngOnInit() {
        
       




        // LAYERS - no idea why i have to make a new object to get pass through L.controls.layers()     
        var baseMaps = {
            "osm": L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
            "esri": L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }),
            "cartodb": L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            })
        };





        
        
        

        this.map = L.map("map", {
            zoomControl: false,
            center: L.latLng(47.1367785, 7.2467909),
            zoom: 14,
            minZoom: 11,
            maxZoom: 18,
            layers: [baseMaps.osm]
        });

        // Add Controls
        L.control.zoom({ position: "topright" }).addTo(this.map);
        L.control.scale().addTo(this.map);
    
        
        // Bind the created map to the service
        this.mapService.map = this.map;

        this.createClientsMarkers(0);
        this.createStoresMarkers(0);

        this.route.params.subscribe( (p) => {



            // Check if there are any params submitted
            if(Object.keys(p).length === 0 && p.constructor === Object) {
                console.log("no params in route");
                // no params? go default!
                 

            } else {
                switch(p['type']) {
                case "client":
                    // this.createClientsMarkers(p['id']);
                    this.selectMarker(p['id']);
                break;
                case "store":
                    //this.createStoresMarkers(p['id']);
                    this.selectStore(p['id']);
                break;
                case "clientFromStore":
                    this.clientsService.filterstate.defaultStore.active = true;
                    this.clientsService.filterstate.defaultStore.value = p['id'];
                    // this.clientsService.setFilter(null);
                    this.createClientsMarkers(0);
                break;

                default:
                    this.snackBar.open('Der Typ <b>' + p['type'] + '</b> ist unbekannt', '', {
                        duration: 3000
                    });
                    
                break;
            }

            }
    
        });
        

        // Change BaseMap
        this.mapService.baseMap.subscribe(
            (input) => {

                console.log("baseMap in OSM called", input)
                
                switch(input) {

                    case "osm":
                        this.map.removeLayer(baseMaps.esri);
                        this.map.removeLayer(baseMaps.cartodb);
                    break;


                    case "esri":
                        this.map.removeLayer(baseMaps.cartodb);
                        this.map.removeLayer(baseMaps.osm);
                    break;


                    case "cartodb":
                        this.map.removeLayer(baseMaps.esri);
                        this.map.removeLayer(baseMaps.osm);
                    break;

                }

                // add the new one
                 baseMaps[input].addTo(this.map);
                
            }
        )
    
        //Check for new visibility
		this.clientsService.visibilityUpdated.subscribe(
            (data) => {
                
                var opacity:number = (data.visible) ? 0.8 : 0.1;    
                this.clientsMarkers[data.id].setOpacity(opacity);
                
            }
        );


        
        this.clientsService.clientsUpdated.subscribe(
            (data) => {
                
                console.log("OSM wants to update markers!");

                // L.control.layers(markerLayerGroups).
                // initialClientsLayerGroup.clearLayers();
                // First clear old layer
                
                this.map.removeLayer(this.clientsLayerGroup);
                this.createClientsMarkers(0);
                
                
                
            }
        );
        

        //Check for new visibility
		this.clientsService.clientSelectedID.subscribe(
            (id) => {                
                
                // this.clientsMarkers[id].openPopup();
                // this.map.setView(this.clientsMarkers[id].getLatLng(),18);
                this.selectMarker(id);

                
            }
        );
           
      
        this.clientsService.visibilityUpdated.subscribe(
            (data) => {
                console.log("Jes?");
                var opacity:number = (data.visible) ? 0.8 : 0.1;    
                this.clientsMarkers[data.id].setOpacity(opacity);
                
            }
        );

      


        /* 
        
        this.geocoder.getCurrentLocation()
            .subscribe(
                location => map.panTo([location.latitude, location.longitude]),
                err => console.error(err)
            );
        */ 
        


       // this.createMarkers();
    /*
    
        



        //Check for new visibility
		

        this.clientsService.clientsUpdated.subscribe(
            (data) => {
                this.markerClusters.clearLayers();
                this.createMarkers();
                
            }
        );

        */

        
/*
        //Check for new visibility
		this.clientsService.clientSelectedID.subscribe(
            (id) => {                
                console.log("clientSelectedID watcher OSM called", this.myMarkers[id]);            
                        
                this.myMarkers[id].openPopup();

                
            }
        );


*/ 




    }


    selectMarker(id) {
        var m = this.clientsMarkers[id];
                this.clientsLayerGroup.zoomToShowLayer(m, function() {
                    m.openPopup();
                });
    }
    selectStore(id) {
        var m = this.storesMarkers[id];
         m.openPopup();
         /*       this.storesLayerGroups.zoomToShowLayer(m, function() {
                    m.openPopup();
                }); */
    }

    createClientsMarkers(id:number, numbered?:boolean) {

        
        
        
        var clients;
        
        if(id != 0) {
            clients = this.clientsService.getClient(id);
        } else {
            // ADD CLIENTS
            clients = this.clientsService.getClients();
        }
        
        
        // this.clientsLayerGroup = new L.FeatureGroup(null);
        this.clientsLayerGroup =  L.markerClusterGroup({
            spiderfyDistanceMultiplier: 3,
            zoomToBoundsOnClick: true
        });
        
        // iterate all stores
        for(var i = 0; i < clients.length; i++) {
            var m = clients[i];
            
            // Check if coordinates are set
            if(clients[i].lat != 0 && clients[i].lng != 0) {
                
                let myIcon;
                if(numbered) {
                    myIcon = L.divIcon({className: 'marker_icon', html: ""+i});
                } else {
                    myIcon = L.icon({
                            iconUrl: "assets/images/marker-icon.png",
                            shadowUrl: "assets/images/marker-shadow.png"
                        })
                }
                
            var popupContent = "<section class='cleft'><p class='name'><b>#" + m.id + "</b> " + m.name + "</p>";
                popupContent += "<p>" + m.address + "<br /> " + m.postleihzahl + " " + m.city + " </p>";
                if(typeof m.tel !== "undefined") popupContent += "<p><span *ngIf='m.tel'>" + m.tel + "</span>";
                if(typeof m.email !== "undefined") popupContent += "<span *ngIf='m.email'> | " + m.email + "</span> </p>";
                if(m.group != "unkknown") popupContent += "<div class='defaultStore'>Kunde aus <img src='./assets/icons/stores_" + m.storeGroup + ".svg' alt='" + m.defaultStore + "'><span>" + m.defaultStore + "</span></div>";
                popupContent += "</section><section class='cright'>";
                popupContent += "<div class='deliveryCount'><span class='number'>" + m.deliveryCount + "</span><span class='name'>Lieferungen</span></div>";
                
                if(typeof m.abo !== "undefined") popupContent += "<p *ngIf='m.abo' class='number'>Abo-Nr. " + m.abo + "</p>";
                
                popupContent += "</section><section class='cclear'></section>";
                

                
                let coords = {lat: clients[i].lat,  lng: clients[i].lng};
                var marker = L.marker(coords,{
                        icon: myIcon,
                        draggable: false,
                        opacity: 1,
                        riseOnHover: true
                    }).bindPopup(popupContent, {maxWidth : 550, minWidth: 550})
                    .on("click", (e) => {

                        var id = parseInt(e.target._leaflet_id);                    
                        this.clientsService.clientSelected(id);

                    });
                
                // Add an ID to retrieve thorough the click handler
                
                this.clientsMarkers[i] = marker;
                
                // TODO Broken sind change on MarkerCluster, cant find properts icon/id
                
                this.clientsMarkers[i]._leaflet_id = m.id;
                
                this.clientsMarkers[i].addTo(this.clientsLayerGroup);

            }
            
            
            
            // this.clientsLayerGroup.addLayer(this.clientsMarkers);

        }
            this.clientsLayerGroup.on('clusterclick', function (a) {
	           console.log("i react", a);
               // a.layer.zoomToBounds({padding: [200, 200]});
               //  a.layer.zoomToBounds({padding: [20, 20]});
            });

            // return L.layerGroup(this.clientsMarkers);
            this.map.addLayer(this.clientsLayerGroup);
            console.info("createClientsMarkers() finished", this.clientsLayerGroup);
        }

    private createStoresMarkers(id:number) {

        // STORES
        var stores = this.settingsService.settings.stores;    
        
        
        // iterate all stores
        for(var i = 0; i < stores.length; i++) {
            var m = stores[i];
            let storeSlug = this.settingsService.getStoreGroupById(m.group).slug;
            var popupContent = "<div class='left'><img src='/assets/icons/stores/" + storeSlug + "_full.svg' alt='" + m.name + "' /></div>";
                popupContent += "<div class='right'><p class='name'><b>#" + m.id + "</b> " + m.name + "</p>";
                popupContent += "<p>" + m.address + "</p></div>";
                // popupContent += "<p><a href='/map/clientFromStore/" + m.slug + "'>Kunden anzeigen</a></p></div><div style='clear: both; float: none'></div>";
            
            let coords = {lat: stores[i].lat,  lng: stores[i].lng};
            this.storesMarkers[i] = L.marker(coords,{
                    icon: L.icon({
                        iconUrl: "assets/icons/stores/" +  storeSlug + "_icon.svg",
                        shadowUrl: "assets/icons/stores_backdrop.png",
                        iconSize:     [32, 32], // size of the icon
                        shadowSize:   [48, 48], // size of the shadow
                        iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
                        shadowAnchor: [8, 8],  // the same for the shadow
                        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                    }),
                    draggable: false,
                    opacity: 1,
                    riseOnHover: true
                }).bindPopup(popupContent, {
                    maxWidth: 400,
                    minWidth: 300
                });
            
            // Add an ID to retrieve thorough the click handler
            // storesMarkers[i]._icon.id = m.id;
        } 

        // Add it to a layerGroup
        this.storesLayerGroup = L.layerGroup(this.storesMarkers);
        
        this.storesLayerGroup.addTo(this.map);
        // Array to contain ALL types of Markers
        this.storesLayerGroups = {
            "Geschäfte": this.storesLayerGroup
            
        }


        // 
        L.control.layers(this.storesLayerGroups).addTo(this.map);
    }
     
}
