import React, { Component } from "react";

class NavTabs extends Component {

  shouldComponentUpdate(nextProps, nextStates) {
    if (nextProps !== this.props) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { sortBy, updateSortBy } = this.props;

    const handleClick = value => () => {
      updateSortBy(value);
    };

    const getClassLink = value => {
      return `nav-link ${sortBy === value ? "active" : ""}`;
    };

    return (
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <div
            className={getClassLink("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            Popularity
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink("revenue.desc")}
            onClick={handleClick("revenue.desc")}
          >
            Revenue
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            Vote average
          </div>
        </li>
      </ul>
    );
  }
}

export default NavTabs;
