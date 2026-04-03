import { OnInit, Output } from "@angular/core";
import { ApiService } from "../../../services/communication/api.service";
import { Observable, of, switchMap } from "rxjs";
import { DisplayColumn } from "../../../models/table/display-column";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EntityDescription } from "../../../models/entity-description";
import { MessageService, PrimeIcons } from "primeng/api";

export abstract class CrudBase {

  //#region Fields

  public entityId!: number;

  public selectedEntity!: any;

  /** É listagem? */
  public isList: boolean = false;

  /** É formulário? */
  public isForm: boolean = false;

  /** Formulário */
  public entityForm!: FormGroup;

  /** Data atual */
  public currentDate: Date = new Date();

  //#endregion

  //#region Constructor
  constructor(
    protected apiService: ApiService,
    protected formBuilder: FormBuilder,
    protected messageService: MessageService
  ) {

  }
  //#endregion

  //#region Members 'list' :: loadEntities(), getDisplayColumns(), getTagBackground(), getBooleanColumnValue()
  
  /**
   * @description Carrega a lista de entidades
   * @returns {Observable<any>} Observável
   */
  public loadEntities(): Observable<any> {
    return this.apiService.getEntities(this.getEntityName());
  }

  /**
   * @description Retorna as colunas para a tabela da listagem
   * @returns {DisplayColumn[]} Colunas
   */
  public abstract getDisplayColumns(): DisplayColumn[];

  /**
   * @description Retorna a classe de estilização para tag
   * @param value Valor
   * @param field Campo
   * @returns {string} Classe de estilização
   */
  public getTagBackground(value: boolean, field: string): string {
    return value ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600";
  }

  /**
   * @description Retorna o valor em string do campo booleano
   * @param value Valor
   * @param field Campo
   * @returns {string} Valor em string
   */
  public getBooleanColumnValue(value: boolean, field: string): string {
    return value ? "Sim" : "Não";
  }

  //#endregion

  //#region Members 'Form'

  /**
   * @description Carrega a entidade selecionada ou nova, inicia o formulário e carrega os recursos necessários
   * @returns {void} Vazio
   */
  public loadEntity(): void {

    this.apiService.getEntity(this.getEntityName(), this.entityId).pipe(
      switchMap((result: any) => {
        this.selectedEntity = result;
        this.entityForm = this.createForm();
        return this.loadResources();
      })
    ).subscribe({
      next: (result: any) => {
        this.messageService.add({
          severity: "error",
          summary: "Sucesso",
          detail: "registro carregado com sucesso!",
          icon: PrimeIcons.CHECK,
          closable: true
        });
      },
      error: (error: any) => {
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "O registro não foi carregado corretamente.\nTente novemente",
          icon: PrimeIcons.TIMES,
          closable: true
        });
      }
    });
  }

  /**
   * @description Carrega recursos
   * @returns {Observable<any>} Obsersable
   */
  public loadResources(): Observable<any> {
    return of([]);
  }

  /**
   * @description Cria o formulário
   * @returns FromGroup
   * @abstract
   */
  public abstract createForm(): FormGroup;

  /**
   * @description Retorna um valor booleano para a validação do formulário
   * @returns {boolean} Se o formulário é valido ou não
   */
  public canSave(): boolean {
    if (!this.entityForm)
      return false;

    return this.entityForm.valid;
  }

  /**
   * @description Atualiza apenas campos do formulário informados
   * @param {any} values Valores
   * @returns {void}
   */
  public patchForm(values: any): void {
    this.entityForm.patchValue(values);
  }

  //#endregion

  //#region Members 'Geral' :: getEntityName()

  /**
   * @description Retorna o nome da entidade
   * @returns {string} Nome da entidade
   */
  public abstract getEntityName(): string;

  /**
   * @description Retorna a descrição da entidade
   * @returns {EntityDescription} Descrição da entidade
   */
  public abstract getEntityDescription(): EntityDescription;


  //#endregion


}
