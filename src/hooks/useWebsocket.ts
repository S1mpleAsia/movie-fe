import { useCallback, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

type Message = any;
const SOCKET_URL = "http://localhost:8080/ws";

export const useWebsocket = () => {
  const [stompClient, setStompClient] = useState<CompatClient | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState<string>();

  function connect() {
    const socket = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (name: any) => {
      console.log("On connected: " + name);
      setName(name);
      stompClient.subscribe("/topic/" + name, onPrivateMessage);
    });

    return stompClient;
  }

  function onPrivateMessage(message: any) {
    const data = JSON.parse(message);
    console.log("Received message:", data);
    setMessages((prevMessages) => [...prevMessages, data]);
  }

  function disconnect() {
    if (stompClient) {
      stompClient.disconnect();
    }

    console.log("Disconnected");
  }

  const handleSendMessage = useCallback(
    (message: Message, topic: string) => {
      if (stompClient) {
        console.log("--- Start sending message ---");
        stompClient.send(topic, {}, JSON.stringify(message));
      } else {
        console.error("Websocket connection not establish yet");
      }
    },
    [stompClient]
  );

  useEffect(() => {
    if (!stompClient) setStompClient(connect());

    return () => disconnect();
  }, []);

  return { messages, sendMessage: handleSendMessage, name };
};
