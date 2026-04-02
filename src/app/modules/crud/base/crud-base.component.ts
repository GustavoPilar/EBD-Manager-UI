import { OnInit } from "@angular/core";
import { ApiService } from "../../../services/communication/api.service";
import { Observable } from "rxjs";
import { DisplayColumn } from "../../../models/table/display-column";

export abstract class CrudBase {

  //#region Fields
  public isList: boolean = false;
  public isForm: boolean = false;
  //#endregion

  //#region Constructor
  constructor(
    protected apiService: ApiService
  ) {

  }
  //#endregion

  //#region Members

  public loadEntities(): Observable<any> {
    return this.apiService.getEntities(this.getEntityName());
  }

  public abstract getEntityName(): string;

  public abstract getDisplayColumns(): DisplayColumn[];

  public getTagBackground(column: boolean, field: string): string {
    return column ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600";
  }

  public getBooleanColumnValue(booleanValue: boolean, field: string): string {
    return booleanValue ? "Sim" : "Não";
  }

  //#endregion


}
