import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {GithubUser} from '../../../../Interfaces/GithubUser';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {DataStorageService} from '../../../../Services/Data Storage/data-storage.service';

@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.scss']
})
export class GithubUsersComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dataStorageService: DataStorageService,
  ) { }

  githubUserList: Array<GithubUser> = [];
  displayedColumns: string[] = ['id', 'avatarURL', 'name', 'url', 'action'];
  dataSource = new MatTableDataSource(this.githubUserList);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getGithubUserList() {
    const url = environment.githubUrl + 'users';
    this.httpClient.get(url)
    .subscribe(res => {
      if (res) {
        const data: any = res;
        this.githubUserList = [];
        for (const item of data) {
          const obj: GithubUser = {
            id: item.id,
            avatarURL: item.avatar_url,
            name: item.login,
            url: item.url,
            reposURL: item.repos_url
          };
          this.githubUserList.push(obj);
        }
        this.dataSource = new MatTableDataSource(this.githubUserList);
        console.log(this.dataSource.data);
        this.dataSource.filter = '';
        this.dataSource.paginator = this.paginator;
      } else {
        this.githubUserList = [];
        this.dataSource = new MatTableDataSource(this.githubUserList);
        console.log(this.dataSource.data);
        this.dataSource.filter = '';
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.githubUserList = [];
      this.dataSource = new MatTableDataSource(this.githubUserList);
      console.log(this.dataSource.data);
      this.dataSource.filter = '';
      this.dataSource.paginator = this.paginator;
      throw  new Error(error.message);
    });
  }

  navigateToUserRepos(user) {
    this.dataStorageService.setValue(user.reposURL);
    this.router.navigate([user.name, 'repos']);
  }
  ngOnInit() {
    this.getGithubUserList();
  }

}
