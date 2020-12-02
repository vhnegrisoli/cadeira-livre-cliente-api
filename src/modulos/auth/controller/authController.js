import AuthService from "../service/authService";

class AuthController {
  async autenticarUsuario(req, res) {
    let auth = await AuthService.autenticarUsuario(req);
    return res.status(auth.status).json(auth);
  }
}

export default new AuthController();
