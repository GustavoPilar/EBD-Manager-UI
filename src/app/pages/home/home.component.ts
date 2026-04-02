import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { MenuSelectionService } from "../../services/utils/menu-selection.service";

@Component({
  selector: "app-home",
  standalone: false,
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

  //#region Fields

  public roots: MenuItem[] = [];

  public carouselItems: string[] = [];

  //#endregion

  //#region Contructor
  constructor(
    private menuSelectionService: MenuSelectionService
  ) {

  }
  //#endregion

  //#region OnInit
  public ngOnInit(): void {
    this.roots = this.menuSelectionService.getMenuItems();

    this.roots.forEach((root: MenuItem) => {
      this.getChildMenu(root, true);
    });
  }
  //#endregion

  //#region Members

  public getChildMenu(menu: MenuItem, isRoot: boolean): void {
    if (!isRoot)
      this.carouselItems = [...this.carouselItems, menu.label!];

    if (menu.items)
      menu.items.forEach((child: MenuItem) => {
        this.getChildMenu(child, false);
      });
  }

  //#endregion

}
