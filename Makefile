# LINT & MINIFY
# jshint (>=0.7.0) & uglifyjs (>=1.2.6) are required

SCRIPT_DEV = contentNavigationCarousel.js
SCRIPT_MIN = contentNavigationCarousel.min.js
LINT=-e "\e[1;32mlinting...\e[00m"
MINIFY=-e "\e[1;36mminifying...\e[00m"

default:

	@echo ${LINT}
		jshint ${SCRIPT_DEV} --config jshintConfig.json

	@echo ${MINIFY}
		uglifyjs ${SCRIPT_DEV} > ${SCRIPT_MIN}