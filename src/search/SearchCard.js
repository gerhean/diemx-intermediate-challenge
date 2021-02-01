import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

class SearchCard extends React.Component {
  render() {
    return (
      <Container>
        <Col>
          <Image src="holder.js/100px180" roundedCircle />
        </Col>
        <Col>
          <Row>
            <h4>
              {this.props.fullName}
            </h4>
            <p>
              {this.props.username}
            </p>
          </Row>
          <Row>
            <Col>
              <h4>
                {this.props.followerCount}
              </h4>
              <p>Follower</p>
            </Col>
            <Col>
              <h4>
                {this.props.followingCount}
              </h4>
              <p>Following</p>
            </Col>
            <Col>
              <h4>
                {this.props.repoCount}
              </h4>
              <p>Repos</p>
            </Col>
          </Row>
        </Col>
      </Container>
    );
  }
}

SearchCard.propTypes = {
  isPinned: PropTypes.bool,
  togglePin: PropTypes.func,
  fullName: PropTypes.string, 
  username: PropTypes.string, 
  avatar: PropTypes.string,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
  repoCount: PropTypes.number
};

export default SearchCard;
