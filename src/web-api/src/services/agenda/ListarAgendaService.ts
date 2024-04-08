import prismaClient from "../../prisma";

class ListarAgendaService{
  async execute(){

    const agenda = await prismaClient.agenda.findMany()

    return agenda;
  }
}

export { ListarAgendaService }