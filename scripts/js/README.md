### To render product or products need this scripts:

        // Product class
        script(src="scripts/js/classes/product.js", defer)

        // Products class depends Product class
        script(src="scripts/js/classes/products.js", defer)

        // Home v1, v2, and v3 products depend on product js and products js
        script(src="scripts/js/home.js", defer)
