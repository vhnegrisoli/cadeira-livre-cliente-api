import AuthService from "../service/authService";

class AuthController {
  async autenticar(req, res) {
    let auth = await AuthService.autenticar(req);
    return res.status(auth.status).json(auth);
  }
}

export default new AuthController();
