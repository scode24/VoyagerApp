import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './MaterialUIModule/material-ui-module/material-ui.module';
import { MapComponent } from './componenets/map/map.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { PerformanceComponent } from './componenets/performance/performance.component';
import { LocationCardComponent } from './componenets/location-card/location-card.component';
import { ScoreService } from './services/score.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PerformanceComponent,
    LocationCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
