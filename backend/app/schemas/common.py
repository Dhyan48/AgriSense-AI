from datetime import datetime
from typing import Any
from pydantic import BaseModel


class StandardPredictionResponse(BaseModel):
    success: bool = True
    prediction_type: str
    prediction: dict[str, Any]
    model_version: str | None = None
    created_at: datetime


class ErrorDetail(BaseModel):
    code: str
    message: str


class StandardErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail