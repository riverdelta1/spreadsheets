import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { helloworld } from './helloworld.component';
// import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
// import { SheetModule } from 'angular5-spreadsheet';
import { HotTableModule } from '@handsontable/angular';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent, helloworld
  ],
  imports: [
    BrowserModule, AppRoutingModule, HotTableModule.forRoot(), AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
