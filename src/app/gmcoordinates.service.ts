import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GmcoordinatesService {

  constructor(private http: Http) { }

  getCoordinates(address): Observable<any>{
    

    var combinedAndEncodedSearchString = encodeURIComponent(address);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + combinedAndEncodedSearchString + '&key=AIzaSyChYDkxrB4vvRYBVUI459bTyvMhXo6oOTE';
    
    return this.http.get(url).map(
      res =>{
        const response = res.json();
        
        // Just get the locations, containing 2 properties lng and lat 
        const filtered = response.results[0].geometry.location;


        
        return filtered;
      }
    )
  }


}


