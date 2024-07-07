import { Component, OnInit } from '@angular/core';
import { LivrosModel } from '../../model/livros.model';
import { NgFor } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {PersistenciaService} from "../../app-core/persistencia.service";
declare var $: any;
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent implements OnInit{
  i: number =0;
  listaLivros: any[] = [];
  formularioLivro: FormGroup;
  entradaVisualizar: any;


  constructor(private db: PersistenciaService, private fb: FormBuilder) {

    this.formularioLivro = this.fb.group({
        Titulo: ['', Validators.required],
        Autor: ['', Validators.required],
        Paginas: ['', Validators.required],
        id:[0],
        imagem: ['']
    });
  }
//Método para gravar os dados no formulário
  gravar (){
    if(this.formularioLivro.valid){
      const novo: LivrosModel = new LivrosModel(
        this.formularioLivro.value.Titulo,
        this.formularioLivro.value.Autor,
        this.formularioLivro.value.Paginas,
        undefined,
        this.formularioLivro.value.imagem
      );
      console.log('dados', novo)
      this.db.addLivro(novo).then(resposta =>{
        if (resposta > 0) {
          Swal.fire('Sucesso', 'Tarefa salva com sucesso!', 'success');
          this.formularioLivro.reset();
          this.closeEditar();
          this.listarEntradas();
        }
      }).catch (respostaError => {
        Swal.fire('Não foi dessa vez', 'Não foi possível salvar a tarefa, tente novamente mais tarde', 'error');
        console.log(respostaError);
      })
    }else{
      console.log("CAMPOS INVALIDOS ENCONTRADOS.");
      console.log("DADOS DOS CAMPOS: ", this.formularioLivro.value);
      Swal.fire('Cuidado', 'Alguns campos do formulário não estão corretos.', 'warning');
      this.marcarTodosComoClicados();
    }
    }

    isCampoValido (inputNome: string) : boolean{
      const campo: any = this.formularioLivro.get(inputNome);
      return campo && campo.touched && campo.invalid;
    }

    listarEntradas() {
      this.db.buscarEntradas().then(resposta => {
        this.listaLivros= resposta;
      })
    }

    openEditar () {
      $('#editar').modal('show');
    }

    closeEditar () {
      $('#editar').modal('hide');
    }

    setEntradaAtual (livro: LivrosModel) {
      this.entradaVisualizar = livro;
    }

    //Método para excluir uma entrada da tabela
    excluirEntrada(id: number) {
      Swal.fire (
        {
            title: 'Tem certeza?',
            text: 'Você não poderá voltar atrás!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim! Deletar!',
            confirmButtonColor: '#3085d6'
        }) .then((tipoBotao) => {
          if(tipoBotao.isConfirmed){
            this.db.removerEntrada(id).then(() => {
              Swal.fire('Deletado!', 'A entrada foi deletada.', 'success');
              this.listarEntradas();
            });
          }
        }).catch(error => {
          console.log(error);
          Swal.fire('ERRO!', 'A entrada não foi deletada.', 'error')
        });
    }

    submitForm() {
      if (this.formularioLivro.value.id > 0) {
          this.editarFormEntrada();
      }else {
        this.gravar();
      }
    }
    //Método para carregar os dados de entrada do Formulário
    carregarDadosEntrada (entradaEditar: LivrosModel) {
      this.formularioLivro.patchValue({
          Titulo: entradaEditar.titulo,
          Autor: entradaEditar.autor,
          Paginas: entradaEditar.paginas,
          id: entradaEditar.id,
          imagem: entradaEditar.imagem
      });
      this.openEditar();

    }

    //Método para editar o Formulário
      editarFormEntrada() {
        if (this.formularioLivro.valid){
          const editarEntrada: LivrosModel = new LivrosModel(
            this.formularioLivro.value.Titulo,
            this.formularioLivro.value.Autor,
            this.formularioLivro.value.Paginas,
            this.formularioLivro.value.id,
            this.formularioLivro.value.imagem
          );
          this.db.atualizarEntrada(this.formularioLivro.value.id, editarEntrada).then(reposta => {
            if(reposta === 1) {
              Swal.fire('Sucesso!', 'Entrada editada com sucesso.', 'success');
              this.formularioLivro.reset();
              this.closeEditar();
              this.listarEntradas();
            }else{
              Swal.fire('Atenção', 'Nenhuma entrada encontrada, ou nenhuma alteração necessária', 'info');
            }
          }).catch(error => {
            Swal.fire('Cuidado', 'Não foi possível editar a entrada.', 'error');
          });
        }else{
          Swal.fire('Cuidado!', 'Alguns campos estão incorretos.', 'warning');
          this.marcarTodosComoClicados();
        }
      }

    marcarTodosComoClicados(){
      Object.values(this.formularioLivro.controls).forEach(campo => {
        campo.markAsTouched();
      });
    }

    onFileChange(event: any){
      const file = event.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          this.formularioLivro.patchValue({imagem: loadEvent?.target?.result});
        };
        reader.readAsDataURL(file);
      }
    }

    ngOnInit(): void {
    this.listarEntradas();

  }
}
