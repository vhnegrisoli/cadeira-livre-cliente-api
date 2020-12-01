import UsuarioRepository from "../repository/usuarioRepository";
import * as httpStatus from "../../../config/constantes";

class UsuarioService {
  async buscarTodos() {
    let usuarios = await UsuarioRepository.findAll();
    if (usuarios.length < 1) {
      return {
        status: httpStatus.BAD_REQUEST,
        message: "Não existem usuários salvos.",
      };
    }
    return { status: httpStatus.OK, usuarios };
  }
}

export default new UsuarioService();
