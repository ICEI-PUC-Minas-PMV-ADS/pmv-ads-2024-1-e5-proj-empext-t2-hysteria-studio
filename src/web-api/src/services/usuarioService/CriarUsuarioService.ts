import prismaClient from '../../prisma';
import { isEmail } from 'validator';

interface UsuarioRequest {
    nome: string;
    cpf: string;
    data_de_nascimento: Date;
    telefone: string;
    endereco: string;
    email: string;
    flag_maior_idade: number;
    responsavel: string;
    login: string;
    senha: string;
    flag_admin: number;
}

class CriarUsuarioService {

    async execute({ nome, cpf, data_de_nascimento, telefone, endereco, email, flag_maior_idade, responsavel, login, senha, flag_admin }: UsuarioRequest) {
        if (!nome || !cpf || !data_de_nascimento || !telefone || !endereco || !email || !flag_maior_idade || !responsavel || !login || !senha || !flag_admin) {
            throw new Error( "Dados incompletos, verifique os campos" );
        }

        if (!isEmail(email)) {
            throw new Error( 'Email inválido' );
        }

        const usuarioExistente = await prismaClient.usuario.findFirst({
            where:{
                OR: [
                    { cpf },
                    { email },
                    { login },
                ],
            },
        });

        if(usuarioExistente){
            throw new Error("Usuario já Cadastrado, tente novamente ou entre em contato com o administrador")
        }


        const dataNascimento = new Date(data_de_nascimento);

        const dt_criacao = new Date();

        const usuario = await prismaClient.usuario.create({
            data: {
                nome,
                cpf,
                data_de_nascimento: dataNascimento,
                telefone,
                endereco,
                email,
                flag_maior_idade,
                responsavel,
                login,
                senha,
                flag_admin,
                dt_criacao,
            }
        });

        return usuario;
    }
}

export { CriarUsuarioService };