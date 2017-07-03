// Google Maps API
// AIzaSyChYDkxrB4vvRYBVUI459bTyvMhXo6oOTE


// External components
import "leaflet";
import "leaflet.markercluster";
import "hammerjs";

// import "leaflet.vectorgrid";
// import "zone.js/dist/zone";
// import "zone.js/dist/long-stack-trace-zone";
// import "reflect-metadata";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from "@angular/http";
import {FileUploadModule} from "ng2-file-upload";
import { LocalStorageModule } from 'angular-2-local-storage';
import { RouterModule, Routes } from '@angular/router';
// import { AgmCoreModule } from '@agm/core';
// import { Ng2CompleterModule } from "ng2-completer";
// import { CompleterCmp } from "./completer-cmp/completer-cmp";
// import { CompleterCmpMd } from "./completer-cmp-md/completer-cmp-md";


// Material and Design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';    
import {MdToolbarModule,
  MdSnackBarModule ,
  MdListModule, 
  MdIconModule, 
  MdMenuModule, 
  MdCheckboxModule, 
  MdTabsModule, 
  MdSlideToggleModule, 
  MdCardModule, 
  MdRadioModule, 
  MdInputModule, 
  MdButtonModule, 
  MdSelectModule, 
  MdDatepickerModule, 
  MdNativeDateModule,
  MdProgressBarModule,
  MdDialogModule,
  MdSidenavModule
} from '@angular/material';




// Services
import { ClientsService} from './clients.service';
// import { GmcoordinatesService} from './gmcoordinates.service';
import { MapService } from './map.service';
import { GeocodingService } from './geocoding.service';
import { SettingsService } from "./settings.service";


// App
import { AppComponent }        from './app.component';
import {appRoutes} from './app.routes';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeaderBar } from './headerbar/headerbar.component';
import { MainnavigationComponent } from './mainnavigation/mainnavigation.component';
import { InfonavigationComponent } from './infonavigation/infonavigation.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { XlsxFileUploadComponent } from './xlsx-file-upload/xlsx-file-upload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Store } from './stores/stores.component';
import { StorenavigationComponent } from './storenavigation/storenavigation.component';
import { DataTableViewComponent } from './data-table-view/data-table-view.component';
 
// import { TestPipe } from "./pipes/test.pipe";


// OSM
import { OSMComponent} from './osm/osm.component';
import {NavigatorComponent} from "./navigator/navigator.component";

import { SettingsComponent, EditStoreDialog } from './settings/settings.component';
import { FiltersComponent } from './filters/filters.component';



@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeaderBar,
    MainnavigationComponent,
    InfonavigationComponent,
    FileuploaderComponent,
    XlsxFileUploadComponent,
    PageNotFoundComponent,
    HomepageComponent,
    StorenavigationComponent,
    DataTableViewComponent,
    EditStoreDialog,
    SettingsComponent,
    // TestPipe,
    //CompleterCmp,
 //    CompleterCmpMd,



    // OSM
    OSMComponent,
    NavigatorComponent,
    FiltersComponent,
    
    

    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    // Ng2CompleterModule,
    FormsModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
    MdMenuModule,
    MdTabsModule,
    MdCardModule,
    MdSlideToggleModule,
    MdRadioModule,
    MdInputModule,
    MdButtonModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdProgressBarModule,
    MdDialogModule,
    FileUploadModule,
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
        /*,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyChYDkxrB4vvRYBVUI459bTyvMhXo6oOTE'
    })
    */
  ],
  providers: [
    ClientsService,
    GeocodingService,
    MapService,
    SettingsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditStoreDialog]
})
export class AppModule { 
  constructor(){}
  
}
