import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LivrosComponent } from "./componentes/livros/livros.component";
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";
import { RodapeComponent } from "./componentes/rodape/rodape.component";
import { BannerComponent } from "./componentes/banner/banner.component";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LivrosComponent, CabecalhoComponent, RodapeComponent, BannerComponent] //Importações necessárias para carregar os componentes e as rotas
})
export class AppComponent {
  title = 'acervo';
  showAlert() {
    Swal.fire('Olá!', 'SweetAlert2 está funcionando!', 'success');
  }
}
