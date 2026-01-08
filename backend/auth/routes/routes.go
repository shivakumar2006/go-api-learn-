package routes

import (
	"auth/controllers"

	"github.com/go-chi/chi/v5"
)

func ApiRoutes(r chi.Router) {
	r.Post("/signup", controllers.Signup)
	r.Post("/login", controllers.Login)
	// r.Post("/reset-password", controllers.ResetPassword)
	// r.Post("/forgot-password", controllers.ForgotPassword)
}
