// @flow

import React from "react";
import type { Node } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

type Bookmark = {
  id: number,
  title: string,
  url: string,
  notes: string,
};

type Props = {
  bookmarks: Map<number, Bookmark>
};

function Edit(props: Props): Node {
  let { id } = useParams();
  const bookmark = props.bookmarks.get(parseInt(id));

  const [title, setTitle] = useState(bookmark?.title);
  const [url, setUrl] = useState(bookmark?.url);
  const [notes, setNotes] = useState(bookmark?.notes);

  if (bookmark == null) {
    return (<h3>This bookmark does not exist!</h3>);
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
          <div className="three columns">
            <input className="button-primary" type="submit" value="Save" style={{display: "inline"}} />
          </div>
          <div className="three columns">
            <input className="button" type="submit" value="Cancel" style={{display: "inline"}} />
          </div>
        </div>

      </form>
    </div>
  );
}

export { Edit };