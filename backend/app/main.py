from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.routes import auth, crop, dashboard, fertilizer, history, yield_pred
from app.core.config import settings
from app.db.session import Base, engine
from app.models import prediction, user  # noqa: F401 (ensures tables are registered)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgriSense AI API",
    version="1.0.0",
    description="Intelligent Agricultural Prediction and Decision Support Platform",
)

origins = [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Please check the submitted input values.",
            },
        },
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    code_map = {
        400: "BAD_REQUEST",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        409: "CONFLICT",
    }
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": code_map.get(exc.status_code, "HTTP_ERROR"),
                "message": str(exc.detail),
            },
        },
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected server error occurred.",
            },
        },
    )


@app.get("/health", tags=["System"])
def health_check():
    return {"status": "ok"}


app.include_router(auth.router, prefix="/api")
app.include_router(history.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(crop.router, prefix="/api")
app.include_router(yield_pred.router, prefix="/api")
app.include_router(fertilizer.router, prefix="/api")