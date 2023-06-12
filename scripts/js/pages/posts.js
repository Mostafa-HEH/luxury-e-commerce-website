// Grid blog posts container
const blogGridPosts = document.getElementById("blogGridPosts");

// 1) Fetch data from firebase
firebase
  .database()
  .ref("/posts/")
  .once("value")
  .then((snapshot) => {
    if (snapshot.exists()) {
      const monthNamesShort = [
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

      blogGridPosts.innerHTML = snapshot
        .val()
        .map(
          (post) => `
        <div class="blog-post-review grid">
            <div class="img-container blog-post-review__img">
                <img src=${post.image} alt=${post.title}>
            </div>
            <div class="blog-post-review__content">
                <h3 class="title">${post.title}</h3>
                <p class="preview">${post.short_description}</p>
                <div class="details"> 
                    <div class="details__data"><i class="fa-regular fa-calendar-days"></i><span>${
                      monthNamesShort[new Date(post.date).getMonth()]
                    }  ${new Date(post.date).getDate()}, ${new Date(
            post.date
          ).getFullYear()}</span></div>
                    <div class="details__data"><i class="fa-light fa-comment"></i><span>1</span></div>
                    <div class="details__data read-more"><i class="fa-solid fa-caret-right"></i><a href="./blog-post.html?id=${
                      post.id
                    }">Read More</a></div>
                </div>
            </div>
        </div>
        `
        )
        .join("");
    } else {
    }
  })
  .catch((error) => {
    console.error(error);
    // location.reload();
  });
