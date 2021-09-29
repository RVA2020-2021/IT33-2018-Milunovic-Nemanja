import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from './../../services/student.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { Subscription } from 'rxjs';
import { Grupa } from 'src/app/models/grupa';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../dialogs/student-dialog/student-dialog.component';
import { Projekat } from 'src/app/models/projekat';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'brojIndeksa', 'grupa', 'projekat', 'actions'];
  dataSource: MatTableDataSource<Student>;
  subscription: Subscription;
  @Input() selectedGrupa: Grupa;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription
      .unsubscribe();
  }

  public loadData(){
    this.subscription = this.studentService.getStudentsByGrupa(this.selectedGrupa.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error : Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojIndeksa?: string, grupa?: Grupa, projekat?: Projekat) : void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {data: {id, ime, prezime, brojIndeksa, grupa, projekat}});
  
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res===1)
      {
        this.loadData();
      }
    })
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();   
    this.dataSource.filter = filterValue;

  }
}
