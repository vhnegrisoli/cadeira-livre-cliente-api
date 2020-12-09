import CadeiraLivreClient from "../client/cadeiraLivreClient";
import CadeiraLivreException from "../exception/cadeiraLivreException";
import * as httpStatus from "../../../config/constantes";

class CadeiraLivreService {
  async buscarCadeirasLivresDisponiveis(req) {
    try {
      const { authorization } = req.headers;
      const { empresaId } = req.query;
      let token = authorization.split(" ")[1];
      let cadeirasLivres = await CadeiraLivreClient.buscarCadeirasLivresDisponiveis(
        token,
        empresaId
      );
      return { status: httpStatus.OK, cadeirasLivres };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };0
    }
  }
}

export default new CadeiraLivreService();
