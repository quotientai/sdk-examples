from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from . import index, about, signup, client_state

router = APIRouter()

# Home page
router.add_api_route(
    "/",
    index.handler,
    methods=["GET"],
    response_class=HTMLResponse,
)

# About page
router.add_api_route(
    "/about",
    about.handler,
    methods=["GET"],
    response_class=HTMLResponse,
)

# Signup page
router.add_api_route(
    "/signup",
    signup.handler,
    methods=["GET"],
    response_class=HTMLResponse,
)

# Client State page
router.add_api_route(
    "/client-state",
    client_state.handler,
    methods=["GET"],
    response_class=HTMLResponse,
)
