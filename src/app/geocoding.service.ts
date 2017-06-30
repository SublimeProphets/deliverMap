import {Http, Headers, Response} from "@angular/http";
import {Location} from "./core/location.class";
import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class GeocodingService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    geocode(address: string) {
        return this.http
            .get("http://maps.googleapis.com/maps/api/geocode/json?region=ch&bounds=47.15,7.19|47.12,7.34&address=" + encodeURIComponent(address))
            .map(res => res.json())
            .map(result => {
                if (result.status !== "OK") { throw new Error("unable to geocode address"); }

               console.log("RESULT LIST", result);
                 var point;
                 var output = [];
                 // Boundaries of Biel/Bienne area including all neighouring villages
                 let bounds = {
                     latMin: 47.12,
                     latMax: 47.15,
                     lngMin: 7.19,
                     lngMax: 7.34
                 }
                // Find first location inside restricted area
                for (var i = 0 ; i < result.results.length ; i++) {
                    point = result.results[i].geometry.location;
                    console.log("round " + i, point);

                    // I compare my lng values this way because their are negative
                    if (point.lat > bounds.latMin && point.lat < bounds.latMax && point.lng > bounds.lngMin && point.lng < bounds.lngMax) {
                        console.log("compared finished with that returned point", point);
                        
                        let location = new Location();
                        location.address = result.results[i].formatted_address;
                        location.latitude = result.results[i].geometry.location.lat;
                        location.longitude = result.results[i].geometry.location.lng;
                        
                        let viewPort = result.results[i].geometry.viewport;
                        location.viewBounds = L.latLngBounds(
                        {
                            lat: viewPort.southwest.lat,
                            lng: viewPort.southwest.lng},
                        {
                            lat: viewPort.northeast.lat,
                            lng: viewPort.northeast.lng
                        });

                        output.push(location);


                    } else {
                        console.log("this result was out of the bounds", i, point);
                    }
                    // No results inside our area
                    if (i == (result.length - 1)) {
                        alert("Try again");
                    }
                

                }
                console.log(output);
                return  output;
                
               
                

                
            });
    }

    getCurrentLocation() {
        return this.http
            .get("http://ipv4.myexternalip.com/json")
            .map(res => res.json().ip)
            .flatMap(ip => this.http.get("http://freegeoip.net/json/" + ip))
            .map((res: Response) => res.json())
            .map(result => {
                let location = new Location();

                location.address = result.city + ", " + result.region_code + " " + result.zip_code + ", " + result.country_code;
                location.latitude = result.latitude;
                location.longitude = result.longitude;

                return location;
            });
    }
}
