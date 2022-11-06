import hashlib
import typing
from functools import partial
from pathlib import Path

from django.core.exceptions import ValidationError


def hash_file(file: typing.IO, block_size: int = 65536) -> str:
    hasher = hashlib.md5()
    for buf in iter(partial(file.read, block_size), b""):
        hasher.update(buf)
    return hasher.hexdigest()


def get_file_extension(filename: str) -> str:
    return Path(filename).suffix.lower()


def validate_file_extension(value):
    extension = get_file_extension(value.name)
    valid_extensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"]
    if extension not in valid_extensions:
        raise ValidationError(("File not supported"))
