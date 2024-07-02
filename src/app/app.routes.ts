import { Routes } from '@angular/router';
import { LivrosComponent } from './componentes/livros/livros.component';
import { FilmesComponent } from './componentes/filmes/filmes.component';
import { JogosComponent } from './componentes/jogos/jogos.component';
import { PrincipalComponent } from './componentes/principal/principal.component';

export const routes: Routes = [
  { path: "", redirectTo: "principal", pathMatch: "full"},
  { path: "principal", component: PrincipalComponent},
  {path: "livros", component: LivrosComponent},
  {path: "filmes", component: FilmesComponent},
  {path: "jogos", component: JogosComponent}
];
