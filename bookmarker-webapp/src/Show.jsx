// @flow
import React from "react";
import type { Node } from "react";
import { useParams, Link } from "react-router-dom";

type Bookmark = {
  id: number,
  title: string,
  url: string,
  notes: string,
};

type Props = {
  bookmarks: Map<number, Bookmark>
};

function Show(props: Props): Node {
  let { id } = useParams();
  const bookmark = props.bookmarks.get(parseInt(id));
  if (bookmark == null) {
    return <h3>This bookmark does not exist!</h3>;
  }

  return (
    <div className="container" style={{paddingTop: "1%"}}>
      <h4>{bookmark.title}</h4>

      <div className="row" style={{paddingBottom: "10px"}}>
        <a href={bookmark.url}>{bookmark.url}</a>
      </div>

      <p>
        {bookmark.notes}
      </p>

      <div className="row">
        <div className="three columns">
          <Link className="button" to={`/edit/${bookmark.id}`}>Edit</Link>
        </div>
        <div className="three columns">
          <Link className="button" to={`/delete/${bookmark.id}`}>Delete</Link>
        </div>
      </div>
    </div>
  );
}

export { Show };