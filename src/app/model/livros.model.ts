export class LivrosModel {
  public id?: number;
  public titulo: string;
  public autor: string;
  public paginas: number;

  constructor(titulo: string, autor: string, paginas: number, id?: number){
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
  }
}
//Atributos e construtor para usar nos formulários dos componentes
