package main

import (
	"context"
	"fmt"
	"log"
)


func main() {
	ctx := context.Background()
	redisURL := "localhost:6379"
	wsURL := "wss://stream.binance.com:9443/ws/btcusdt@ticker"
	out := make(chan []byte)
	conn := ConnectToRedis(redisURL)
	defer conn.Close()
	go func() {
		if err := ConnectAndStream(ctx, wsURL, out); err != nil {
			log.Println("ws error:", err)
		}
		close(out) 
	}()
	for msg := range out {
		log.Println("why am i closing",conn.Ping(ctx))
		
		if err := conn.Publish(ctx, "market.ticker.BTCUSDT.binance", msg).Err(); err != nil {
			log.Println("publish error:", err)
			} else {
				fmt.Println("published:", string(msg))
			}
	}
	conn.Close()
}
