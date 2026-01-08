package main

import (
	"auth/controllers"
	"auth/routes"
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// mongo connection
	client := options.Client().ApplyURI("mongodb://localhost:27017")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	connect, err := mongo.Connect(ctx, client)
	if err != nil {
		log.Fatal(err)
	}

	controllers.UserCollection = connect.Database("gp-apis").Collection("users")

	controllers.JwtKey = []byte(os.Getenv("JWT_SECRET"))

	router := chi.NewRouter()
	routes.ApiRoutes(router)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5174"},
		AllowedMethods:   []string{"GET", "POST", "PATCH", "PUT", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	handlers := c.Handler(router)

	log.Println("Server Started on port : 8000")
	http.ListenAndServe(":8000", handlers)
}
