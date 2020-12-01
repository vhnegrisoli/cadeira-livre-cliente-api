import Usuario from "../model/usuario";

class UsuarioRepository {
  async findAll() {
    let usuarios = await Usuario.find();
    return usuarios;
  }

  async findById(id) {
    let usuario = await Usuario.findById(id);
    return usuario;
  }
}

export default new UsuarioRepository();
