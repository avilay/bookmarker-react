// @flow
import "./normalize.css";
import "./skeleton.css"
import React from "react";
import type {Node} from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { List } from "./List";
import { Show } from "./Show";
import { Edit } from "./Edit";
import { Delete } from "./Delete";

function App(): Node {
  const allBookmarks = require("./bookmarks.json");
  let bookmarks = new Map();
  allBookmarks.forEach((bookmark) => bookmarks.set(bookmark.id, bookmark));

  return (
    <Router>
      <Switch>
        <Route path="/list"><List bookmarks={bookmarks} /></Route>
        <Route path="/show/:id"><Show bookmarks={bookmarks} /></Route>
        <Route path="/edit/:id"><Edit bookmarks={bookmarks} /></Route>
        <Route path="/delete/:id"><Delete bookmarks={bookmarks} /></Route>
        <Route path="/"><List bookmarks={bookmarks} /></Route>
      </Switch>
    </Router>
  );
}

export default App;