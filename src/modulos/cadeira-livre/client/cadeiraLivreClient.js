import * as endpoints from "../../../config/endpoints";

import axios from "axios";

const TOKEN_PARAMETRO = "{token}";
const EMPRESA_ID_PARAMETRO = "{empresaId}";
const VAZIO = "";

class CadeiraLivreClient {
  async buscarCadeirasLivresDisponiveis(token, empresaId) {
    let endpoint = endpoints.ENDPOINT_CADEIRAS_LIVRES_DISPONIVEIS;
    endpoint = endpoint.replace(TOKEN_PARAMETRO, token);
    endpoint = empresaId
      ? endpoint.replace(EMPRESA_ID_PARAMETRO, empresaId)
      : endpoint.replace(EMPRESA_ID_PARAMETRO, VAZIO);
    let dados = null;
    await axios
      .get(endpoint)
      .then((res) => {
        dados = res.data;
      })
      .catch((error) => {
        dados = error.message;
      });
    return dados;
  }
}

export default new CadeiraLivreClient();
