import { useEffect, useRef } from "react";
import { parseBridgeWsMessage, type BridgeMessage } from "../types";

function wsUrl(): string {
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${window.location.host}/ws`;
}

/**
 * Single WebSocket to the Python bridge; mirrors prior App.tsx behavior.
 * Optional handler runs for every parsed message (e.g. view transitions).
 */
export function useBridgeWebSocket(
  onBridgeMessage?: (msg: BridgeMessage) => void
) {
  const cbRef = useRef(onBridgeMessage);
  cbRef.current = onBridgeMessage;

  useEffect(() => {
    let ws: WebSocket | null = null;
    let closed = false;

    const connect = () => {
      if (closed) return;
      ws = new WebSocket(wsUrl());
      ws.onclose = () => {
        if (!closed) window.setTimeout(connect, 1200);
      };
      ws.onmessage = (ev) => {
        try {
          const raw = JSON.parse(ev.data) as unknown;
          const msg = parseBridgeWsMessage(raw);
          if (msg) {
            if (msg.type === "status") return;
            cbRef.current?.(msg);
          }
        } catch {
          // ignore malformed payloads
        }
      };
    };

    connect();
    return () => {
      closed = true;
      ws?.close();
    };
  }, []);
}
