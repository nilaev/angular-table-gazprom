import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PostsService} from "../posts.service";

export interface TableRow {
  id: number;
  name: string;
  username: string;
  email: string;
  shortAddress: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  dataSource: MatTableDataSource<TableRow> = new MatTableDataSource();
  rows: TableRow[] = [];
  columns: string[] = ['id', 'name', 'username', 'email', 'address', 'phone', 'website'];
  value: string | undefined;

  constructor(private postService: PostsService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;

  ngOnInit() {
    this.postService.getPosts().then(response => {
      this.rows = response.data;
      for (const row of this.rows) {
        // @ts-ignore
        row['shortAddress'] = `${row.address.city}, ${row.address.street}, ${row.address.suite}`;
      }

      this.dataSource = new MatTableDataSource(this.rows);
      // @ts-ignore
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateSearchInput() {
    this.value = '';
    // @ts-ignore
    this.dataSource.filter = '';
  }

}
