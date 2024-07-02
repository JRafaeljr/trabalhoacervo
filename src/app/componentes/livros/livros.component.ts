import { Component, OnInit } from '@angular/core';
import { LivrosModel } from '../../model/livros.model';
import { NgFor } from '@angular/common';
import {FormBuilder,FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators} from '@angular/forms';
//Importação do ReactiveFormsModule e demais componentes necessários para o Formulário
import {PersistenciaService} from "../../app-core/persistencia.service";


@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule,],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent{
  public listaLivros: LivrosModel[] = [];
  formularioLivro: FormGroup;


  constructor(private db: PersistenciaService, private fb: FormBuilder) {
   
    this.formularioLivro = this.fb.group({
        titulo: ['', Validators.required],
        autor: ['', Validators.required],
        paginas: ['', Validators.required],
        id:[0]
    });
    

  }

//Método para gravar os dados no formulário
  public gravar (){
    if(this.formularioLivro.valid){
      const novo: LivrosModel = new LivrosModel(
        this.formularioLivro.value.titulo,
        this.formularioLivro.value.autor,
        this.formularioLivro.value.paginas,
      );

      console.log('dados', novo)
      this.db.addLivro(novo).then(resposta =>{
        if (resposta > 0) {
          Swal.fire('Sucesso', 'Tarefa salva com sucesso!', 'success');
          this.form.reset();
          this.closeModal();
          this.listarTarefas();
        }
      }).catch (respostaError => {
        Swal.fire('Não foi dessa vez', 'Não foi possível salvar a tarefa, ' +
          'tente novamente mais tarde', 'error');
        console.log(respostaError);
      })
    }else{
      console.log("CAMPOS INVALIDOS ENCONTRADOS.");
      console.log("DADOS DOS CAMPOS: ", this.form.value);
      Swal.fire('Cuidado', 'Alguns campos do formulário não estão ' +
        'corretos.', 'warning');
      this.marcarTodosComoClicados();
    }
    
    }
  }
  submitForm() {
    if (this.formularioLivro.value.id > 0) {
      
    }else {
      this.gravar();
    }
  }

}
