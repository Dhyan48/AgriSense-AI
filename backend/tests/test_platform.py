from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_and_auth_flow():
    # 1. Health check
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}

    # 2. Protected route without token must fail (401)
    unauth = client.get("/api/history")
    assert unauth.status_code == 401
    assert unauth.json()["success"] is False

    # 3. Register & Login
    test_email = "dhyan_test@agrisense.ai"
    client.post("/api/auth/register", json={"name": "Dhyan", "email": test_email, "password": "Password123"})
    login = client.post("/api/auth/login", json={"email": test_email, "password": "Password123"})
    assert login.status_code == 200
    token = login.json()["access_token"]

    # 4. Fetch profile & dashboard stats with Bearer token
    headers = {"Authorization": f"Bearer {token}"}
    me = client.get("/api/auth/me", headers=headers)
    assert me.status_code == 200
    assert me.json()["email"] == test_email

    stats = client.get("/api/dashboard/stats", headers=headers)
    assert stats.status_code == 200
    assert stats.json()["success"] is True