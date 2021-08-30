import { SmerDialogComponent } from './../dialogs/smer-dialog/smer-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { SmerService } from './../../services/smer.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Smer } from 'src/app/models/smer';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-smer',
  templateUrl: './smer.component.html',
  styleUrls: ['./smer.component.css']
})
export class SmerComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<Smer>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private smerService: SmerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void{
    this.subscription
    .unsubscribe();
  }

  loadData(): void{
    this.subscription = this.smerService.getAllSmer()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error : Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();   
    this.dataSource.filter = filterValue;

  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string) : void {
    const dialogRef = this.dialog.open(SmerDialogComponent, {data: {id,naziv,oznaka}});
  
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res===1)
      {
        this.loadData();
      }
    })
  }

}
