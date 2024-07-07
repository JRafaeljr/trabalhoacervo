export class LivrosModel {
  public id?: number;
  public titulo: string;
  public autor: string;
  public paginas: number;
  public imagem?: string;

  constructor(titulo: string, autor: string, paginas: number, id?: number,imagem?: string){
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.imagem = imagem;
  }
}
//Atributos e construtor para usar nos formulários dos componentes
