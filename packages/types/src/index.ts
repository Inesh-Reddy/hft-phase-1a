export interface TickerUpdate {
  exchange: string;
  symbol: string;
  price: string;
  volume?: string;
  eventTime?: number;
}

export function mapRedisTicker(raw: string): TickerUpdate {
  const data = JSON.parse(raw) as Record<string, unknown>;
  return {
    exchange: "binance",
    symbol: String(data.s),
    price: String(data.c),
    volume: data.v ? String(data.v) : undefined,
    eventTime: typeof data.E === "number" ? data.E : undefined,
  };
}

export interface Market {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  exchange: string;
}
export interface Asset {
  baseAsset: string;
  quoteAsset: string;
}
export function rawTickerToMarket(raw: string): Asset {
  const data = JSON.parse(raw) as { s: string };
  const symbol = String(data.s);
  const match = symbol.match(/^([A-Z]+?)([A-Z]{3,})$/);
  if (!match) {
    throw new Error(`Cannot infer base/quote from symbol: ${symbol}`);
  }
  const [, baseAsset, quoteAsset] = match;
  return {
    baseAsset,
    quoteAsset,
  };
}

export interface OrderbookUpdate {
  exchange: string;
  symbol: string;
  bids: [string, string][];
  asks: [string, string][];
  eventTime?: number;
}

export function mapRedisOrderbook(raw: string): OrderbookUpdate {
  const d = JSON.parse(raw) as Record<string, unknown>;
  return {
    exchange: "binance",
    symbol: String(d.s),
    bids: (d.bids as [string, string][]) ?? [],
    asks: (d.asks as [string, string][]) ?? [],
    eventTime: typeof d.E === "number" ? d.E : undefined,
  };
}

export interface TradeEvent {
  exchange: string;
  symbol: string;
  price: string;
  quantity: string;
  side: "buy" | "sell";
  tradeTime?: number;
}

export function mapRedisTrade(raw: string): TradeEvent {
  const d = JSON.parse(raw) as Record<string, unknown>;
  return {
    exchange: "binance",
    symbol: String(d.s),
    price: String(d.p),
    quantity: String(d.q),
    side: String(d.m) === "true" ? "sell" : "buy",
    tradeTime: typeof d.T === "number" ? d.T : undefined,
  };
}
