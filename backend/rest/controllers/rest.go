package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"rest/models"
	"time"

	"github.com/go-chi/chi/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var DataCollection *mongo.Collection

func GetAll(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := DataCollection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Unable to find data", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var rest []models.Data
	if err := cursor.All(ctx, &rest); err != nil {
		http.Error(w, "Unable to find all data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rest)
}

func GetAllByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid book id", http.StatusBadRequest)
		return
	}

	var rest models.Data
	if err := DataCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&rest); err != nil {
		http.Error(w, "Unable to find the data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rest)
}
