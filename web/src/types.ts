/**
 * Versioned bridge protocol (mirrors bridge_protocol.py).
 * WebSocket /ws: every message includes schema pollution-mystery.bridge v1.
 * POST /dev/event: optional schema pollution-mystery.dev v1 (legacy bodies without schema still accepted server-side).
 */

export const BRIDGE_EVENT_SCHEMA_NAME = "pollution-mystery.bridge" as const;
export const BRIDGE_EVENT_SCHEMA_VERSION = 1 as const;

export type BridgeEventSchema = {
  name: typeof BRIDGE_EVENT_SCHEMA_NAME;
  version: typeof BRIDGE_EVENT_SCHEMA_VERSION;
};

/** Outbound JSON from GET ws → client (serial + dev inject, enriched by bridge). */
export type BridgeWsMessage =
  | { type: "tag"; uid: string; schema: BridgeEventSchema }
  | { type: "tag_removed"; schema: BridgeEventSchema }
  | { type: "button"; schema: BridgeEventSchema }
  | {
      type: "status";
      schema: BridgeEventSchema;
      connected: boolean;
      message: string;
      /** Present on status when emitted by the bridge (not on raw queue items). */
      dev_mode?: boolean;
      /** Serial port label or "DUMMY" when the bridge attaches it. */
      port?: string;
    };

/** Alias for existing imports; same as BridgeWsMessage. */
export type BridgeMessage = BridgeWsMessage;

export const DEV_EVENT_SCHEMA_NAME = "pollution-mystery.dev" as const;
export const DEV_EVENT_SCHEMA_VERSION = 1 as const;

export type DevEventSchema = {
  name: typeof DEV_EVENT_SCHEMA_NAME;
  version: typeof DEV_EVENT_SCHEMA_VERSION;
};

const devSchema = (): DevEventSchema => ({
  name: DEV_EVENT_SCHEMA_NAME,
  version: DEV_EVENT_SCHEMA_VERSION,
});

/** POST /dev/event body (v1). */
export type DevEventRequestV1 =
  | { schema: DevEventSchema; type: "tag"; uid: string }
  | { schema: DevEventSchema; type: "button" }
  | { schema: DevEventSchema; type: "tag_removed" };

export function devEventRequest(
  kind: "button"
): { schema: DevEventSchema; type: "button" };
export function devEventRequest(
  kind: "tag_removed"
): { schema: DevEventSchema; type: "tag_removed" };
export function devEventRequest(
  kind: "tag",
  uid: string
): { schema: DevEventSchema; type: "tag"; uid: string };
export function devEventRequest(
  kind: "tag" | "button" | "tag_removed",
  uid?: string
): DevEventRequestV1 {
  const schema = devSchema();
  if (kind === "tag") {
    if (!uid) throw new Error("devEventRequest('tag') requires uid");
    return { schema, type: "tag", uid };
  }
  if (kind === "button") return { schema, type: "button" };
  return { schema, type: "tag_removed" };
}

export type DevEventOkResponse = {
  ok: true;
  schema: BridgeEventSchema;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Best-effort parse; returns null if schema/version does not match v1. */
export function parseBridgeWsMessage(raw: unknown): BridgeWsMessage | null {
  if (!isRecord(raw)) return null;
  const schema = raw.schema;
  if (
    !isRecord(schema) ||
    schema.name !== BRIDGE_EVENT_SCHEMA_NAME ||
    schema.version !== BRIDGE_EVENT_SCHEMA_VERSION
  ) {
    return null;
  }
  const t = raw.type;
  const base = {
    schema: {
      name: BRIDGE_EVENT_SCHEMA_NAME,
      version: BRIDGE_EVENT_SCHEMA_VERSION,
    },
  } as const;
  if (t === "tag" && typeof raw.uid === "string") {
    return { ...base, type: "tag", uid: raw.uid };
  }
  if (t === "tag_removed") return { ...base, type: "tag_removed" };
  if (t === "button") return { ...base, type: "button" };
  if (t === "status") {
    const connected = raw.connected;
    const message = raw.message;
    if (typeof connected !== "boolean" || typeof message !== "string") return null;
    const out: BridgeWsMessage = {
      ...base,
      type: "status",
      connected,
      message,
    };
    if (typeof raw.dev_mode === "boolean") out.dev_mode = raw.dev_mode;
    if (typeof raw.port === "string") out.port = raw.port;
    return out;
  }
  return null;
}
