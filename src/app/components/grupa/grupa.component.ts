import { GrupaDialogComponent } from './../dialogs/grupa-dialog/grupa-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GrupaService } from './../../services/grupa.service';
import { Grupa } from './../../models/grupa';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GroupedObservable, Subscription } from 'rxjs';
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
  selectedGrupa: Grupa;
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

        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'smer' ? currentTerm + data.smer.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'smer': return data.smer.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

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

  selectRow(row: any){
    this.selectedGrupa = row;
  }

}
