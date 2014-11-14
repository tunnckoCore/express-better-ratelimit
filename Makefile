MOCHA     = node_modules/.bin/mocha
_MOCHA    = node_modules/.bin/_mocha
JSHINT    = node_modules/.bin/jshint
ISTANBUL  = node_modules/.bin/istanbul
COVERALLS = node_modules/.bin/coveralls

lint:
	npm install
	${JSHINT} .

test: lint
	${MOCHA}

test-cov: lint
	${ISTANBUL} cover ${_MOCHA}

test-travis: lint
	${ISTANBUL} cover ${_MOCHA} --report lcovonly
	cat coverage/lcov.info | ${COVERALLS}

clean: node_modules
	rm -rf node_modules coverage

.PHONY: lint test clean
