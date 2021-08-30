import { ProjekatComponent } from './components/projekat/projekat.component';
import { StudentComponent } from './components/student/student.component';
import { GrupaComponent } from './components/grupa/grupa.component';
import { SmerComponent } from './components/smer/smer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'smer', component: SmerComponent },
  { path: 'home', component: SmerComponent },
  { path: 'student', component: StudentComponent },
  { path: 'grupa', component: GrupaComponent },
  { path: 'projekat', component: ProjekatComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
