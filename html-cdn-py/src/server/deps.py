from fastapi import (
    Request,
)

from src.state import AppState

def app_state(request: Request) -> AppState:
    return request.state.app_state