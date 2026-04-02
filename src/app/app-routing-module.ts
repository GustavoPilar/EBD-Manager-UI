import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "manager", loadChildren: () => import("./modules/crud/crud.module").then(cm => cm.CrudModule), title: "Cadastros" },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
