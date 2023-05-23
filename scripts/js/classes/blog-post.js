/**
 * @file Class representing a product.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

class BlogPost {
  constructor(postType) {
    this.postType = postType || "grid";
  }

  postRender(post) {
    const monthNameShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let { image, title, short_description, date } = post;

    date = new Date(date);

    if (this.postType === "grid") {
      return `
      <div class="blog-post-review grid">
            <div class="img-container blog-post-review__img"><img src="${image}" alt="${title}"></div>
            <div class="blog-post-review__content">
                <h3 class="title">${title}</h3>
                <p class="preview">${short_description}</p>
                <div class="details"> 
                    <div class="details__data">
                        <i class="fa-regular fa-calendar-days"></i>
                        <span>${
                          monthNameShort[date.getMonth()]
                        }  ${date.getDate()}, ${date.getFullYear()}</span>
                    </div>
                    <div class="details__data">
                        <i class="fa-light fa-comment"></i>
                        <span>1</span>
                    </div>
                    <div class="details__data read-more">
                        <i class="fa-solid fa-caret-right">
                        </i><a href="#">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    if (this.postType === "list") {
      return `
        <div class="blog-post-review list">
            <div class="img-container blog-post-review__img"><img src="${image}" alt="${title}"></div>
            <div class="blog-post-review__content">
                <h3 class="title">${title}</h3>
                <div class="details"> 
                    <div class="details__data">
                        <i class="fa-regular fa-calendar-days"></i>
                        <span>${
                          monthNameShort[date.getMonth()]
                        }  ${date.getDate()}, ${date.getFullYear()}</span>
                    </div>
                    <div class="details__data">
                        <i class="fa-light fa-comment"></i>
                        <span>1</span>
                    </div>
                </div>
                <p class="preview">${short_description}</p>
                <div class="details details__data read-more">
                    <i class="fa-solid fa-caret-right"></i>
                    <a href="#">Read More</a>
                </div>
            </div>
        </div>
        `;
    }
  }
}
