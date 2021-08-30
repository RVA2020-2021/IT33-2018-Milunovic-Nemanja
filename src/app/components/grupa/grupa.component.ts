import { GrupaDialogComponent } from './../dialogs/grupa-dialog/grupa-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GrupaService } from './../../services/grupa.service';
import { Grupa } from './../../models/grupa';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Smer } from 'src/app/models/smer';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'oznaka', 'smer', 'actions'];
  dataSource: MatTableDataSource<Grupa>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private grupaService: GrupaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  loadData(): void{
    this.subscription = this.grupaService.getAllGrupa()
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

  public openDialog(flag: number, id?: number, oznaka?: string, smer?: Smer) : void {
    const dialogRef = this.dialog.open(GrupaDialogComponent, {data: {id,oznaka,smer}});
  
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res===1)
      {
        this.loadData();
      }
    })
  }

}
