import prismaClient from "../../prisma";

interface FinishRequest{
  agenda_id: string;
  user_id: string;
}

class FinalizarAgendaService{
  async execute({ agenda_id, user_id }: FinishRequest){

    if(agenda_id === '' || user_id === ''){
      throw new Error("Error.")
    }

    try{

      const belongsoUser = await prismaClient.servico.findFirst({
        where:{
          id: agenda_id,
          user_id: user_id
        }
      })

      if(!belongsoUser){
        throw new Error("Não Autorizado")
      }

      await prismaClient.servico.delete({
        where:{
          id: agenda_id
        }
      })
      
      return { message: "Finalizado com sucesso."};

    }catch(err){
      console.log(err);
    //  throw new Error(err);
    }
  }
}

export { FinalizarAgendaService }