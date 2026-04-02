import { Component, OnInit } from "@angular/core";
import { CrudBase } from "../../base/crud-base.component";
import { ApiService } from "../../../../services/communication/api.service";
import { DisplayColumn } from "../../../../models/table/display-column";
import { columnType } from "../../../../models/table/column-type";

@Component({
  selector: "app-student",
  template: `<p>Student's work</p>`
})
export class StudentComponent extends CrudBase implements OnInit {


  constructor(
    protected override apiService: ApiService
  ) {
    super(apiService)
  }

  public ngOnInit(): void {

  }

  public override getEntityName(): string {
    return "student";
  }

  public override getDisplayColumns(): DisplayColumn[] {
    return [
      { field: "name", label: "Nome", type: columnType.Text },
      { field: "age", label: "Idade", type: columnType.Numeric },
      { field: "birthDate", label: "Data de nasc.", type: columnType.Date, styleClass: "hidden md:block" },
      { field: "status", label: "Ativo?", type: columnType.Boolean },
      { field: "isMale", label: "Gênero", type: columnType.Boolean },
    ];
  }

  public override getTagBackground(column: boolean, field: string): string {
    if (field != "isMale")
      return super.getTagBackground(column, field);

    return column ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600";
  }

  public override getBooleanColumnValue(booleanValue: boolean, field: string): string {
    console.log(field != "isMale");
    if (field != "isMale")
      return this.getBooleanColumnValue(booleanValue, field);

    return booleanValue ? "Homem" : "Mulher";
  }
}
