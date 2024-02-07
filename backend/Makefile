output-requeriments:
	poetry export --output requirements.txt

start-backend:
	@docker network inspect mytodo > /dev/null 2>&1 || docker network create mytodo
	@docker compose up -d --build