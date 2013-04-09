SCRIPT_NAME = contentNavigationCarousel
FILESIZE_MAX = 1000
FILESIZE_GZIP = `gzip -c ${SCRIPT_NAME}.min.js | wc -c`
FILESIZE_PASS = "${FILESIZE_GZIP} bytes  \(^_^)/"
FILESIZE_FAIL = "${FILESIZE_GZIP} bytes  ^(>_<)^"

define FILESIZE_CHECK
	if [ ${FILESIZE_GZIP} -gt ${FILESIZE_MAX} ]; then \
		tput setaf 1; \
		echo ${FILESIZE_FAIL}; \
		tput sgr0; \
    else \
		tput setaf 2; \
		echo ${FILESIZE_PASS}; \
		tput sgr0; \
	fi
endef

default:

	@echo "* linting..."
	@jshint ${SCRIPT_NAME}.js --show-non-errors

	@echo "* minifying..."
	@uglifyjs ${SCRIPT_NAME}.js \
						--output ${SCRIPT_NAME}.min.js \
						--source-map ${SCRIPT_NAME}.min.js.map  \
						--compress \
						--mangle \
						--comments '/^!\s/'

	@echo "* gzip test..."
	@$(FILESIZE_CHECK)

compile:

	@echo "* compiling jade templates"
	@jade -P ./example/index.jade

	@echo "* compiling sass..."
	@sass ./example/sass/screen.scss ./example/screen.css

	@echo "* compiling coffeescript..."
	@coffee -p ${SCRIPT_NAME}.coffee > ${SCRIPT_NAME}.js