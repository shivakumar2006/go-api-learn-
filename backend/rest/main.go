package main

import (
	"context"
	"log"
	"net/http"
	"rest/controllers"
	"rest/routes"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("mongodb conection error", err)
		return
	}

	controllers.DataCollection = client.Database("gp-apis").Collection("data")

	router := chi.NewRouter()
	routes.ApiRoutes(router)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5174"},
		AllowedMethods:   []string{"GET", "POST", "PATCH", "PUT"},
		AllowedHeaders:   []string{"Authorizaion", "Content-Type"},
		AllowCredentials: true,
	})

	handlers := c.Handler(router)

	log.Println("Server started on port : 8001")
	if err := http.ListenAndServe(":8001", handlers); err != nil {
		log.Fatal(err)
	}
}
