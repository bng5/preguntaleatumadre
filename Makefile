sync:
	aws s3 sync dist s3://preguntaleatumadre.com/ --exclude "/episodios/" --profile personal
