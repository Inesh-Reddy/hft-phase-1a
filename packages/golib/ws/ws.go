package ws

import (
	"log"

	"github.com/gorilla/websocket"
)

func Connect(url string) *websocket.Conn {
    c, _, err := websocket.DefaultDialer.Dial(url, nil)
    if err != nil {
        log.Fatal("dial:", err)
    }
    return c
}
