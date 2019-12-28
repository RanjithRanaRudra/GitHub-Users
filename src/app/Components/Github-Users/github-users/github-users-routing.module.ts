import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GithubUsersComponent} from '../Components/github-users/github-users.component';
import {GithubUserRepositoriesComponent} from '../Components/githubuser-repositories/githubuser-repositories.component';

const routes: Routes = [
  {
    path: '',
    component: GithubUsersComponent
  }, {
    path: ':id/repos',
    component: GithubUserRepositoriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubUsersRoutingModule { }
