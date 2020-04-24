import React, { Component } from "react";
class Home extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-success rounded" onClick={this.props.App}>
          Home
        </button>
      </div>
    );
  }
}
export default Home;
