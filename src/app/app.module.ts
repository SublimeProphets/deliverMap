// Google Maps API
// AIzaSyChYDkxrB4vvRYBVUI459bTyvMhXo6oOTE


// External components
import "leaflet";
import "leaflet.markercluster";
import "hammerjs";


// CORE MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import { LOCALE_ID } from '@angular/core';


// Material and Design and external Components
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
  MdSidenavModule,
  MdGridListModule,
  MdSliderModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { FileUploadModule} from "ng2-file-upload";
import { LocalStorageModule } from 'angular-2-local-storage';


// SERVICES
import { ClientsService} from './clients.service';
import { MapService } from './map.service';
import { GeocodingService } from './geocoding.service';
import { SettingsService } from "./settings.service";
import { SearchService } from "./search.service";


// APP COMPONENTS
import { AppComponent }        from './app.component';
import { appRoutes } from './app.routes';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeaderBar } from './headerbar/headerbar.component';
import { MainnavigationComponent } from './mainnavigation/mainnavigation.component';
import { InfonavigationComponent } from './infonavigation/infonavigation.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { XlsxFileUploadComponent } from './xlsx-file-upload/xlsx-file-upload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StorenavigationComponent } from './storenavigation/storenavigation.component';
import { DataTableViewComponent } from './data-table-view/data-table-view.component';
import { ClientEditDialog, clientEditDialogForm } from "./client-edit-dialog/client-edit-dialog.component";
import { LocationPickerComponent, LocationPickerDialog } from "./location-picker/location-picker.component";
import { OSMComponent} from './osm/osm.component';
import { NavigatorComponent} from "./navigator/navigator.component";
import { SettingsComponent, EditStoreDialog, EditStoreGroupDialog } from './settings/settings.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ClientsTableListComponent } from './clients-table-list/clients-table-list.component';
import { ClientSetStarredComponent } from './client-set-starred/client-set-starred.component';
import { OrderbyPipe } from './orderby.pipe';
import { ClientsExport } from './clients-export/clients-export.component';




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
    clientEditDialogForm,
    ClientEditDialog,
    DataTableViewComponent,
    EditStoreDialog,
    EditStoreGroupDialog,
    SettingsComponent,
    LocationPickerComponent,
    LocationPickerDialog,
    OSMComponent,
    NavigatorComponent,
    FiltersComponent,
    SearchResultsComponent,
    ClientsTableListComponent,
    ClientSetStarredComponent,
    ClientsExport,
    OrderbyPipe    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    MdGridListModule,
    MdSliderModule,
    FileUploadModule,
    RoundProgressModule,
    NgxDatatableModule,
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
  ],
  providers: [
    ClientsService,
    GeocodingService,
    MapService,
    SettingsService,
    SearchService,
    { provide: LOCALE_ID, useValue: "de-CH" }
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditStoreDialog, EditStoreGroupDialog, clientEditDialogForm, LocationPickerDialog]
})
export class AppModule { 
  constructor(){}
  
}
