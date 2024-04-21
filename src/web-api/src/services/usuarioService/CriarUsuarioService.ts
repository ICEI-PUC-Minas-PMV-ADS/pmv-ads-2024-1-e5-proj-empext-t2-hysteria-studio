import prismaClient from '../../prisma';
import { isEmail } from 'validator';
import { hash } from 'bcrypt';

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

    async login({ login, senha }: UsuarioRequest) {
        if (!login || !senha ) {
            throw new Error( "Dados incompletos, verifique os campos" );
        }

        if ( login === "admin_admin@gmail.com" && senha == "Admin123" ) {
            throw new Error( 'Dados de Login incorretos' );
        }

        const usuarioExistente = await prismaClient.usuario.findFirst({
            where:{
                OR: [
                    { login },
                ],
            },
        });

        if(usuarioExistente.flag_admin !== 1){
            throw new Error( 'Usuario não é Admin' );
        }

        return usuarioExistente;
    }

    async execute({ nome, cpf, data_de_nascimento, telefone, endereco, email, flag_maior_idade, responsavel, login, senha, flag_admin }: UsuarioRequest) {
        if (!nome || !cpf || !data_de_nascimento || !telefone || !endereco || !email || !login || !senha) {
            throw new Error( "Dados incompletos, verifique os campos acima." );
        }

        if(flag_maior_idade == null) throw new Error( "Dados incompletos, verifique os campos." );

        if (!flag_maior_idade && !responsavel || responsavel == "") {
            throw new Error( "Responsavel deve ser informado." );
        }

        if (flag_admin) {
            throw new Error( "Usuario não pode ter esse tipo de configuração. Caso necessário, solicite o suporte do serviço." );
        }

        if ( !isEmail( email ) ) {
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

        if( usuarioExistente ){
            throw new Error( "Usuario já Cadastrado, tente novamente ou entre em contato com o administrador" )
        }

        const hash_password = await hash( senha, 8 );

        const dataNascimento = new Date( data_de_nascimento );

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
                senha: hash_password,
                flag_admin,
                dt_criacao,
            }
        });

        return usuario;
    }
}

export { CriarUsuarioService };