package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Data struct {
	ID    primitive.ObjectID `bson:"_id,omitempty" josn:"id"`
	Title string             `bson:"title" json:"title"`
	Price int                `bson:"price" json:"price"`
	Stock int                `bson:"stock" json:"stock"`
}
