import { Component, ViewChild, OnInit, OnDestroy, NgZone } from "@angular/core";
import { NavigatorComponent } from "../navigator/navigator.component";
import { ClientsService } from '../clients.service';

import { MapService } from "../map.service";
import { GeocodingService } from "../geocoding.service";
import { Location } from "../core/location.class";
import { SettingsService } from "../settings.service";
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: "osm",
    templateUrl: './osm.component.html',
    styleUrls: ['./osm.component.less'],
    providers: []
})
export class OSMComponent implements OnInit {




    map: any;
    firstRun: boolean = true;
    clientsMarkers: Array<any> = [];
    clientsLayerGroup: any = L.markerClusterGroup();
    storesMarkers: Array<any> = [];
    storesLayerGroup: any;
    storesLayerGroups: any;
    constructor(
        private mapService: MapService,
        private geocoder: GeocodingService,
        private clientsService: ClientsService,
        private settingsService: SettingsService,
        private route: ActivatedRoute,
        public snackBar: MdSnackBar
    ) { }

    ngOnInit() {

        // GROUND LAYERS
        let baseMaps = {
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

        // defines the map
        this.map = L.map("map", {
            zoomControl: false,
            center: L.latLng(this.settingsService.settings.map.center.lat, this.settingsService.settings.map.center.lng),
            zoom: this.settingsService.settings.map.zoom,
            minZoom: this.settingsService.settings.map.minZoom,
            maxZoom: this.settingsService.settings.map.maxZoom,
            layers: [baseMaps.osm]
        });

        // Add Controls
        L.control.zoom({ position: "topright" }).addTo(this.map);
        L.control.scale().addTo(this.map);


        // Bind the created map to the service
        this.mapService.map = this.map;

        // Call the functions to create the markers
        this.createClientsMarkers(0);
        this.createStoresMarkers(0);


        // listen for routing param inputs
        this.route.params.subscribe((p) => {

            // Check if there are any params submitted
            if (Object.keys(p).length === 0 && p.constructor === Object) {

                // no params? We do not have to do anything special 

            } else {
                switch (p['type']) {
                    case "client":
                    console.log("selectclie")
                        this.selectMarker(p['id']);
                        break;
                    case "store":
                        this.selectStore(p['id']);
                        break;
                    case "clientFromStore":
                        this.clientsService.filterstate.defaultStore.active = true;
                        this.clientsService.filterstate.defaultStore.value = p['id'];
                        this.createClientsMarkers(0);
                        break;
                    case "filter":
                        this.clientsService.controlFilter("predefined", p['id'], true);
                        this.clientsLayerGroup.clearLayers();
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

                // TODO Workaround, could be solved better

                switch (input) {

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




        // If the dataset has changed we need to rebuild the markers
        this.clientsService.clientsUpdated.subscribe(
            (data) => {

                // L.control.layers(markerLayerGroups).
                // initialClientsLayerGroup.clearLayers();
                // First clear old layer
                // console.log("TYPEOF SOSOOSOSO", typeof this.clientsLayerGroup, this.map.hasLayer(this.clientsLayerGroup));
                
                if(this.map.hasLayer(this.clientsLayerGroup)) this.clientsLayerGroup.clearLayers();

                // this.map.removeLayer(this.clientsLayerGroup);
                this.createClientsMarkers(0);
            }
        );


        //listen to select marker
        this.clientsService.clientSelectedID.subscribe(
            (id) => {
                this.selectMarker(id);
            }
        );

        // update visibility of a marker
        this.clientsService.visibilityUpdated.subscribe(
            (data) => {
                var opacity: number = (data.visible) ? 0.8 : 0.1;
                this.clientsMarkers[data.id].setOpacity(opacity);

            }
        );




    }


    selectMarker(id) {
        
        // figures the related index out (because we have to match the clientsMarker-index with it)
        let idarray = this.clientsService.clients.map(function (e) { return e.id; });
        let index;
        console.log(id, idarray);
        for (var i = 0; i < idarray.length; i++) {
            if (idarray[i].toString() === id.toString()) {
                index = i;
                i = idarray.length; // equals end of for loop
            }
        }

    
    
        // open marker
        let m = this.clientsMarkers[index];
        this.clientsLayerGroup.zoomToShowLayer(m, function () {
            m.openPopup();
        });
    }
    selectStore(id) {
        var m = this.storesMarkers[id];
        m.openPopup();
    }


    createClientsMarkers(id: number, numbered?: boolean) {

        console.warn("createClientsMarkers started");


        var clients;

        if (id != 0) {
            clients = this.clientsService.getClient(id);
        } else {
            // ADD CLIENTS
            clients = this.clientsService.getClients();
            
        }



         this.clientsLayerGroup = L.markerClusterGroup({
            spiderfyDistanceMultiplier: 3,
            zoomToBoundsOnClick: true,
            disableClusteringAtZoom: 16
        });
        

        // iterate all clients
        for (var i = 0; i < clients.length; i++) {
            var m = clients[i];

            // Check if coordinates are set
            if (clients[i].lat != 0 && clients[i].lng != 0) {

                let myIcon;
                if (numbered) {
                    myIcon = L.divIcon({ className: 'marker_icon', html: "" + i });
                } else {
                    myIcon = L.icon({
                        iconUrl: "assets/images/marker-icon.png",
                        shadowUrl: "assets/images/marker-shadow.png"
                    })
                }

                // Adress and Contact Column
                var popupContent = "<section class='cleft'><p class='address'><b>" + m.name + "</b><br />";
                popupContent += "" + m.address + "<br /> " + m.postleihzahl + " " + m.city + " </p>";
                if (typeof m.tel !== "undefined") popupContent += "<div class='contact'><span>Telefon</span><a href='tel:" + m.tel + "'>" + m.tel + "</a></div>";
                if (typeof m.email !== "undefined") popupContent += "<div class='contact'><span>eMail</span><a href='mailto:" + m.email + "'>" + m.email.substring(0, 30) + "</a></div>";

                // lastDeliveryDate
                let daysSinceDate = "" + this.clientsService.daysSinceDate(m.lastDeliveryDate);
                let mDate = new Date(m.lastDeliveryDate);
                let lastDeliveryDate = (mDate.getMonth() + 1) + '.' + mDate.getDate() + '.' +  mDate.getFullYear();
                popupContent += "<div class='leftsideinfo'><span class='number'>" + (daysSinceDate) + "</span><span class='name'>Tage seit Bestellung ( "+ lastDeliveryDate +")</span></div>";
                
                // firstOrderDate
                daysSinceDate = "" + this.clientsService.daysSinceDate(m.firstOrderDate);
                mDate = new Date(m.firstOrderDate);
                let firstOrderDate = (mDate.getMonth() + 1) + '.' + mDate.getDate() + '.' +  mDate.getFullYear();
                popupContent += "<div class='leftsideinfo'><span class='number'>" + (daysSinceDate) + "</span><span class='name'>Tage Kunde ( "+ firstOrderDate +")</span></div>";

                // end left column and start right
                popupContent += "</section><section class='cright'>";
                
                // deliveryCount
                popupContent += "<div class='fillcontainer'><div class='fill' style='width:" + 100 / 50 * m.deliveryCount + "%'></div><div><span class='number'>" + m.deliveryCount + "</span><span class='name'>Lieferungen</span></div></div>";
                
                // ranking
                let rankingFill = (100 - (100 / clients.length * m.ranking));
                popupContent += "<div class='fillcontainer'><div class='fill' style='width:" + rankingFill + "%'></div><div><span class='number'>#" + m.ranking + "</span><span class='name'>Ranking</span></div></div>";

                // abo
                popupContent += "<div class='fillcontainer'><div class='fill' style='width:" + ((m.abo !== 0) ? 100 : 0) + "%'></div><div><span class='name'>Abo-Nr.&nbsp;</span><span class='number'>" + ((m.abo !== 0) ? m.abo : "Ohne") + "</span></div></div>";
                
                // defaultStore
                if (m.group != "unkknown") popupContent += "<div class='fillcontainer'><div class='fill' style='width:" + ((m.abo !== "unknown") ? 100 : 0) + "%'></div><div><span class='img'><img src='" + this.settingsService.getStoreGroupImage(m.storeGroup) + "' alt='" + m.defaultStore + "'></span><span class='name'><span>" + m.defaultStore + "</span></span></div></div>";

                // end of html
                popupContent += "</section><section class='cclear'></section>";



                let coords = { lat: clients[i].lat, lng: clients[i].lng };
                var marker = L.marker(coords, {
                    icon: myIcon,
                    draggable: false,
                    opacity: 1,
                    riseOnHover: true
                }).bindPopup(popupContent, { maxWidth: 550, minWidth: 550 })
                    .on("click", (e) => {
                        // nothing to do atm
                    });

                // add the marker to the clientsMarkerArray
                this.clientsMarkers[i] = marker;

                // give the marker a customID property which contains the original ID
                this.clientsMarkers[i].customID = m.id;

                this.clientsMarkers[i].addTo(this.clientsLayerGroup);

            }



            // this.clientsLayerGroup.addLayer(this.clientsMarkers);

        }
        /* this.clientsLayerGroup.on('clusterclick', function (a) {
            
            // a.layer.zoomToBounds({padding: [200, 200]});
            //  a.layer.zoomToBounds({padding: [20, 20]});
        }); */

        // return L.layerGroup(this.clientsMarkers);
        this.map.addLayer(this.clientsLayerGroup);
        console.info("createClientsMarkers() finished", this.clientsLayerGroup);
    }

    private createStoresMarkers(id: number) {

        // STORES
        var stores = this.settingsService.settings.stores;


        // iterate all stores
        for (var i = 0; i < stores.length; i++) {
            var m = stores[i];
            let storeSlug = this.settingsService.getStoreGroupById(m.group).slug;
            var popupContent = "<div class='left'><img src='/assets/icons/stores/" + storeSlug + "_full.svg' alt='" + m.name + "' /></div>";
            popupContent += "<div class='right'><p class='name'><b>#" + m.id + "</b> " + m.name + "</p>";
            popupContent += "<p>" + m.address + "</p></div>";
            // popupContent += "<p><a href='/map/clientFromStore/" + m.slug + "'>Kunden anzeigen</a></p></div><div style='clear: both; float: none'></div>";

            let coords = { lat: stores[i].lat, lng: stores[i].lng };
            this.storesMarkers[i] = L.marker(coords, {
                icon: L.icon({
                    iconUrl: "assets/icons/stores/" + storeSlug + "_icon.svg",
                    shadowUrl: "assets/icons/stores_backdrop.png",
                    iconSize: [32, 32], // size of the icon
                    shadowSize: [48, 48], // size of the shadow
                    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                    shadowAnchor: [8, 8],  // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
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
