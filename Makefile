install:
	npm install

lint:
	$(MAKE) install
	./node_modules/.bin/jshint ./*.js

test:
	$(MAKE) lint
	@NODE_ENV=test ./node_modules/.bin/mocha

test-cov:
	$(MAKE) test
	@NODE_ENV=test node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha

test-travis:
	$(MAKE) test
	@NODE_ENV=test node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha --report lcovonly

.PHONY: test lint
