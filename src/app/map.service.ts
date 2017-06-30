import {Injectable, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {Location} from "./core/location.class";
import {Map} from "leaflet";
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class MapService {
    public map: Map;
    public baseMaps: any;
    public selectedBaseMap: string;
    private vtLayer: any;
    baseMap:EventEmitter<string> = new EventEmitter();

    constructor(private http: Http, private localStorageService:LocalStorageService) {
        this.baseMaps = {
            "osm": L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
            "esi": L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }),
            "cartodb": L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            })
        };

        // Add default baseMap if localStorage was empty
        if(this.localStorageService.get("selectedBaseMap") === null) {
            this.changeBaseMap("osm");
        } else {
            
             this.selectedBaseMap = JSON.stringify(this.localStorageService.get("selectedBaseMap"));
        }


    }

    addMarker(input:any) {

    }

    public changeBaseMap(input:string) {
        
        console.log("ChangeBaseMap in map.service.ts called", input);

        this.localStorageService.set("selectedBaseMap",input)
        this.baseMap.emit(input);
        
        return input;
    }

    disableMouseEvent(elementId: string) {
        let element = <HTMLElement>document.getElementById(elementId);

        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    }

    toggleAirPortLayer() {
      if (this.vtLayer) {
          this.map.removeLayer(this.vtLayer);
          delete this.vtLayer;
      } else {
          this.http.get("https://rawgit.com/haoliangyu/angular2-leaflet-starter/master/public/data/airports.geojson")
              .map(res => res.json())
              .subscribe(result => {
                  // this.vtLayer = L.vectorGrid.slicer(result);
                  this.vtLayer.addTo(this.map);
              });
      }
    }

    

               /* 
            if (action === "remove") {
                this.map.removeLayer(this.marker);
                
            }
                */ 
            
        
    

}
