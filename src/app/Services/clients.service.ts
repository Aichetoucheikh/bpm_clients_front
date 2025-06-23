import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { clientsEndpoint } from '../configs/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {}

  getAllClients(page = 0, size = 20): Observable<any> {
    return this.http.get<Client[]>(clientsEndpoint + "?page=" + page + "&size=" + size);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${clientsEndpoint}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(clientsEndpoint, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${clientsEndpoint}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${clientsEndpoint}/${id}`);
  }
  blockClient(id: number, motif: string): Observable<Client> {
    return this.http.post<Client>(`${clientsEndpoint}/${id}/block`, { motif });
  }
  
  unblockClient(id: number): Observable<Client> {
    return this.http.post<Client>(`${clientsEndpoint}/${id}/unblock`, {});
  }
  
  getOtp(id: number): Observable<any> { // Le type de retour dépend de votre backend
      return this.http.get<any>(`${clientsEndpoint}/${id}/otp`);
  }
  
  searchClientsByPhone(phone: string, page: number, size: number) {
    return this.http.get<any>('http://localhost:8080/clients/search', {
      params: {
        phone: phone,
        page: page,
        size: size
      }
    });
  }

}
