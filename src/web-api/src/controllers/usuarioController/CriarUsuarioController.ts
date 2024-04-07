import { Request, Response } from 'express';
import { CriarUsuarioService } from '../../services/usuarioService/CriarUsuarioService';

class CriarUsuarioController {
  async handle( request: Request, response: Response ) {
    try {
      const { nome, cpf, data_de_nascimento, telefone, endereco, email, flag_maior_idade, responsavel, login, senha, flag_admin } = request.body;

      const criarUsuarioService = new CriarUsuarioService();

      const usuario = await criarUsuarioService.execute({
        nome,
        cpf,
        data_de_nascimento,
        telefone,
        endereco,
        email,
        flag_maior_idade,
        responsavel,
        login,
        senha,
        flag_admin,
      });

      
      return response.json( usuario );
    } catch ( exception: any ) {
      return response.status( 400 ).json( { error: exception.message } );
    }
  }

  async login( request: Request, response: Response ) {
    try {
      const criarUsuarioService = new CriarUsuarioService();

      const usuario = await criarUsuarioService.login(
        request.body
      );

      return response.json( usuario );
    } catch ( exception: any ) {
      return response.status( 400 ).json( { error: exception.message } );
    }
  }
}

export { CriarUsuarioController };
