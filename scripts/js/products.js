/**
 * @file Manages rendering products in all pages.
 * About pages()
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

/**
 * ################################################
 * Constant for all products render
 * ------------------------------------------------
 */

/**
 *  Slice title if is long than 30 char.
 */
const titleSegmant = (title) => {
  return title.slice(0, 30) + (title.length > 30 ? "..." : "");
};

/**
 *  Loop into api tags and render every tag
 */
const tagSegmant = (tags) => {
  return tags
    ? tags.map((tag) => `<div class="tag">${tag}</div>`).join("")
    : "";
};

/**
 *  Render stars based in rate number
 */
const rateSegmant = (rate) => {
  if (!rate) return "";

  const rateInteger = Math.trunc(rate);
  const decemalNumber = parseInt(rate.toString().split(".")[1]);
  const betweenRatingAnd5 = 5 - (decemalNumber ? rateInteger + 1 : rateInteger);
  const ratingStars = [];

  for (let i = 1; i <= rateInteger; i++) {
    ratingStars.push('<i class="fa-solid fa-star"></i>');
  }

  if (decemalNumber === NaN || decemalNumber < 3)
    ratingStars.push('<i class="fa-light fa-star"></i>');

  if (3 <= decemalNumber && decemalNumber <= 8)
    ratingStars.push('<i class="fa-solid fa-star-half-stroke"></i>');

  if (8 < decemalNumber) ratingStars.push('<i class="fa-solid fa-star"></i>');

  for (let i = 1; i <= betweenRatingAnd5; i++) {
    ratingStars.push('<i class="fa-light fa-star"></i>');
  }

  return ratingStars.map((star) => star).join("");
};

/**
 * Render price and discount
 * Note: price is in EGP currency and convert to Doller curreny
 */
const priceSegmant = (price, discount) => {
  const finalPrice = (price / 31).toFixed(2);
  const finalPriceDiscount = ((price - (100 * discount) / price) / 31).toFixed(
    2
  );

  if (discount)
    return `
        <div class="price__before">$${finalPrice}</div>
        <div class="price__after">$${finalPriceDiscount}</div>
    `;
  else
    return `
        <div class="price__after">$${finalPrice}</div>
    `;
};

/**
 * Render Product
 */
const productSigmant = (item) => {
  const {
    title,
    price,
    discountPercentage,
    rating,
    description,
    thumbnail,
    tags,
  } = item;

  return `
    <div class="product-card">
    <div class="img-container product-card__image"><img src=${thumbnail} alt="${title}">
      <div class="navigation"><span class="navigation__link"><i class="fa-light fa-magnifying-glass-plus"></i></span><span class="navigation__link"><i class="fa-light fa-bag-shopping"></i></span><span class="navigation__link"><i class="fa-regular fa-retweet"></i></span><span class="navigation__link"><i class="fa-light fa-heart"></i></span></div>
    </div>
    <div class="product-card__tags">${tagSegmant(tags)}</div>
    <div class="product-card__content">
      <h3 class="name">${titleSegmant(title)}</h3>
      <div class="rate">${rateSegmant(rating)}</div>
    <div class="price">${priceSegmant(price, discountPercentage)}</div>
    </div>
    </div>
    `;
};

/**
 * ################################################
 */

/**
 * @type {HTMLElement} - category Grid Products
 */
const categoryGridProducts = document.querySelector(
  ".category-grid .products .items"
);

fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    categoryGridProducts.innerHTML = data
      .map((item) => productSigmant(item))
      .slice(0, 12)
      .join("");
  });
