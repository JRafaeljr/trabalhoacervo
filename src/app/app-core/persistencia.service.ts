import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { LivrosModel } from '../model/livros.model';

@Injectable({
  providedIn: 'root'
})
export class PersistenciaService extends Dexie{
  livros: Dexie.Table<LivrosModel, number>;

  constructor() {
    super('LivrosDB');
    this.version(1).stores({
      livros: '' + '++id, ' +  'titulo,' + 'autor,' + 'paginas,' + 'imagem',
    });
    this.livros = this.table('livros');
  }

 async addLivro(livro: LivrosModel): Promise<number>{
    return await this.livros.add(livro);
  }

  async removerEntrada(id: number): Promise<void>{
    return await this.livros.delete(id);
  }

  async buscarEntradas(): Promise<LivrosModel[]>{
    return await this.livros.toArray();
  }

  async atualizarEntrada(id: number, entrada: LivrosModel): Promise<number>{
    return await this.livros.update(id, entrada);
  }
}
