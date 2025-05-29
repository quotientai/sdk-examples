from fastapi import Request
from src.server.handlers.page import PageResponse
from datetime import datetime

# Create page response helper
page = PageResponse(
    template="pages/about.html",
    layout="layouts/home.html",
)


async def handler(request: Request):
    """About page handler
    
    Args:
        request: The incoming request
    
    Returns:
        HTMLResponse with full layout or just content for HTMX
    """
    return page.render(request, {"current_year": datetime.now().year})