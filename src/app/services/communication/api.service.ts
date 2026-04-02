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

  //#region Members :: getEntities()

  public getEntities(entityName: string): Observable<any[]> {
    return of ([
      {name: "Gustavo", age: 21, status: true, isMale: true },
      {name: "Yasmin", age: 19, status: true, isMale: false },
    ]);
  }

  //#endregion

}
