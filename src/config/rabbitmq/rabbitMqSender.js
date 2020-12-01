import amqp from "amqplib/callback_api";

import * as config from "../secrets";

const EXCHANGE_TYPE = "topic";
const TOPIC_NAME = "biot-admin.topic";
const MEIO_SEGUNDO = 500;

export function criarFila(fila) {
  amqp.connect(config.RABBIT_MQ_CONNECTION, (error, connection) => {
    if (error) {
      throw error;
    }
    connection.createChannel((error, channel) => {
      if (error) {
        throw error;
      }
      channel.assertExchange(TOPIC_NAME, EXCHANGE_TYPE, {
        durable: true,
      });
      channel.assertQueue(fila, {
        durable: false,
      });
      console.log(`Fila: '${fila}' criada com sucesso!`);
    });
    setTimeout(function () {
      connection.close();
    }, MEIO_SEGUNDO);
  });
}

export function enviarParaFila(dados, fila) {
  amqp.connect(config.RABBIT_MQ_CONNECTION, (error, connection) => {
    if (error) {
      throw error;
    }
    connection.createChannel((error, channel) => {
      if (error) {
        throw error;
      }
      channel.sendToQueue(fila, Buffer.from(String(dados)));
      console.log(`A mensagem: '${dados}' enviada com sucesso!`);
    });
    setTimeout(function () {
      connection.close();
    }, MEIO_SEGUNDO);
  });
}
