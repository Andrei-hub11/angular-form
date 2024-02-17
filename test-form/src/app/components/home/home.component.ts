import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/services/github/git-hub.service';
import { GitHubUser } from 'src/app/types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private github: GitHubService) {}
  users: GitHubUser[] | [] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.github.getUsers().subscribe(
      (data) => {
        // Exibir os 10 primeiros usuários
        this.users = data.slice(0, 10);
        console.log(this.users);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
