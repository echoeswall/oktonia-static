import sqlite3

import pytest

from app import models


def make_place(db, **overrides):
    fields = dict(
        slug="taverna-example",
        type="restaurant",
        name="Taverna Example",
        short_description="Eine Beispiel-Taverne.",
        latitude=38.8,
        longitude=24.1,
        published=0,
    )
    fields.update(overrides)
    return models.create_place(db, **fields)


def test_create_and_read_place(db):
    place_id = make_place(db)
    row = models.get_place(db, id=place_id)
    assert row["slug"] == "taverna-example"
    assert row["type"] == "restaurant"
    assert row["published"] == 0

    by_slug = models.get_place(db, slug="taverna-example")
    assert by_slug["id"] == place_id


def test_update_place(db):
    place_id = make_place(db)
    models.update_place(db, place_id, name="Taverna Renamed", published=1)
    row = models.get_place(db, id=place_id)
    assert row["name"] == "Taverna Renamed"
    assert row["published"] == 1
    # updated_at must have moved away from the insert-time default
    assert row["updated_at"] is not None


def test_delete_place(db):
    place_id = make_place(db)
    models.delete_place(db, place_id)
    assert models.get_place(db, id=place_id) is None


def test_list_places_filters_by_type_and_published(db):
    make_place(db, slug="a", type="restaurant", published=1)
    make_place(db, slug="b", type="beach", published=0)
    make_place(db, slug="c", type="restaurant", published=0)

    restaurants = models.list_places(db, type="restaurant")
    assert {r["slug"] for r in restaurants} == {"a", "c"}

    published_only = models.list_places(db, published=True)
    assert {r["slug"] for r in published_only} == {"a"}


def test_duplicate_slug_rejected(db):
    make_place(db, slug="dupe")
    with pytest.raises(sqlite3.IntegrityError):
        make_place(db, slug="dupe")


def test_invalid_type_rejected(db):
    with pytest.raises(sqlite3.IntegrityError):
        make_place(db, slug="bad-type", type="not-a-real-type")


def test_missing_required_field_rejected(db):
    with pytest.raises(sqlite3.IntegrityError):
        models.create_place(db, slug="no-name", type="restaurant")


def test_latitude_out_of_range_rejected(db):
    with pytest.raises(sqlite3.IntegrityError):
        make_place(db, slug="bad-lat", latitude=200)


def test_longitude_out_of_range_rejected(db):
    with pytest.raises(sqlite3.IntegrityError):
        make_place(db, slug="bad-lng", longitude=-200)


def test_image_reference_works(db):
    place_id = make_place(db)
    image_id = models.add_image(
        db, place_id, filename="taverna-1.jpg", alt_text="Terrasse mit Meerblick", is_cover=True
    )
    images = models.list_images(db, place_id)
    assert len(images) == 1
    assert images[0]["id"] == image_id
    assert images[0]["is_cover"] == 1


def test_image_requires_existing_place(db):
    with pytest.raises(sqlite3.IntegrityError):
        models.add_image(db, place_id=9999, filename="orphan.jpg")


def test_deleting_place_cascades_to_images(db):
    place_id = make_place(db)
    models.add_image(db, place_id, filename="taverna-1.jpg")
    models.delete_place(db, place_id)
    assert models.list_images(db, place_id) == []
