dev:
	docker run --rm -it -v "$$PWD:/srv/jekyll" -v "$$PWD/vendor/bundle:/usr/local/bundle" -p 4000:4000 -p 35729:35729 jekyll/jekyll:latest jekyll serve --livereload

build:
	docker run --rm -it -v "$$PWD:/srv/jekyll" -v "$$PWD/vendor/bundle:/usr/local/bundle" jekyll/jekyll:latest jekyll build --destination _build

sync:
	aws s3 sync _build s3://preguntaleatumadre.com/ --profile personal
