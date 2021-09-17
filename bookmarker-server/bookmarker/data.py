from dataclasses import dataclass
from datetime import datetime, timedelta
import shortuuid
import requests


@dataclass
class Bookmark:
    id: str
    url: str
    title: str
    created_at: datetime


@dataclass
class InvalidUrl:
    code: str
    message: str
    bad_url: str


now = datetime.now()

bookmarks = {
    "8zaXGHxD53GdCLu7Bcs2X6": Bookmark(
        id="8zaXGHxD53GdCLu7Bcs2X6",
        url="https://fb.workplace.com/notes/376804926825115/",
        title="Sharding Embeddings for Efficient Full-Sync Training on TC",
        created_at=(now - timedelta(days=10)),
    ),
    "MjQkPQPCAoaBxYN8w55ZqH": Bookmark(
        id="MjQkPQPCAoaBxYN8w55ZqH",
        url="https://fb.workplace.com/notes/987103225450922/",
        title="Introducing WSCache: A Disaggregated Caching Layer for Warm Storage",
        created_at=(now - timedelta(days=15)),
    ),
    "Vzc3jmXeiAFD2dTCnjCK7a": Bookmark(
        id="Vzc3jmXeiAFD2dTCnjCK7a",
        url="https://fb.quip.com/mOmOAoxbZq2a",
        title="GPU Based Preproc Cost Model",
        created_at=(now - timedelta(days=20)),
    ),
    "hSVyLBEPZGoopJysiyqLzV": Bookmark(
        id="hSVyLBEPZGoopJysiyqLzV",
        url="https://fb.quip.com/CZoAA1TvOKWX",
        title="[WIP] Standardized Ads Training Efficiency Saving Reporting",
        created_at=(now - timedelta(days=25)),
    ),
    "5LvtMonA4dbV4UUgGSZzpT": Bookmark(
        id="5LvtMonA4dbV4UUgGSZzpT",
        url="https://fb.quip.com/gZ2LAwauUWrS",
        title="Ads Infra Pillar Reviews",
        created_at=(now - timedelta(days=30)),
    ),
    "JWk4wdLAroDn5F5yKQ4z8P": Bookmark(
        id="JWk4wdLAroDn5F5yKQ4z8P",
        url="https://fb.workplace.com/notes/400388068264610",
        title='The evolution of DPer: explaining "Option 3", TorchRec, and PyPer',
        created_at=(now - timedelta(days=35)),
    ),
    "D4yr4vYRaLB8MdwKHAvLtA": Bookmark(
        id="D4yr4vYRaLB8MdwKHAvLtA",
        url="https://fb.workplace.com/notes/3360428724055245/",
        title="PyTorch FX",
        created_at=(now - timedelta(days=40)),
    ),
    "JjBx7Dgn9XanrivAfHFPcJ": Bookmark(
        id="JjBx7Dgn9XanrivAfHFPcJ",
        url="https://fb.quip.com/mFKUACgFaIrw",
        title="Understanding the Training Efficiency of Ads TC models",
        created_at=(now - timedelta(days=45)),
    ),
}


def add_bookmark(url, title=None):
    try:
        resp = requests.get(url)
        resp.raise_for_status()
        bookmark = Bookmark(
            id=shortuuid.uuid(),
            url=url.strip(),
            title=title if title else "Placeholder Title",
            created_at=datetime.now(),
        )
        bookmarks[bookmark.id] = bookmark
        return bookmark
    except requests.exceptions.ConnectionError as err:
        return InvalidUrl(code=-2, message=str(err), bad_url=url)
    except requests.exceptions.HTTPError as err:
        return InvalidUrl(code=-2, message=str(err), bad_url=url)
