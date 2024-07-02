import { Component } from '@angular/core';
import { JogosModel } from '../../model/jogos.model';
import { NgFor } from '@angular/common';
import { NgModel } from '@angular/forms';
//Importação do ReactiveFormsModule e demais componentes necessários para o Formulário
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent {
  public jogo: JogosModel = new JogosModel();
  public listaJogos: JogosModel[] = [];

  //Método para gravar os dados no formulário
  public gravar (){
    let novo = new JogosModel();
    novo.id = this.jogo.id;
    novo.titulo = this.jogo.titulo;
    novo.fabricante = this.jogo.fabricante;
    novo.genero = this.jogo.genero;
    this.listaJogos.push(novo);
  }

  //Instanciando um novo FormGroup
  formularioLivro = new FormGroup({
    campoId: new FormControl(''),
    campoTitulo: new FormControl(''),
    campoFabricante: new FormControl(''),
    campoGenero: new FormControl('')
  })

}
