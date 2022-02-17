import { Component } from "react";

import "./styles.css";

import { Posts } from "../../Components/Posts";
import { loadPosts } from "../../utils/load-posts";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    return (
      <section className="container">
        <Posts posts={posts} />
        <div className="container-button">
          <button 
            disabled={noMorePosts}
            onClick={this.loadMorePosts}
            className="button">
              Load more posts
          </button>
        </div>
      </section>
    );
  }
}

export default Home;
