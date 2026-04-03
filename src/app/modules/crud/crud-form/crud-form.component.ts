import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DisplayColumn } from "../../../models/table/display-column";
import { CrudBase } from "../base/crud-base.component";

@Component({
    selector: "app-crud-form",
    standalone: false,
    templateUrl: "./crud-form.component.html"
})
export class CrudFormComponent implements OnInit {

    //#region Fields

    /** Visualização do formulário */
    @ViewChild("crudForm", { read: ViewContainerRef, static: true })
    public viewForm!: ViewContainerRef;

    /** Nome da entidade */
    @Input() entityName!: string;

    /** Identificador da entidade */
    @Input() entityId!: number;

    /** CrudBaseComponent */
    public crudBaseComponent!: CrudBase;

    //#endregion

    //#region Constructor
    constructor(
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private router: Router
    ) {

    }
    //#endregion

    //#region OnInit
    public ngOnInit(): void {
        this.entityName = this.activatedRoute.snapshot.params["entityName"];
        this.entityId = this.activatedRoute.snapshot.params["entityId"];

        this.loadComponent();
    }

    //#endregion

    //#region loadComponent()

    /**
     * @description Carrega o componente para o formulário
     * @returns {Promise<any>} Promessa vazia
     */
    public async loadComponent(): Promise<void> {
        const moduleImported = await import(`../entities/${this.entityName}/${this.entityName}.component.ts`);
        const componentName: string = Object.keys(moduleImported)[0];
        this.crudBaseComponent = this.viewForm.createComponent(moduleImported[componentName]).instance as CrudBase;

        if (this.crudBaseComponent) {
            this.crudBaseComponent.isForm = true;
            this.crudBaseComponent.entityId = this.entityId;

            this.crudBaseComponent.loadEntity();
            this.cdr.detectChanges();
        }
    }

    //#endregion

    //#region Members 'Geral' :: cancel(), save()

    /**
     * @description Retorna o valor boolean para salvamento válido
     * @returns {boolean} true => sim; false => não
     */
    public canSave(): boolean {
        if (!this.crudBaseComponent)
            return false;

        return this.crudBaseComponent.canSave();
    }

    /**
     * @description Cancela todas as alterações e retorna para a listagem
     * @returns {void} Vazio
     */
    public cancel(): void {
        this.router.navigate(["manager/list", this.entityName]);
    }

    //#endregion

}
