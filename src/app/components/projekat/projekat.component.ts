import { ProjekatDialogComponent } from './../dialogs/projekat-dialog/projekat-dialog.component';
import { ProjekatService } from './../../services/projekat.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Projekat } from 'src/app/models/projekat';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource: MatTableDataSource<Projekat>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(private projekatService: ProjekatService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  loadData(): void{
    this.subscription = this.projekatService.getAllProjekat()
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

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string) : void {
    const dialogRef = this.dialog.open(ProjekatDialogComponent, {data: {id,naziv,oznaka,opis}});
  
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res===1)
      {
        this.loadData();
      }
    })
  }
}
