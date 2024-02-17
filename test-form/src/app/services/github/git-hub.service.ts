import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubUser } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<GitHubUser[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<GitHubUser[]>(url);
  }
}
