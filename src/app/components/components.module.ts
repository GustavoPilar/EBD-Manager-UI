import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { MenuComponent } from "./menu/menu.component";


@NgModule({
  imports: [
    CommonModule,
    MenubarModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  providers: [

  ]
})
export class ComponentsModule {  }
