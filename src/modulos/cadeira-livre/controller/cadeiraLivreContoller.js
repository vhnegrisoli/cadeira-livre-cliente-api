import CadeiraLivreService from "../service/cadeiraLivreService";

class CadeiraLivreController {
  async buscarCadeirasLivresDisponiveis(req, res) {
    let cadeirasLivres = await CadeiraLivreService.buscarCadeirasLivresDisponiveis(
      req
    );
    return res.status(cadeirasLivres.status).json(cadeirasLivres);
  }
}

export default new CadeiraLivreController();
