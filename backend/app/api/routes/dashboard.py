from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.prediction import PredictionHistory
from app.models.user import User

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    counts_query = (
        db.query(PredictionHistory.prediction_type, func.count(PredictionHistory.id))
        .filter(PredictionHistory.user_id == current_user.id)
        .group_by(PredictionHistory.prediction_type)
        .all()
    )
    by_module = {"crop": 0, "yield": 0, "fertilizer": 0}
    for p_type, count in counts_query:
        if p_type in by_module:
            by_module[p_type] = count

    recent = (
        db.query(PredictionHistory)
        .filter(PredictionHistory.user_id == current_user.id)
        .order_by(PredictionHistory.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "success": True,
        "total_predictions": sum(by_module.values()),
        "by_module": by_module,
        "recent_predictions": [
            {
                "id": r.id,
                "prediction_type": r.prediction_type,
                "input_data": r.input_data,
                "output_data": r.output_data,
                "model_version": r.model_version,
                "created_at": r.created_at,
            }
            for r in recent
        ],
    }