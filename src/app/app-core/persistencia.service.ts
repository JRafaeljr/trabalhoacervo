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
      livros: '++id, titulo, autor, paginas'
    });
    this.livros = this.table('livros');
  }

  addLivro(livro: LivrosModel): Promise<number>{
    return this.livros.add(livro);
  }
}
