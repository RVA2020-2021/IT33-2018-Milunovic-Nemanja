import { ProjekatService } from './../../../services/projekat.service';
import { GrupaService } from './../../../services/grupa.service';
import { Projekat } from './../../../models/projekat';
import { Grupa } from './../../../models/grupa';
import { StudentService } from './../../../services/student.service';
import { Student } from './../../../models/student';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  public flag: number;
  public grupe: Grupa;
  public projekti: Projekat;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Student, public studentService: StudentService,
    public grupaService: GrupaService, public projekatService: ProjekatService) { }
  

  ngOnInit(): void {
    this.grupaService.getAllGrupa().subscribe(data => {
      this.grupe = data;
    });

    this.projekatService.getAllProjekat().subscribe(data => {
      this.projekti = data;
    });
  }

  public addStudent(): void {
    console.log(this.data);
    this.studentService.addStudent(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspešno dodat student: ' + this.data.ime + ' ' + this.data.prezime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog studenta.' , 'Zatvori', {
        duration: 2500
      })
    }
  }

  public updateStudent(): void {
    this.studentService.updateStudent(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan student: ' + this.data.ime + ' ' + this.data.prezime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postejeceg studenta.' , 'Zatvori', {
        duration: 2500
      })
    }
  }

  public deleteStudent(): void {
    this.studentService.deleteStudent(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan smer: ' + this.data.ime + ' ' + this.data.prezime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja smera.' , 'Zatvori', {
        duration: 2500
      })
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }
}
