// @flow

import React from "react";
import { useState } from "react";
import type {Node} from "react";
import { Link } from "react-router-dom";

type Bookmark = {
  id: number,
  title: string,
  url: string,
  notes: string,
};

type Props = {
  currentQuery: string,
  bookmarks: Map<number, Bookmark>,
  searchBookmarks(string): void
};

function List(props: Props): Node {
  const [searchQuery, setSearchQuery] = useState(props.currentQuery);

  function searchClick(e) {
    e.preventDefault();
    props.searchBookmarks(searchQuery);
  }

  const bookmarks = [...props.bookmarks.values()].map((bookmark) => {
    return (
      <div key={bookmark.id.toString()} className="row" style={{paddingBottom: "15px"}}>
        <Link to={`/show/${bookmark.id}`}>{bookmark.title}</Link>
      </div>
    );
  });

  return (
    <div className="container" style={{paddingTop: "1%"}}>
      <h1>Bookmarks</h1>

      <form>
        <div className="row">
          <div className="two-thirds column">
            <input
              style={{display: "inline", width: "60%"}}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={searchClick}>Search</button>
          </div>
        </div>
      </form>

      {bookmarks}
    </div>
  );
}

export {List};
