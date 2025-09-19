package main

import (
	"context"

	"github.com/gorilla/websocket"
)

func ConnectAndStream(ctx context.Context, wsURL string, out chan []byte) error {
	ws, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
			_, msg, err := ws.ReadMessage()
			if err != nil {
				return err
			}
			out <- msg
		}
	}
}
