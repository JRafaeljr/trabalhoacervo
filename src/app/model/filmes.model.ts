export class FilmesModel {
  id: number;
  titulo: string;
  diretor: string;
  genero: string;

  constructor() {
    this.id = 0;
    this.titulo = "";
    this.diretor = "";
    this.genero = "";
  }
}
//Atributos e construtor para usar nos formulários dos componentes
