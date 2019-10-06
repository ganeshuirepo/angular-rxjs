import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RxjsCreateComponent } from './rxjs-create/rxjs-create.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, RxjsCreateComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
