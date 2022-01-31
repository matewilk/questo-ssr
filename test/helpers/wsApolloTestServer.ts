// @ts-ignore
import { Server, WebSocket } from "mock-socket-with-protocol";

export const gqServer = () => {
  const RANDOM_WS_PORT = Math.floor(Math.random() * 10000);
  const customServer = new Server(`ws://localhost:${RANDOM_WS_PORT}/api`);

  return {
    port: RANDOM_WS_PORT,
    server: customServer,
  };
};
