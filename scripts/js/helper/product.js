// Rateing generate stars
const ratesGenerator = (rate) => {
  // Stars from font awsome
  const starsSegments = {
    full: `<i class="fa-solid fa-star"></i>`,
    empty: `<i class="fa-regular fa-star"></i>`,
    half: `<i class="fa-solid fa-star-half-stroke"></i>`,
  };

  const stars = [];
  let i = 5;
  for (; i > 0; i--) {
    if (i > rate) {
      if (i - 0.5 <= rate) {
        stars.push(starsSegments.half);
      } else {
        stars.push(starsSegments.empty);
      }
    } else {
      stars.push(starsSegments.full);
    }
  }

  return stars.reverse();
};

// Price controls
const egpusd = 31;
const applyDiscount = (price, discount) => {
  const convertPrice = price / egpusd;
  return (convertPrice - (convertPrice / 100) * discount).toFixed(2);
};
