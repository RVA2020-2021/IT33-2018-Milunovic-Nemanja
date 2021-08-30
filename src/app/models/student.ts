import { Grupa } from './grupa';
import { Projekat } from './projekat';
export class Student{
    id: number;
    ime: string;
    prezime: string;
    broj_indeksa: string;
    grupa: Grupa;
    projekat: Projekat;
}