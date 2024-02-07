.PHONY: frontend backend

start-frontend:
	$(MAKE) -C frontend start-frontend

start-backend:
	$(MAKE) -C backend start-backend

start-app: start-backend start-frontend
