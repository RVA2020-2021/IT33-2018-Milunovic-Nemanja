import { Grupa } from './grupa';
import { Projekat } from './projekat';
export class Student{
    id: number;
    ime: string;
    prezime: string;
    brojIndeksa: string;
    grupa: Grupa;
    projekat: Projekat;
}