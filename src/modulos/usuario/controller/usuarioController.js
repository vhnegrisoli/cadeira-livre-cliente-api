import UsuarioService from "../service/usuarioService";

class UsuarioController {
  async buscarTodos(req, res) {
    let usuarios = await UsuarioService.buscarTodos();
    return res.status(usuarios.status).json(usuarios);
  }
}

export default new UsuarioController();
