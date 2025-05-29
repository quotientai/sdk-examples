from fastapi import FastAPI, Request
from contextlib import asynccontextmanager

from fastapi.staticfiles import StaticFiles
from src.state import AppState
from .pages import router as pages_router


def create_app(app_state: AppState) -> FastAPI:
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        await app_state.startup()
        yield
        await app_state.shutdown()

    app = FastAPI(lifespan=lifespan)

    # Store app_state on the app instance
    app.state.app_state = app_state

    async def state_middleware(request: Request, call_next):
        # Set individual attributes on request.state
        request.state.app_state = app.state.app_state
        return await call_next(request)

    # Add middleware
    app.middleware("http")(state_middleware)

    # Mount static files
    app.mount("/static", StaticFiles(directory="static"), name="static")

    # Include the HTML router
    app.include_router(pages_router)

    return app


# This instance is used by uvicorn
app = None
