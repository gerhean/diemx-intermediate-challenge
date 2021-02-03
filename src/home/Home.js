import React from 'react';
import Button from 'react-bootstrap/Button';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>WELCOME!</h1>
        <br/>
        <h4>
          This application lets you search users from Github and
        </h4>
        <h4>
          display their information on the fly
        </h4>
        <br/>
        <h4>
          Want to Try? Click the SEARCH button below.
        </h4>
        <br/>
        <Button href="search" variant="dark" size="lg">SEARCH</Button>
      </div>
    );
  }
}

export default Home;
