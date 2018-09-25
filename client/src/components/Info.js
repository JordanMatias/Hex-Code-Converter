import React, { Component } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import api from '../api';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Card, Table, CardText, CardBody, CardSubtitle } from 'reactstrap';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.hex,
      copied: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let newColor = {
      hex: this.props.hex,
      name: this.props.name,
      rgb: this.props.rgb,
      meaning: this.props.meaning,
      family: this.props.family,
      analagous: this.props.analagous,
      tetrad: this.props.tetrad,
      splitcomplement: this.props.splitcomplement,
      monochromatic: this.props.monochromatic,
      isFavorite: true
    };
    api.addColor(newColor).then(data => {
      console.log('adding the new color', data);
    });
  }

  render() {
    return (
      <div>
        <Card style={{ backgroundColor: '#F7F7F7', color: 'black' }}>
          <CardBody>
            {this.props.meaning.length > 0 && (
              <div>
                <CardSubtitle>
                  Did you know that {this.props.name} is part of the broader
                  family of {this.props.family} colors?
                </CardSubtitle>
                <div>
                  <hr />
                </div>
                <CardText className="meaning-text">
                  {this.props.meaning}
                </CardText>
                <div>
                  <hr />
                </div>{' '}
              </div>
            )}
            <div>
              This is a {this.props.dark ? 'DARK ' : 'LIGHT '}
              color.
            </div>
            <div>
              <hr />
            </div>
            <Table borderless>
              <tbody>
                <tr>
                  <th scope="row">HEX</th>
                  <td>{this.props.hex}</td>
                </tr>
                <tr>
                  <th scope="row">RGB</th>
                  <td>{`${this.props.rgb.r}, ${this.props.rgb.g}, ${
                    this.props.rgb.b
                  }`}</td>
                </tr>
              </tbody>
            </Table>

            {api.isLoggedIn() && (
              <Button
                className="save"
                text={'Save'}
                onClick={this.handleSubmit}
              />
            )}
            {!api.isLoggedIn() && (
              <Link to="/login">
                {' '}
                <Button className="save" text={'Log In to Save'} />
              </Link>
            )}
            <div>
              <CopyToClipboard
                text={this.state.value}
                onCopy={() => this.setState({ copied: true })}
              >
                <Button className="save" text={'Copy to Clipboard'} />
              </CopyToClipboard>
              <div className="section">
                {this.state.copied ? (
                  <span style={{ color: 'red' }}>Copied.</span>
                ) : null}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
