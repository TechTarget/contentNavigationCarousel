# LINT & MINIFY
# jshint (>=0.7.0) & uglifyjs (>=1.2.6) are required

SCRIPT_DEV = contentNavigationCarousel.js
SCRIPT_MIN = contentNavigationCarousel.min.js

FILESIZE := `wc --bytes ${SCRIPT_MIN}.gz | awk '{print $$1}'`
FILESIZE_MAX = 1000
FILESIZE_YAY = -e "\e[42m gzip size -> ${FILESIZE} bytes\e[0m \(^_^)/"
FILESIZE_BOO = -e "\e[41m gzip size -> ${FILESIZE} bytes\e[0m ^(>_<)^"
define FILESIZE_CHECK
	if [ ${FILESIZE} -gt ${FILESIZE_MAX} ]; then \
        echo ${FILESIZE_BOO}; \
    else \
    	echo ${FILESIZE_YAY}; \
    fi
endef

default:

	@echo " linting..."
	@jshint ${SCRIPT_DEV} --show-non-errors --config jshintConfig.json

	@echo " minifying..."
	@uglifyjs ${SCRIPT_DEV} > ${SCRIPT_MIN}

	@gzip --best --stdout ${SCRIPT_MIN} > ${SCRIPT_MIN}.gz
	@$(FILESIZE_CHECK)
	@rm ${SCRIPT_MIN}.gz