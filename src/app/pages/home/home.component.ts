import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { MenuSelectionService } from "../../services/utils/menu-selection.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: false,
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

  //#region Fields

  /** Items de menu */
  public roots: MenuItem[] = [];

  /** Items do carrossel */
  public carouselItems: string[] = [];

  //#endregion

  //#region Contructor
  constructor(
    private menuSelectionService: MenuSelectionService,
    private router: Router
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

  /**
   * @description Adiciona apenas os nomes dos filhos de cada meu raiz para o carrosel
   * @param menu menu
   * @param isRoot é menu raiz?
   * @returns {void} Vazio
   */
  private getChildMenu(menu: MenuItem, isRoot: boolean): void {
    if (!isRoot)
      this.carouselItems = [...this.carouselItems, menu.label!];

    if (menu.items)
      menu.items.forEach((child: MenuItem) => {
        this.getChildMenu(child, false);
      });
  }


  /**
   * @description Navega para a url alvo
   * @param url url alvo
   * @returns {void} Vazio
   */
  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  //#endregion

}
