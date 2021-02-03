import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SearchCard from './SearchCard';
import { testFoundUsernames, testUserCache } from './TestData';
import './Search.scss';

const searchUrl = 'https://api.github.com/search/users?';
const userUrl = 'https://api.github.com/users/';

const useTestData = false;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      pinned: [],
      displayed: [],
    };
    this.foundUsernames = []
    this.userCache = useTestData ? testUserCache : {};
    this.pinnedUsernames = new Set();
    this.resultsLoaded = 0;
  }

  render() {
    const pinnedCards = this.state.pinned.map((user, index) => {
      return (
        <Col className='search-card-col' key={user.username}>
          <SearchCard
            index={index}
            isPinned={true}
            togglePin={this.unpinCard}
            user={user}
          />
        </Col>
      );
    });
    const displayedCards = this.state.displayed.map((user, index) => {
      return (
        <Col className='search-card-col' key={user.username}>
          <SearchCard
            index={index}
            isPinned={false}
            togglePin={this.pinCard}
            user={user}
          />
        </Col>
      );
    });
    const loadMoreResultsButton = (
      this.resultsLoaded < this.foundUsernames.length ?
        <Button variant="dark" onClick={this.loadMoreCards}>
          Load More Results
        </Button>
      :
        null
    );
    return (
      <div className="search">
        <Form inline onSubmit={this.submitSearch} className="search-bar">
          <Form.Control 
            type="text" 
            placeholder="Search" 
            value={this.state.searchString} 
            onChange={this.handleSearchStringChange} 
            className="search-textbox" 
          />
          <Button variant="dark" type="submit">Search</Button>
        </Form>
        <Container className="search-container">
          <Row>
            <h5>
              Pinned:
            </h5>
          </Row>
          <Row className='mb-3' xs={2} md={2} lg={4}>
            {pinnedCards}
          </Row>
          <Row>
            <h5>
              Search Results:
            </h5>
          </Row>
          <Row className='mb-3' xs={2} md={2} lg={4}>
            {displayedCards}
          </Row>
          <Row className='mb-3 load-results-container'>
            {loadMoreResultsButton}
          </Row>
        </Container>
      </div>
    );
  }

  handleSearchStringChange = (e) => {
    this.setState({searchString: e.target.value});
  }

  submitSearch = (e) => {
    e.preventDefault();
    useTestData ? this.getDummySearchResults() : this.getSearchResults();
  }

  getDummySearchResults = () => {
    this.foundUsernames = testFoundUsernames;
    this.resultsLoaded = 0;
    this.setState({displayed: []});
    this.loadMoreCards();
  }

  getSearchResults = async () => {
    try {
      const response = await fetch(searchUrl + new URLSearchParams({
          q: this.state.searchString,
      }))
      const json_data = await response.json();
      const foundUsernames = json_data.items.map(function(item) {
          return item.login
      }).filter(username => !this.pinnedUsernames.has(username));
      this.foundUsernames = foundUsernames;
      this.resultsLoaded = 0;
      this.setState({displayed: []});
      this.loadMoreCards();
    } catch {
      alert("Something went wrong");
    }
  }

  loadMoreCards = async () => {
    const displayedUsernames = this.foundUsernames.slice(this.resultsLoaded, this.resultsLoaded + 8);
    this.resultsLoaded += 8;
    const toFetch = displayedUsernames
      .filter(username => !this.userCache.hasOwnProperty(username))
      .map(username => fetch(userUrl + username).then(resp => resp.json()));
    let results = null;
    try {
      results = await Promise.all(toFetch)
    } catch {
      alert("Something went wrong");
      return;
    }
    results.forEach(user => this.userCache[user.login] = {
      username: user.login,
      avatar_url: user.avatar_url,
      name: user.name || '',
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
    });
    const newDisplayed = displayedUsernames.map(username => this.userCache[username]);
    const displayed = [...this.state.displayed, ...newDisplayed];
    this.setState({displayed: displayed});
  }

  pinCard = (index) => {
    this.pinnedUsernames.add(this.state.displayed[index].username);
    this.setState(prevState => ({
      pinned: [...prevState.pinned, prevState.displayed[index]],
      displayed: prevState.displayed.filter((_, i) => i !== index),
    }));
  }

  unpinCard = (index) => {
    this.pinnedUsernames.delete(this.state.pinned[index].username);
    this.setState(prevState => ({
      pinned: prevState.pinned.filter((_, i) => i !== index),
    }));
  }
}

export default Search;
