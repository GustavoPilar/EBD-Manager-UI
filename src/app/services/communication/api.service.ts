import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subscribable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  //#region Fields

  //#endregion

  //#region Constructor
  constructor(
    private httpClient: HttpClient
  ) {

  }
  //#endregion

  //#region Members :: getEntities(), getEntity()

  /**
   * @description Retorna o observable para a consulta
   * @param entityName Nome da entidade
   * @returns {Observable<any>} Obsersable
   */
  public getEntities(entityName: string): Observable<any[]> {
    return of ([
      {id: 1, name: "Gustavo Henrique Pilar da Silva", age: 21 , birthDate: new Date("01/09/2004"), status: true, isMale: true },
      {id: 2, name: "Yasmin Villas Boas Maia", age: 19, birthDate: null, status: true, isMale: false },
    ]);
  }

  /**
   * @description Retorna a entidade desejada. Caso seja Id igual a 0, retorna uma entidade vazia
   * @param entityName Nome da entidade
   * @param entityId Id da entidade
   * @returns {Observable<any>} Obsersable
   */
  public getEntity(entityName: string, entityId: number): Observable<any> {
    if (entityId == 0)
      return of({id: 0});

    let entities: any[] = [
      {id: 1, name: "Gustavo Henrique Pilar da Silva", age: 21 , birthDate: new Date("01/09/2004"), status: true, isMale: true },
      {id: 2, name: "Yasmin Villas Boas Maia", age: 19, birthDate: null, status: true, isMale: false },
    ]
    
    return of(entities.find(x => x.id == entityId));
  }

  //#endregion

}
