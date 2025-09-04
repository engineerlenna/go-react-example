# Go-related variables
BINARY_NAME=go-react-example

FRONTEND_DIR=./web
BACKEND_DIR=./cmd/main.go
.PHONY: all install dev build run clean

all: build

install:
	@go mod tidy
	@cd $(FRONTEND_DIR) && pnpm install

dev-backend:
	@go run $(BACKEND_DIR)

dev-frontend:
	@cd $(FRONTEND_DIR) && pnpm run dev

build: build-frontend build-backend

build-frontend:
	@cd $(FRONTEND_DIR) && pnpm run build

build-backend:
	@go build -o $(BINARY_NAME) .

run:
	@./$(BINARY_NAME)

clean:
	@rm -f $(BINARY_NAME)
	@rm -rf $(FRONTEND_DIR)/dist
	@rm -rf $(FRONTEND_DIR)/node_modules
