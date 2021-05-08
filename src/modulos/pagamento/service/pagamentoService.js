import IntegracaoPagarmeClient from "../client/integracaoPagarmeClient";
import * as httpStatus from "../../../config/constantes";
import PagamentoException from "../exception/PagamentoException";

const AO_MENOS_UM_CARTAO = 1;

class PagamentoService {
  async buscarCartoesDoUsuario(req) {
    const { usuarioAutenticado } = req;
    try {
      let dadosCartao = await IntegracaoPagarmeClient.buscarCartoesDoUsuario(
        usuarioAutenticado.id
      );
      this.validarDadosCartaoExistente(dadosCartao);
      return {
        status: httpStatus.OK,
        cartao: dadosCartao,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  validarDadosCartaoExistente(dadosCartao) {
    if (!dadosCartao || dadosCartao.lenght < AO_MENOS_UM_CARTAO) {
      throw new PagamentoException(
        httpStatus.BAD_REQUEST,
        "Você ainda não possui cartões registrados."
      );
    }
  }

  async salvarCartaoDoUsuario(req) {
    const { numeroCartao, dataValidade, cvv, nomeProprietario } = req.body;
    try {
      const cartao = {
        numeroCartao,
        dataValidade,
        cvv,
        nomeProprietario,
      };
      this.validarDadosParaSalvarCartao(cartao);
      const cartaoSalvo = await IntegracaoPagarmeClient.salvarCartaoDoUsuario(
        cartao
      );
      return {
        status: httpStatus.OK,
        cartao: cartaoSalvo,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  validarDadosParaSalvarCartao(cartao) {
    if (
      !cartao ||
      !cartao.numeroCartao ||
      !cartao.dataValidade ||
      !cartao.cvv ||
      !cartao.nomeProprietario
    ) {
      throw new PagamentoException(
        httpStatus.BAD_REQUEST,
        "É necessário informar todos os dados do cartão."
      );
    }
  }
}

export default new PagamentoService();
