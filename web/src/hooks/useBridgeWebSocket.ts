import { useEffect, useRef, useState } from "react";
import {
  BRIDGE_EVENT_SCHEMA_VERSION,
  parseBridgeWsMessage,
  type BridgeMessage,
} from "../types";

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
  const [bridgeLine, setBridgeLine] = useState("Connecting…");
  const [bridgeFooterMeta, setBridgeFooterMeta] = useState(
    `schema v${BRIDGE_EVENT_SCHEMA_VERSION} · …`
  );
  const [lastEvent, setLastEvent] = useState<string>("—");
  const cbRef = useRef(onBridgeMessage);
  cbRef.current = onBridgeMessage;

  useEffect(() => {
    let ws: WebSocket | null = null;
    let closed = false;

    const connect = () => {
      if (closed) return;
      ws = new WebSocket(wsUrl());
      ws.onopen = () => setBridgeLine("Bridge connected");
      ws.onclose = () => {
        setBridgeLine("Bridge disconnected — retrying…");
        if (!closed) window.setTimeout(connect, 1200);
      };
      ws.onerror = () => {
        setBridgeLine("Bridge error");
      };
      ws.onmessage = (ev) => {
        try {
          const raw = JSON.parse(ev.data) as unknown;
          const msg = parseBridgeWsMessage(raw);
          if (msg) {
            cbRef.current?.(msg);
            if (msg.type === "status") {
              setBridgeLine(msg.message);
              const parts = [
                `schema v${msg.schema.version}`,
                msg.port !== undefined ? `port ${msg.port}` : null,
                msg.dev_mode !== undefined
                  ? msg.dev_mode
                    ? "dev on"
                    : "dev off"
                  : null,
              ].filter(Boolean);
              setBridgeFooterMeta(parts.join(" · "));
              return;
            }
            setLastEvent(JSON.stringify(msg));
            return;
          }
          setLastEvent(
            typeof raw === "object" ? JSON.stringify(raw) : String(raw)
          );
        } catch {
          setLastEvent(String(ev.data));
        }
      };
    };

    connect();
    return () => {
      closed = true;
      ws?.close();
    };
  }, []);

  return { bridgeLine, bridgeFooterMeta, lastEvent, setLastEvent };
}
