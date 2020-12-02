import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UsuarioRepository from "../../usuario/repository/usuarioRepository";
import RabbitMqService from "../../rabbitmq/rabbitMqService";
import * as config from "../../../config/secrets";
import * as fila from "../../../config/rabbitmq/filas";
import * as httpStatus from "../../../config/constantes";

class AuthService {
  async autenticarUsuario(req) {
    try {
      const { email, senha } = req.body;
      const usuario = await UsuarioRepository.findByEmail(email);
      if (!usuario) {
        return this.retornarUsuarioNaoExistente(email);
      }
      if (await this.isSenhaValida(senha, usuario)) {
        return this.gerarTokenJwt(usuario);
      }
      return this.retornarSenhaInvalida();
    } catch (error) {
      return { status: httpStatus.BAD_REQUEST, error };
    }
  }

  async isSenhaValida(senha, usuario) {
    return await bcrypt.compare(senha, usuario.senha);
  }

  gerarTokenJwt(usuario) {
    const { id, email, nome, cpf } = usuario;
    const token = jwt.sign(
      { id, email, nome, cpf },
      config.APPLICATION_SECRET,
      { expiresIn: "1d" }
    );
    RabbitMqService.enviarMensagemParaFila(
      { usuarioId: id, token },
      fila.AUTENTICAR_USUARIO
    );
    return { status: httpStatus.OK, token };
  }

  retornarUsuarioNaoExistente(email) {
    return {
      status: httpStatus.BAD_REQUEST,
      message: `O email ${email} não foi encontrado.`,
    };
  }

  retornarSenhaInvalida() {
    return {
      status: httpStatus.UNAUTHORIZED,
      message: "A senha está incorreta.",
    };
  }
}

export default new AuthService();
