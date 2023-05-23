/**
 * @file Representing blog list page.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then((data) => {
    const blogPosts = new BlogPosts(data, "list");

    document.getElementById("blogListPosts").innerHTML =
      blogPosts.generatePosts();
  });
