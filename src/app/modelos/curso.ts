import { Disciplina } from "./disciplina";

export interface Curso {
  id: number;
  curso_nome: string;
  disciplinas: Disciplina[];
}
