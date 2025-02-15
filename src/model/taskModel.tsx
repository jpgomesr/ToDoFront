enum Priority {
   "Baixa",
   "Media",
   "Alta",
}

export default class taskModel {
   id: string;
   titulo: string;
   descricao: string;
   status: boolean;
   prioridade: Priority;
   userId: string;

   constructor(
      id: string,
      titulo: string,
      descricao: string,
      status: boolean,
      prioridade: Priority,
      userId: string
   ) {
      this.id = id;
      this.titulo = titulo;
      this.descricao = descricao;
      this.status = status;
      this.prioridade = prioridade;
      this.userId = userId;
   }
}
