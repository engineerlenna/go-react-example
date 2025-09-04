package go_react_example

import (
	"embed"
	"io/fs"
	"log"
)

//go:embed web/dist
var embeddedFiles embed.FS

func GetSubFS() fs.FS {
	distFS, err := fs.Sub(embeddedFiles, "web/dist")
	if err != nil {
		log.Fatalf("Failed to get subdirectory from embedded files: %v", err)
	}
	return distFS
}
