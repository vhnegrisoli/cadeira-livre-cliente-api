import axios from "axios";

class IntegracaoPagarmeClient {
  async buscarCartoesDoUsuario(usuarioId) {
    return await [
      {
        cartaoId: "card_cj428xxsx01dt3f6dvre6belx",
        bandeira: "visa",
        ultimosDigitos: "8048",
      },
      {
        cartaoId: "card_cj4999xxsx01dt3f6dvrbelx",
        bandeira: "master",
        ultimosDigitos: "8899",
      },
    ];
  }

  async salvarCartaoDoUsuario(cartao) {
    return await {
      cartaoId: "card_cj4999xxsx01dt3f6dvrbelx",
      bandeira: "master",
      ultimosDigitos: "8899",
    };
  }
}
export default new IntegracaoPagarmeClient();
