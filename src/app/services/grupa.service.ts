import { Grupa } from './../models/grupa';
import { GRUPA_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupaService {

  constructor(private httpClient: HttpClient) { }

  public getAllGrupa(): Observable<any>{
    return this.httpClient.get(`${GRUPA_URL}`);
  }

  public addGrupa(grupa: Grupa): Observable<any> {
    grupa.id=0;
    return this.httpClient.post(`${GRUPA_URL}`, grupa);
  }

  public updateGrupa(grupa: Grupa): Observable<any> {
    return this.httpClient.put(`${GRUPA_URL}`, grupa);
  }

  public deleteGrupa(id: number): Observable<any> {
    return this.httpClient.delete(`${GRUPA_URL}/${id}`);
  }
}
