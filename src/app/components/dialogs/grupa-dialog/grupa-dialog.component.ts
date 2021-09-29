import { SmerService } from './../../../services/smer.service';
import { GrupaService } from './../../../services/grupa.service';
import { Grupa } from './../../../models/grupa';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Smer } from 'src/app/models/smer';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {

  public flag: number;
  smerovi: Smer[];

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<GrupaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Grupa,
              public grupaService: GrupaService, public smerService: SmerService) { }

  ngOnInit(): void {
    this.smerService.getAllSmer().subscribe(
      data => {
        this.smerovi = data;
      }
    );
  }

  public addGrupa(): void {
    this.grupaService.addGrupa(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodata grupa: ' + this.data.oznaka, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja nove grupe.' , 'Zatvori', {
        duration: 2500
      })
    }
  }

  public updateGrupa(): void {
    this.grupaService.updateGrupa(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovana grupa: ' + this.data.oznaka, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postejece grupe.' , 'Zatvori', {
        duration: 2500
      })
    }
  }

  public deleteGrupa(): void {
    this.grupaService.deleteGrupa(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana grupa: ' + this.data.oznaka, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja grupe.' , 'Zatvori', {
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

  compareTo(a,b) {
    return a.id == b.id;
  }
}
