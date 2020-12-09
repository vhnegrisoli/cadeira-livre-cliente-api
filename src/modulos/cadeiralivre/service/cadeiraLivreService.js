import CadeiraLivreClient from "../client/cadeiraLivreClient";
import CadeiraLivreException from "../exception/cadeiraLivreException";
import * as httpStatus from "../../../config/constantes";

const ESPACO_BRANCO = " ";
const INDICE_TOKEN = 1;

class CadeiraLivreService {
  async buscarCadeirasLivresDisponiveis(req) {
    try {
      const { authorization } = req.headers;
      const { empresaId } = req.query;
      let token = this.tratarTokenDoRequest(authorization);
      let cadeirasLivres = await CadeiraLivreClient.buscarCadeirasLivresDisponiveis(
        token,
        empresaId
      );
      return { status: httpStatus.OK, cadeirasLivres };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async buscarCadeirasLivresDoCliente(req) {
    try {
      const { authorization } = req.headers;
      let token = this.tratarTokenDoRequest(authorization);
      let cadeirasLivres = await CadeiraLivreClient.buscarCadeirasLivresDoCliente(
        token
      );
      return { status: httpStatus.OK, cadeirasLivres };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async buscarCadeiraLivrePorId(req) {
    try {
      const { authorization } = req.headers;
      const { cadeiraLivreId } = req.params;
      this.validarCadeiraLivreIdExistente(cadeiraLivreId);
      let token = this.tratarTokenDoRequest(authorization);
      let cadeirasLivres = await CadeiraLivreClient.buscarCadeiraLivrePorId(
        token,
        cadeiraLivreId
      );
      return { status: httpStatus.OK, cadeirasLivres };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async reservarCadeiraLivre(req) {
    try {
      const { authorization } = req.headers;
      const { cadeiraLivreId } = req.params;
      this.validarCadeiraLivreIdExistente(cadeiraLivreId);
      let token = this.tratarTokenDoRequest(authorization);
      let cadeirasLivres = await CadeiraLivreClient.reservarCadeiraLivre(
        token,
        cadeiraLivreId
      );
      return { status: httpStatus.OK, cadeirasLivres };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  validarCadeiraLivreIdExistente(cadeiraLivreId) {
    if (!cadeiraLivreId) {
      throw new CadeiraLivreException(
        httpStatus.BAD_REQUEST,
        "É obrigatório informar o ID da Cadeira Livre."
      );
    }
  }

  tratarTokenDoRequest(authorization) {
    let token = authorization.split(ESPACO_BRANCO)[INDICE_TOKEN];
    if (!token) {
      throw new CadeiraLivreException(
        httpStatus.UNAUTHORIZED,
        "O token não foi informado."
      );
    }
    return token;
  }
}

export default new CadeiraLivreService();