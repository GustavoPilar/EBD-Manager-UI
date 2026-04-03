import { EntityDescription } from './../../../../models/entity-description';
import { Component, OnInit } from "@angular/core";
import { CrudBase } from "../../base/crud-base.component";
import { ApiService } from "../../../../services/communication/api.service";
import { DisplayColumn } from "../../../../models/table/display-column";
import { columnType } from "../../../../models/table/column-type";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';

@Component({
  selector: "app-student",
  standalone: false,
  templateUrl: "./students.component.html"
})
export class StudentComponent extends CrudBase implements OnInit {

  //#region Constructor
  constructor(
    protected override apiService: ApiService,
    protected override formBuilder: FormBuilder,
    protected override messageService: MessageService
  ) {
    super(apiService, formBuilder, messageService)
  }
  //#endregion

  //#region OnInit
  public ngOnInit(): void {

  }
  //#endregion

  //#region Members 'CrudBase'
  public override getEntityName(): string {
    return "student";
  }

  public override getEntityDescription(): EntityDescription {
    return { singular: "Aluno", plural: "Alunos", isFamale: false };
  }

  public override getDisplayColumns(): DisplayColumn[] {
    return [
      { field: "name", label: "Nome", type: columnType.Text },
      { field: "age", label: "Idade", type: columnType.Numeric },
      { field: "birthDate", label: "Data de nasc.", type: columnType.Date, styleClass: "hidden md-table-cell" },
      { field: "status", label: "Ativo?", type: columnType.Boolean, styleClass: "hidden md-table-cell" },
      { field: "isMale", label: "Gênero", type: columnType.Boolean },
    ];
  }

  public override getTagBackground(value: boolean, field: string): string {
    if (field != "isMale")
      return super.getTagBackground(value, field);

    return value ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600";
  }

  public override getBooleanColumnValue(value: boolean, field: string): string {
    if (field != "isMale")
      return super.getBooleanColumnValue(value, field);

    return value ? "H" : "M";
  }

  public override createForm(): FormGroup {
    return this.formBuilder.group({
      name: [this.selectedEntity.name, Validators.required],
      status: [this.selectedEntity.status ?? false, Validators.required],
      birthDate: [this.selectedEntity.birthDate],
      age: [this.selectedEntity.age],
      isMale: [this.selectedEntity.isMale ?? false, Validators.required]
    });
  }
  //#endregion

  //#region Members 'OnChange' :: onChangeBirthDate()

  /**
   * @description Quando altera ou limpa a data de aniversário, altera o valor da idade
   * @param date Data selecionada ou vazia
   * @returns {void} Vazio
   */
  public onChangeBirthDate(date: any): void {
    this.patchForm({ age: null });

    if (date) {
      let birthDate: Date = date
      let age: number = this.currentDate.getFullYear() - birthDate.getFullYear();
      const m: number = this.currentDate.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && this.currentDate.getDate() < birthDate.getDate())) {
        age--;
      }

      this.patchForm({age});
    }
  }

}
