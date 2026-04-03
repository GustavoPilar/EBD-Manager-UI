import { ChangeDetectorRef, Component, Input, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DisplayColumn } from "../../../models/table/display-column";
import { CrudBase } from "../base/crud-base.component";

@Component({
  selector: "app-crud-list",
  standalone: false,
  templateUrl: "./crud-list.component.html"
})
export class CrudListComponent implements OnInit {

  //#region Fields

  /** Nome da entidade */
  @Input() entityName!: string;

  /** Entidades */
  public entities: any[] = [];

  public hasEntity: boolean = false;

  public displayColumns: DisplayColumn[] = [];

  public crudBaseComponent!: CrudBase;

  //#endregion

  //#region Constructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private viewRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {

  }
  //#endregion

  //#region OnInit
  public ngOnInit(): void {
    this.entityName = this.activatedRoute.snapshot.params["entityName"];
    this.hasEntity = this.entityName != undefined;

    this.loadComponent();
  }

  //#endregion

  //#region loadComponent()

  public async loadComponent(): Promise<void> {
    if (this.hasEntity) {
      const moduleImported = await import(`../entities/${this.entityName}/${this.entityName}.component.ts`);
      const componentName: string = Object.keys(moduleImported)[0];
      this.crudBaseComponent = this.viewRef.createComponent(moduleImported[componentName]).instance as CrudBase;

      if (this.crudBaseComponent) {


        this.crudBaseComponent.loadEntities().subscribe({
          next: (result) => {
            setInterval(() => {
              this.displayColumns = [...this.crudBaseComponent.getDisplayColumns()];
              this.entities = [...result];
              this.cdr.detectChanges();
            }, 0);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
  }

  //#endregion

  //#region Members

  public getColumnType(column: DisplayColumn): number {
    return column.type;
  }

  public getColumnValue(value: any): string {
    if (!value)
      return "-";

    return value;
  }

  public getColumnDateValue(date: Date | null): string {
    if (!date)
      return "-";

    return date.toLocaleDateString("pt-BR"); 
  }

  public edit(entity: any): void {
    this.router.navigate(["manager/edit", this.entityName, entity.id]);
  }
  //#endregion
}
