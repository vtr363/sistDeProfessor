import { User } from "./user";
import { Curso } from "./curso";

export interface Usuario {
  user: User; // Herda parâmetros de User.
  cpf: string;
  tipo_horario: string; // Horista, Parcial ou Integral.
  carga_semanal: number;
  curso: Curso[];
  tipo: String; // Professor, Coordenador ou Administrador.
}
