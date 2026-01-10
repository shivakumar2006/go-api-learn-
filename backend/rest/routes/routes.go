package routes

import (
	"rest/controllers"

	"github.com/go-chi/chi/v5"
)

func ApiRoutes(r chi.Router) {
	r.Get("/rest", controllers.GetAll)
	r.Get("/rest/{id}", controllers.GetAllByID)
}
