import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubUsersRoutingModule } from './github-users-routing.module';
import {GithubUsersComponent} from '../Components/github-users/github-users.component';
import {GithubUserRepositoriesComponent} from '../Components/githubuser-repositories/githubuser-repositories.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    GithubUsersComponent,
    GithubUserRepositoriesComponent,
  ],
  imports: [
    CommonModule,
    GithubUsersRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class GithubUsersModule { }
