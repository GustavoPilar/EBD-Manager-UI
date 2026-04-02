import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem, PrimeIcons } from "primeng/api";

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

  private createMenuManager(): MenuItem {
    const routeRoot: string = "manager/list";

    let root: MenuItem = {
      label: "Cadastro",
      icon: PrimeIcons.LIST,
      items: [
        { label: "Alunos", icon: PrimeIcons.USERS, command: () => this.navigateTo([routeRoot, "student"]), badge: "Crie ou atualize alunos da EBD" },
        { label: "Classes", icon: PrimeIcons.OBJECTS_COLUMN, command: () => this.navigateTo([routeRoot, "class"]), badge: "Crie ou atualize turmas da EBD, além de remanejar alunos para outras turmas" }
      ]
    };

    return root;
  }

  private createMenuApplication(): MenuItem {
    const routeRoot: string = "application";

    let root: MenuItem = {
      label: "Aplicação",
      icon: PrimeIcons.DESKTOP,
      items: [
        { label: "Chamada", icon: PrimeIcons.TICKET, command: () => this.navigateTo([routeRoot, "student"]), badge: "Faça chamada de alguma turma ou veja chamadas anteriores" },
        { label: "Relatório", icon: PrimeIcons.FILE, command: () => this.navigateTo([routeRoot, "class"]), badge: "Crie um relatório ou veja relatórios anteriores" }
      ]
    };

    return root;
  }

  public getMenuItems(): MenuItem[] {
    return [
      this.createMenuManager(),
      this.createMenuApplication()
    ];
  }

  //#endregion

  //#region Members 'Action' :: navigateTo()

  private navigateTo(target: string[]): void {
    this.router.navigate(target);
  }

  //#endregion
}
