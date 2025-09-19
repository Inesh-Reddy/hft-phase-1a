package main

import (
	"context"
	"fmt"
	"log"

	"github.com/Inesh-Reddy/hft-phase-1a/packages/golib/redis"
	"github.com/Inesh-Reddy/hft-phase-1a/packages/golib/ws"
)

func main() {
    fmt.Println("Ticker Service running...")

	ctx := context.Background()
	redisURL := "localhost:6379"
	wsURL := "wss://stream.binance.com:9443/ws/btcusdt@ticker"
    rdb := redis.NewClient(redisURL)
    conn := ws.Connect(wsURL)
	out := make(chan []byte)
	defer conn.Close()

	go func() {
		if err := Stream(ctx, conn, out); err != nil {
			log.Println("ws error:", err)
		}
		close(out) 
	}()
	
	for msg := range out {
		log.Println("why am i closing",rdb.Ping(ctx))
		
		if err := rdb.Publish(ctx, "market.ticker.BTCUSDT.binance", msg).Err(); err != nil {
			log.Println("publish error:", err)
			} else {
				fmt.Println("published:", string(msg))
			}
	}
	conn.Close()
}
