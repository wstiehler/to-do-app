setup:
	sudo apt-get install jq
	npm install

clean:
	rm -rf node_modules ./dist package-lock.json
	npm cache clean --force | true

audit:
	npm audit --audit-level moderate --audit-level.allowlist xmldom,loader-utils

lint: 
	npm run lint

start:
	docker-compose up -d --build && docker-compose logs -f

stop:
	docker-compose down -v

status:
	docker-compose ps

logs:
	docker-compose logs -f

build:
	npm run build:dev:ops

start-localstack:
	docker-compose -f config/docker/docker-compose.dependencies.yml up -d

start-docker-app:
	docker-compose -f docker-compose.yml build

start-app:
	npm run dev
