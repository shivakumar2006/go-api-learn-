package controllers

import (
	"auth/models"
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var UserCollection *mongo.Collection

var JwtKey []byte

func Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// check user exist or not
	exist, err := UserCollection.CountDocuments(context, bson.M{"email": user.Email})
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	if exist > 0 {
		http.Error(w, "User already exist", http.StatusBadRequest)
		return
	}

	// hashed the password
	hashed, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "unable to hashed password", http.StatusInternalServerError)
		return
	}
	user.Password = string(hashed)

	// now insert the user in the db
	res, err := UserCollection.InsertOne(context, user)
	if err != nil {
		http.Error(w, "Failed to insert user in DB", http.StatusInternalServerError)
		return
	}

	insertedId, ok := res.InsertedID.(primitive.ObjectID)
	if !ok {
		http.Error(w, "error getting inserted id", http.StatusInternalServerError)
		return
	}
	user.ID = insertedId

	// generate token now
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": user.ID.Hex(),
		"exp":    time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		http.Error(w, "falied to generate token", http.StatusInternalServerError)
		return
	}

	// remove password before sending it to the user
	user.Password = ""

	// send response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"token": tokenString,
		"user":  user,
	})
}
