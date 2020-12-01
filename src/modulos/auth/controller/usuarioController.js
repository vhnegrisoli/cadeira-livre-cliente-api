import UsuarioService from "../service/usuarioService";

class UsuarioController {
  async buscarTodos(req, res) {
    let usuarios = await UsuarioService.buscarTodos();
    return res.json(usuarios);
  }
}

export default new UsuarioController();
