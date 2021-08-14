// @flow

import React from "react";
import type { Node } from "react";
import { useParams, useHistory } from "react-router-dom";

type Bookmark = {
  id: number,
  title: string,
  url: string,
  notes: string
}

type Props = {
  bookmarks: Map<number, Bookmark>,
  deleteBookmark(number): void
}

function Delete(props: Props): Node {
  let { id } = useParams();
  let history = useHistory();

  const bookmarkId = parseInt(id);
  const bookmark = props.bookmarks.get(bookmarkId);
  if (bookmark == null) {
    return <h3>This bookmark does not exist!</h3>;
  }

  function confirmDeleteClick(e) {
    e.preventDefault();
    props.deleteBookmark(bookmarkId);
    history.replace({pathname: "/list"});
  }


  return (
    <div className="container" style={{paddingTop: "1%"}}>
      <h3>Delete Bookmark</h3>

      <div className="row" style={{paddingBottom: "20px"}}>
        <div style={{fontSize: "larger", fontWeight: "900"}}>Title</div>
        <div>{bookmark.title}</div>
      </div>

      <div className="row" style={{paddingBottom: "20px"}}>
        <div style={{fontSize: "larger", fontWeight: "900"}}>Url</div>
        <div>{bookmark.url}</div>
      </div>

      <div className="row" style={{paddingBottom: "20px"}}>
        <div style={{fontSize: "larger", fontWeight: "900"}}>Notes</div>
        <div>{bookmark.notes}</div>
      </div>

      <button style={{backgroundColor: "#f5315f", color: "ghostwhite"}} onClick={confirmDeleteClick}>Confirm Delete!</button>
    </div>
  );
}

export { Delete };