package main

import (
	"context"

	"github.com/gorilla/websocket"
)

func Stream(ctx context.Context, ws *websocket.Conn, out chan []byte) error {

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