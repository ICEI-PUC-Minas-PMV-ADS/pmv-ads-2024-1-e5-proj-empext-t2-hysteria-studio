import prismaClient from "../../prisma";

interface ServicoRequest{
  nome: string;
  preco: number;
  descricao: string;
}

class CriarServicoService{
  async execute({ nome, preco, descricao }: ServicoRequest){
    if(!nome || !preco){
      throw new Error("Error")
    }

    const servico = await prismaClient.servico.create({
      data:{
        nome: nome,
        preco: preco,
        descricao: descricao,
      }
    })

    return servico;
  }
}

export { CriarServicoService }