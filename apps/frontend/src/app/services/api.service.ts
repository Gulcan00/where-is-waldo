import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ValidatePayload } from '../models/validate-payload';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor() { }

  validate(payload: ValidatePayload) {
    return this.http.post(`${this.baseUrl}/validate`, payload);
  }

  getCharacters() {
    return this.http.get<Character[]>(`${this.baseUrl}/character`);
  }

  startGame() {
    return this.http.post(`${this.baseUrl}/start-game`, null);
  }

  endGame() {
    return this.http.post<string>(`${this.baseUrl}/end-game`, null);
  }

  saveScore(id: number, name: string) {
    return this.http.put(`${this.baseUrl}/score/${id}`, 
      {name}
    );
  }

}
