import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataStorageService} from '../../../../Services/Data Storage/data-storage.service';
import {Router} from '@angular/router';
import {GithubUserRepositoryList} from '../../../../Interfaces/GithubUserRepositoryList';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-githubuser-repositories',
  templateUrl: './githubuser-repositories.component.html',
  styleUrls: ['./githubuser-repositories.component.scss']
})
export class GithubUserRepositoriesComponent implements OnInit, DoCheck {

  constructor(
    private httpClient: HttpClient,
    private dataStorageService: DataStorageService,
    private router: Router,
  ) { }
  githubUserReposList: Array<GithubUserRepositoryList> = [];
  displayedColumns: string[] = ['id', 'userName', 'name', 'url'];
  dataSource = new MatTableDataSource(this.githubUserReposList);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  manageUserData: any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // tslint:disable-next-line:variable-name
  getGithubUserReposList(url: any) {
    if (url) {
      this.httpClient.get(url)
      .subscribe(res => {
        if (res) {
          const data: any = res;
          this.githubUserReposList = [];
          for (const item of data) {
            const obj: GithubUserRepositoryList = {
              id: item.id,
              userName: item.owner.login,
              name: item.name,
              url: item.url
            };
            this.githubUserReposList.push(obj);
          }
          this.dataSource = new MatTableDataSource(this.githubUserReposList);
          console.log(this.dataSource.data);
          this.dataSource.filter = '';
          this.dataSource.paginator = this.paginator;
        } else {
          this.githubUserReposList = [];
          this.dataSource = new MatTableDataSource(this.githubUserReposList);
          console.log(this.dataSource.data);
          this.dataSource.filter = '';
          this.dataSource.paginator = this.paginator;
        }
      }, error => {
        this.githubUserReposList = [];
        this.dataSource = new MatTableDataSource(this.githubUserReposList);
        this.dataSource.filter = '';
        this.dataSource.paginator = this.paginator;
        throw  new Error(error.message);
      });
    } else {
      this.githubUserReposList = [];
      this.dataSource = new MatTableDataSource(this.githubUserReposList);
      this.dataSource.filter = '';
      this.dataSource.paginator = this.paginator;
    }
  }

  setGithubRepositoryList() {
    this.manageUserData = this.dataStorageService.getValue();
    const url = this.dataStorageService.getValue();
    if (url !== undefined) {
      this.getGithubUserReposList(url);
    }
  }
  ngOnInit() {
    this.setGithubRepositoryList();
  }
  ngDoCheck() {
   if (!this.manageUserData) {
     this.router.navigate(['/']);
   }
  }
}
