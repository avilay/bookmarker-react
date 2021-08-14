// @flow

import React from "react";
import type { Node } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";

type Bookmark = {
  id: number,
  title: string,
  url: string,
  notes: string,
};

type Props = {
  bookmarks: Map<number, Bookmark>,
  editBookmark(Bookmark): void
};

function Edit(props: Props): Node {
  let { id } = useParams();  // have to use this variable name otherwise useParams does not work
  const bookmarkId = parseInt(id);
  const bookmark = props.bookmarks.get(bookmarkId);

  const [title, setTitle] = useState(bookmark?.title);
  const [url, setUrl] = useState(bookmark?.url);
  const [notes, setNotes] = useState(bookmark?.notes);
  let history = useHistory();

  if (bookmark == null) {
    return (<h3>This bookmark does not exist!</h3>);
  }

  function cancelClick(e) {
    e.preventDefault();
    history.goBack();
  }

  function saveClick(e) {
    e.preventDefault();
    console.log("Saving edits");
    props.editBookmark({
      id: bookmarkId,
      title: ((title: any): string),
      url: ((url: any): string),
      notes: ((notes: any): string)
    })
    history.goBack();
  }

  return (
    <div className="container" style={{paddingTop: "1%"}}>
      <h3>Edit Bookmark</h3>

      <form>
        <label>Title</label>
        <input
          className="u-full-width"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Url</label>
        <input
          className="u-full-width"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label>Notes</label>
        <textarea
          className="u-full-width"
          style={{height: "150px"}}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="row">
          <div style={{display: "inline", paddingRight: "10px"}}>
            <input
              className="button-primary"
              type="submit"
              value="Save"
              style={{display: "inline"}}
              onClick={saveClick}
            />
          </div>
          <div style={{display: "inline", paddingRight: "10px"}}>
            <input
              className="button"
              type="submit"
              value="Cancel"
              style={{display: "inline"}}
              onClick={cancelClick}
            />
          </div>
        </div>

      </form>
    </div>
  );
}

export { Edit };