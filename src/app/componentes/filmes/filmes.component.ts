import { Component } from '@angular/core';
import { FilmesModel } from '../../model/filmes.model';
import { NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
//Importação do ReactiveFormsModule e demais componentes necessários para o Formulário
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule],
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.css'
})
export class FilmesComponent {
  public filme: FilmesModel = new FilmesModel();
  public listaFilmes: FilmesModel[] = [];

    //Método para gravar os dados no formulário
    public gravar (){
    let novo = new FilmesModel();
    novo.id = this.filme.id;
    novo.titulo = this.filme.titulo;
    novo.diretor = this.filme.diretor;
    novo.genero = this.filme.genero;
    this.listaFilmes.push(novo);
  }

  //Instanciando um novo FormGroup
  formularioLivro = new FormGroup({
    campoId: new FormControl(''),
    campoTitulo: new FormControl(''),
    campoDiretor: new FormControl(''),
    campoGenero: new FormControl('')
  })

  }
