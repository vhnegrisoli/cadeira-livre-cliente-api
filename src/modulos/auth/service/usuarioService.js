import UsuarioRepository from "../repository/usuarioRepository";

class UsuarioService {
  async buscarTodos(req, res) {
    let usuarios = await UsuarioRepository.findAll();
    return usuarios;
  }
}

export default new UsuarioService();
