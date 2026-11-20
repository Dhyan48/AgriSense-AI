from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.prediction import PredictionHistory
from app.models.user import User

router = APIRouter(prefix="/history", tags=["Prediction History"])


@router.get("")
def list_history(
    prediction_type: str | None = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(PredictionHistory).filter(PredictionHistory.user_id == current_user.id)
    if prediction_type:
        query = query.filter(PredictionHistory.prediction_type == prediction_type)
    records = query.order_by(PredictionHistory.created_at.desc()).all()
    return {
        "success": True,
        "count": len(records),
        "items": [
            {
                "id": r.id,
                "prediction_type": r.prediction_type,
                "input_data": r.input_data,
                "output_data": r.output_data,
                "model_version": r.model_version,
                "created_at": r.created_at,
            }
            for r in records
        ],
    }


@router.get("/{prediction_id}")
def get_history_item(
    prediction_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    record = (
        db.query(PredictionHistory)
        .filter(PredictionHistory.id == prediction_id, PredictionHistory.user_id == current_user.id)
        .first()
    )
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prediction record not found.")
    return {
        "success": True,
        "item": {
            "id": record.id,
            "prediction_type": record.prediction_type,
            "input_data": record.input_data,
            "output_data": record.output_data,
            "model_version": record.model_version,
            "created_at": record.created_at,
        },
    }


@router.delete("/{prediction_id}", status_code=status.HTTP_200_OK)
def delete_history_item(
    prediction_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    record = (
        db.query(PredictionHistory)
        .filter(PredictionHistory.id == prediction_id, PredictionHistory.user_id == current_user.id)
        .first()
    )
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prediction record not found.")
    db.delete(record)
    db.commit()
    return {"success": True, "message": "Prediction record deleted."}