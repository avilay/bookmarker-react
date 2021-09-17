from dataclasses import dataclass

from ariadne import (
    MutationType,
    ObjectType,
    QueryType,
    UnionType,
    load_schema_from_path,
    make_executable_schema,
    resolve_to,
)
from ariadne.asgi import GraphQL

import bookmarker.data as data

query = QueryType()
bookmark = ObjectType("Bookmark")
bookmark_response = UnionType("BookmarkResponse")
mutation = MutationType()
add_bookmark_response = UnionType("AddBookmarkResponse")


@dataclass
class BookmarkNotFound:
    code: int
    message: str
    bad_bookmark_id: str


@query.field("bookmarks")
def resolve_bookmarks(*_):
    return list(data.bookmarks.values())


@query.field("bookmark")
def resolve_boomark(*_, id):
    if id in data.bookmarks:
        return data.bookmarks.get(id, None)
    else:
        return BookmarkNotFound(
            code=-1, message="Bookmark not in database", bad_bookmark_id=id
        )


@bookmark_response.type_resolver
def resolve_bookmark_response_type(obj, *_):
    return type(obj).__name__


resolve_to("id")(data.Bookmark, None)
resolve_to("url")(data.Bookmark, None)
resolve_to("title")(data.Bookmark, None)


@bookmark.field("createdAt")
def resolve_created_at(bookmark, _):
    return str(bookmark.created_at)


@mutation.field("addBookmark")
def resolve_add_bookmark(*_, url, title=None):
    return data.add_bookmark(url, title)


@add_bookmark_response.type_resolver
def resolve_add_bookmark_response_type(obj, *_):
    return type(obj).__name__


def start():
    typedefs = load_schema_from_path("../bookmarker.graphql")
    schema = make_executable_schema(
        typedefs, query, bookmark, bookmark_response, mutation, add_bookmark_response
    )
    return GraphQL(schema, debug=True)


app = start()
