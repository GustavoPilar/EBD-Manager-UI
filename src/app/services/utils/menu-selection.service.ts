import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem, MenuItemCommandEvent, PrimeIcons } from "primeng/api";

@Injectable({
  providedIn: "root"
})
export class MenuSelectionService {

  //#region Constructor
  constructor(
    private router: Router
  ) {

  }
  //#endregion

  //#region Members :: createMenuManager()

  /**
   * @description Cria o menu de cadastros
   * @returns {MenuItem} Item de menu
   */
  private createMenuManager(): MenuItem {
    const routeRoot: string = "manager/list";

    let root: MenuItem = {
      label: "Cadastro",
      icon: PrimeIcons.LIST,
      items: [
        { label: "Alunos", icon: PrimeIcons.USERS, tooltip: "Crie ou atualize alunos da EBD", url: `${routeRoot}/student` },
        { label: "Classes", icon: PrimeIcons.OBJECTS_COLUMN, tooltip: "Crie ou atualize turmas da EBD, além de remanejar alunos para outras turmas", url: `${routeRoot}/class` }
      ]
    };

    return root;
  }

  /**
   * @description Cria o menu de aplicação
   * @returns {MenuItem} Item de menu
   */
  private createMenuApplication(): MenuItem {
    const routeRoot: string = "application";

    let root: MenuItem = {
      label: "Aplicação",
      icon: PrimeIcons.DESKTOP,
      items: [
        { label: "Chamada", icon: PrimeIcons.TICKET, tooltip: "Faça chamada de alguma turma ou veja chamadas anteriores", url: `${routeRoot}/roll` },
        { label: "Relatório", icon: PrimeIcons.FILE, tooltip: "Crie um relatório ou veja relatórios anteriores", url: `${routeRoot}/report` }
      ]
    };

    return root;
  }

  /**
   * @description Retorna todos os menus
   * @returns {MenuItem[]} Lista de items de menu
   */
  public getMenuItems(): MenuItem[] {
    return [
      this.createMenuManager(),
      this.createMenuApplication()
    ];
  }

  //#endregion
}
