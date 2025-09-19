package main

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)



func ConnectToRedis(redisURL string) *redis.Client {
	conn := redis.NewClient(&redis.Options{Addr: redisURL})
    if err := conn.Ping(context.Background()).Err(); err != nil {
        log.Printf("Error connecting to redis")
    }
	return conn
}
