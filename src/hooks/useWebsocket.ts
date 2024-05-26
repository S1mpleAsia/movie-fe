import { useCallback, useState } from "react";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

type Message = any;
const SOCKET_URL = "http://localhost:8088/ws";

export const useWebsocket = (name: string) => {
  const [stompClient, setStompClient] = useState<CompatClient | undefined>();

  function connect(onPrivateMessage: (message: any) => void) {
    const socket = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("On connected: " + name);
        stompClient.subscribe("/user/" + name + "/private", onPrivateMessage);
      },
      onError
    );

    setStompClient(stompClient);
    return stompClient;
  }

  const onError = (err: any) => {
    console.log(err);
  };

  function disconnect() {
    if (stompClient) {
      stompClient.disconnect();
      setStompClient(undefined);
    }

    console.log("Disconnected");
  }

  const handleSendMessage = (message: Message, topic: string) => {
    if (stompClient) {
      console.log("--- Start sending message ---");
      stompClient.send(topic, {}, JSON.stringify(message));
      console.log("--- Send message successfully ---");
    } else {
      console.error("Websocket connection not establish yet");
    }
  };

  // useEffect(() => {
  //   if (!stompClient) setStompClient(connect());

  //   return () => disconnect();
  // }, []);

  return {
    stompClient,
    setStompClient,
    sendMessage: handleSendMessage,
    connect,
    disconnect,
  };
};
