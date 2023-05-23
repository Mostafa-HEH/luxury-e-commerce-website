/**
 * @file Class representing a product.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

class BlogPosts extends BlogPost {
  constructor(posts, setPostType) {
    super(setPostType);
    this.posts = posts;
  }

  generatePosts() {
    return this.posts
      .map((post) => this.postRender(post))
      .reverse()
      .join("");
  }
}
