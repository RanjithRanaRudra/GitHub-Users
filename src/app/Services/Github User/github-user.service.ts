import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GithubUserRepositoryList} from '../../Interfaces/GithubUserRepositoryList';

@Injectable({
  providedIn: 'root'
})
export class GithubUserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  githubUserReposList: Array<GithubUserRepositoryList> = [];
  // tslint:disable-next-line:variable-name
  getAllGithubUserRepos(repos_url: string) {
    this.httpClient.get(repos_url).subscribe(res => {
      if (res) {
        const data: any = res;
        for (const item of data) {
          const obj: GithubUserRepositoryList = {
            id: item.id,
            userName: item.owner.login,
            name: item.name,
            url: item.url
          };
          this.githubUserReposList.push(obj);
        }
      } else {
        this.githubUserReposList = [];
      }
    }, error => {
      this.githubUserReposList = [];
      throw  new Error(error.message);
    });
  }
}
