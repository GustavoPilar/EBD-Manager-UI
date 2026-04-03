import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrudListComponent } from "./crud-list/crud-list.component";
import { CrudFormComponent } from "./crud-form/crud-form.component";

export const routes: Routes = [
  { path: "", component: CrudListComponent, title: "Cadastro" },
  { path: "manager/list/:entityName", component: CrudListComponent, title: "Listagem" },
  { path: "manager/edit/:entityName/:entityId", component: CrudFormComponent, title: "Formulário" }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CommonModule, RouterModule]
})
export class CrudRoutingModule { }
