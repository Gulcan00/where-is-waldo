import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ValidatePayload } from '../models/validate-payload';

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
}
