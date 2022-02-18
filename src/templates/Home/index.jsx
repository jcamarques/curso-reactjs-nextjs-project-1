import { Component } from "react";

import "./styles.css";

import { Posts } from "../../Components/Posts";
import { loadPosts } from "../../utils/load-posts";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
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

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((posts) => {
          return posts.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
      <div className="search-container">
        {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
        )}

        <input 
          className="text-input"
          placeholder="Type your search"
          onChange={this.handleChange}
          value={searchValue}
          type="search"
        />
      </div>
        
        {filteredPosts.length > 0 &&
         <Posts posts={filteredPosts}
       />}

        {filteredPosts.length === 0 &&
         (<><p>Não existem posts.</p></>
        )}

        <div className="container-button">
          {!searchValue && (
            <button
              disabled={noMorePosts}
              onClick={this.loadMorePosts}
              className="button"
            >
              Load more posts
            </button>
          )}
        </div>
      </section>
    );
  }
}

export default Home;
