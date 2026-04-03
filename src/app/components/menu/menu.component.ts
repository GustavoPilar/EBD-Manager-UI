import { MenuSelectionService } from './../../services/utils/menu-selection.service';
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
    selector: "app-menu",
    standalone: false,
    templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit {

    //#region Fields

    /** Items de menu */
    public items: MenuItem[] = [];

    //#endregion

    //#region Constructor
    constructor(
        private menuSelectionService: MenuSelectionService
    ) {

    }
    //#endregion

    //#region OnInit
    public ngOnInit(): void {
        this.items = this.menuSelectionService.getMenuItems();
    }
    //#endregion

}
