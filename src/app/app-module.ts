import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ComponentsModule } from './components/components.module';
import { providePrimeNG } from 'primeng/config';
import Aura from "@primeuix/themes/aura";
import { CrudModule } from './modules/crud/crud.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    CrudModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      }
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
