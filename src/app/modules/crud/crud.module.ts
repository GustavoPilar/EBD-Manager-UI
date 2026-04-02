import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { DialogModule } from "primeng/dialog";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { SelectModule } from "primeng/select";
import { SelectButtonModule } from "primeng/selectbutton";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { CrudListComponent } from "./crud-list/crud-list.component";
import { CrudRoutingModule } from "./crud-routing.module";
import { TagModule } from "primeng/tag";

@NgModule({
  declarations: [
    CrudListComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    ToggleButtonModule,
    DynamicDialogModule,
    DialogModule,
    SelectButtonModule,
    SelectModule,
    ToastModule,
    MessageModule,
    DatePickerModule,
    TagModule
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class CrudModule { }
