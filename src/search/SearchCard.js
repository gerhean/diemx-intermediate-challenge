import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card'; 

import './SearchCard.scss';

class SearchCard extends React.Component {
  render() {
    const pinButton = (
      this.props.isPinned ?
        <button onClick={this.togglePin} className="cross-button">
          X
        </button>
      :
        <button onClick={this.togglePin} className="plus-button">
          +
        </button>
    );
    return (
      <Card className="search-card">
        <Container>
          <Row className="flex-row flex-nowrap">
            <Col xs={4} className="search-card-image-col">
              <Image 
                className="search-card-image"
                src={this.props.user.avatar_url}
                roundedCircle
              />
            </Col>
            <Col>
                <Row>
                  <h5>
                    {this.props.user.name}&nbsp;
                  </h5>
                  {pinButton}
                </Row>
                <Row className='mb-3'>
                  <a href="url">
                    @{this.props.user.username}
                  </a>
                </Row>
                <Row className='search-card-stats mt-auto'>
                  <Col>
                    <h6>
                      {this.props.user.followers}
                    </h6>
                    <p>Follower</p>
                  </Col>
                  <Col>
                    <h6>
                      {this.props.user.following}
                    </h6>
                    <p>Following</p>
                  </Col>
                  <Col>
                    <h6>
                      {this.props.user.public_repos}
                    </h6>
                    <p>Repos</p>
                  </Col>
                </Row>
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }

  togglePin = e => {
    this.props.togglePin(this.props.index);
  }
}



SearchCard.propTypes = {
  index: PropTypes.number,
  isPinned: PropTypes.bool,
  togglePin: PropTypes.func,
  user: PropTypes.object, 
};

export default SearchCard;
