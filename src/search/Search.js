import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { testFoundUsernames, testUserCache } from './TestData';

const searchUrl = 'https://api.github.com/search/users?';
const userUrl = 'https://api.github.com/users/';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      pinned: [],
      displayed: [],
    };
    this.foundUsernames = []
    this.userCache = {};
  }

  render() {
    return (
      <div>
        <div>
          <Form inline onSubmit={this.submitSearch}>
            <Form.Control 
              type="text" 
              placeholder="Search" 
              value={this.state.searchString} 
              onChange={this.handleSearchStringChange} 
              className="mr-sm-2" 
            />
            <Button variant="dark" type="submit">Search</Button>
          </Form>
        </div>
        <div>
          <Image src="holder.js/100px180" roundedCircle />
        </div>
      </div>
    );
  }

  handleSearchStringChange = (e) => {
     this.setState({searchString: e.target.value});
  }

  submitSearch = (e) => {
    e.preventDefault();
    this.getSearchResults();
  }

  getSearchResults = async () => {
    try {
      // const response = await fetch(searchUrl + new URLSearchParams({
      //     q: this.state.searchString,
      // }))
      // const json_data = await response.json();
      // const foundUsernames = json_data.items.map(function(item) {
      //     return item.login
      // });
      // console.log(foundUsernames);
      // this.foundUsernames = foundUsernames;
      this.foundUsernames = testFoundUsernames
      this.displayPage(0);
    } catch {
      alert("Something went wrong");
    }
  }

  displayPage = async (pageNumber) => {
    const start = pageNumber * 8;
    const displayedUsernames = this.foundUsernames.slice(start, start + 8);
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
      name: user.name,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
    });
    const displayedUsers = displayedUsernames.map(username => this.userCache[username])
    console.log(displayedUsers);
    console.log(this.userCache);
  }
}

export default Search;
