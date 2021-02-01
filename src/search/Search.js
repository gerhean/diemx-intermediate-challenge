import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinned: [],
      found: [],
    };
  }

  render() {
    return (
      <div>
        <div>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </div>
        <div>
          <Image src="holder.js/100px180" roundedCircle />
        </div>
      </div>
    );
  }
}

export default Search;
