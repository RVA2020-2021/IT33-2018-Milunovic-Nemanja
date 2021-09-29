import { AboutComponent } from './components/about/about.component';
import { AuthorComponent } from './components/author/author.component';
import { HomeComponent } from './components/home/home.component';
import { ProjekatComponent } from './components/projekat/projekat.component';
import { StudentComponent } from './components/student/student.component';
import { GrupaComponent } from './components/grupa/grupa.component';
import { SmerComponent } from './components/smer/smer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'smer', component: SmerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'student', component: StudentComponent },
  { path: 'grupa', component: GrupaComponent },
  { path: 'projekat', component: ProjekatComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'author', component: AuthorComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
