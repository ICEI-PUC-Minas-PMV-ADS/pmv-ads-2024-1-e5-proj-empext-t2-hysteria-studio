import prismaClient from "../../prisma";

interface ExcluirRequest{
  servico_id: string;
}

class ExcluirServicoService{
  async execute({ servico_id }: ExcluirRequest){

    if(servico_id === '' ){
      throw new Error("Error.")
    }

    try{

      await prismaClient.servico.delete({
        where:{
          id: servico_id
        }
      })
      
    return { message: "Excluído com sucesso."};

    }catch(err){
      console.log(err);
     // throw new Error(err);
    }
  }
}

export { ExcluirServicoService }