dev:
	docker run --rm -it -v "$$PWD:/srv/jekyll" -v "$$PWD/vendor/bundle:/usr/local/bundle" -p 4000:4000 -p 35729:35729 bng5/preguntaleatumadre:latest jekyll serve --livereload

build:
	npm run build && docker run --rm -it -v "$$PWD:/srv/jekyll" -v "$$PWD/vendor/bundle:/usr/local/bundle" bng5/preguntaleatumadre:latest jekyll build --destination _build

sync:
	aws s3 sync _build s3://preguntaleatumadre.com/ --exclude "/episodes/" --profile personal
