import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CarouselModule,
    ButtonModule
  ],
  providers: [

  ]
})
export class PagesModule { }
