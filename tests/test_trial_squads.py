import asyncio
from datetime import datetime, timezone
from types import SimpleNamespace

from core.services import trial_core


def test_plan_squad_uuids_keeps_all_unique_configured_squads():
    plan = SimpleNamespace(
        remnawave_squad_uuids=[" squad-a ", "squad-b", "squad-a"],
        remnawave_squad_uuid="legacy-first",
    )

    assert trial_core._plan_squad_uuids(plan) == ["squad-a", "squad-b"]


def test_plan_squad_uuids_accepts_legacy_comma_separated_value():
    plan = SimpleNamespace(
        remnawave_squad_uuids="squad-a, squad-b",
        remnawave_squad_uuid="squad-a",
    )

    assert trial_core._plan_squad_uuids(plan) == ["squad-a", "squad-b"]


def test_trial_squads_prefer_admin_plan_over_settings(monkeypatch):
    plan = SimpleNamespace(
        is_trial=True,
        remnawave_squad_uuids=["squad-a", "squad-b"],
        remnawave_squad_uuid="squad-a",
    )

    async def fake_get_plans(_session):
        return [plan]

    monkeypatch.setattr(trial_core.pricing_plan_dal, "get_plans", fake_get_plans)
    settings = SimpleNamespace(parsed_user_squad_uuids=["legacy-default"])

    resolved = asyncio.run(trial_core._resolve_trial_squad_uuids(object(), settings))

    assert resolved == [
        "squad-a",
        "squad-b",
    ]


def test_panel_payload_contains_every_trial_squad():
    settings = SimpleNamespace(
        USER_TRAFFIC_STRATEGY="NO_RESET",
        TRIAL_HWID_DEVICE_LIMIT=None,
        parsed_user_external_squad_uuid=None,
    )

    payload = trial_core._build_panel_update_payload(
        settings,
        panel_user_uuid="panel-user",
        expire_at=datetime(2026, 9, 6, tzinfo=timezone.utc),
        traffic_limit_bytes=1024,
        description="trial",
        squad_uuids=["squad-a", "squad-b"],
    )

    assert payload["activeInternalSquads"] == ["squad-a", "squad-b"]
