from dotenv import load_dotenv
import os
from enum import Enum as PyEnum


class ConfigExceptionType(PyEnum):
    missing_env_var = "missing_env_var"


class ConfigException(Exception):
    def __init__(self, type: ConfigExceptionType, message: str):
        self.message = message
        self.type = type


def empty_to_none(field):
    value = os.getenv(field)
    if value is None or len(value) == 0:
        return None
    return value


# TODO: getopt() for cmd line arguments
class Config:
    # whether we're in dev mode -- controls
    #  whether to enable dev features like hot reloading
    #  + http enabled for google sso
    dev_mode: bool

    # listening
    host_name: str
    listen_address: str
    listen_port: int

    def __str__(self):
        return f"Config(dev_mode={self.dev_mode}, host_name={self.host_name}, listen_address={self.listen_address}, listen_port={self.listen_port})"

    def __init__(self):
        # Load the environment variables
        load_dotenv()

        self.dev_mode = os.getenv("DEV_MODE", "False") == "True"

        self.host_name = os.getenv("HOST_NAME", "http://localhost:8000")
        self.listen_address = os.getenv("LISTEN_ADDRESS", "0.0.0.0")
        self.listen_port = int(os.getenv("LISTEN_PORT", 8000))