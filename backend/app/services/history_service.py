from typing import Any
from sqlalchemy.orm import Session
from app.models.prediction import PredictionHistory


def save_prediction(
    db: Session,
    user_id: int,
    prediction_type: str,
    input_data: dict[str, Any],
    output_data: dict[str, Any],
    model_version: str | None = None,
) -> PredictionHistory:
    record = PredictionHistory(
        user_id=user_id,
        prediction_type=prediction_type,
        input_data=input_data,
        output_data=output_data,
        model_version=model_version,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record