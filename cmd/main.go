package main

import (
	go_react_example "go-react-example"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/api/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello from the Go backend!",
		})
	})

	router.GET("/api/time", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"time": time.Now().Format(time.RFC1123),
		})
	})
	distFS := go_react_example.GetSubFS()
	fileServer := http.FileServer(http.FS(distFS))
	router.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api/") {
			return
		}
		_, err := distFS.Open(strings.TrimPrefix(c.Request.URL.Path, "/"))
		if os.IsNotExist(err) {
			c.Request.URL.Path = "/"
		}
		fileServer.ServeHTTP(c.Writer, c.Request)
	})

	log.Println("Listening on http://localhost:8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Could not start server: %s", err)
	}
}
