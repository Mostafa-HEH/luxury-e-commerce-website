/**
 * @file Class representing a product.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then((data) => {
    const blogPosts = new BlogPosts(data, "grid");

    document.getElementById("blogGridPosts").innerHTML =
      blogPosts.generatePosts();
  });
