import prismaClient from "../../prisma";
import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


class LoginUsuarioController {
  async authenticate(request: Request, response: Response) {
    const { email, senha } = request.body;

    const usuario = await prismaClient.usuario.findUnique({ where: { email } });

    if(!usuario) {
        return response.json({ error: "Usuário não encontrado"});
    }

    const isValuePassword = await compare(senha, usuario.senha); 

    if (!isValuePassword) {
        return response.json({ error: "Senha inválida" });
    }

    const token = sign({ id: usuario.id }, "secretqwe", { expiresIn: "1h" });

    const { id } = usuario;

    return response.json({ usuario: { id, email}, token });
  }
}

export { LoginUsuarioController };