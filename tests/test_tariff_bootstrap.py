import asyncio

from core.services.tariff_bootstrap import bootstrap_legacy_tariff


class NoDatabaseAccess:
    """Fails the test if startup tries to seed tariff data from settings."""

    def __getattr__(self, name):
        raise AssertionError(f"bootstrap must not access the database ({name})")


def test_bootstrap_does_not_seed_catalog_from_environment_defaults():
    # A non-zero value used to create/update a legacy tariff option at startup.
    # Catalog traffic is now configured only through the tariff admin UI.
    settings = type("Settings", (), {"USER_TRAFFIC_LIMIT_GB": 123.0})()

    asyncio.run(bootstrap_legacy_tariff(NoDatabaseAccess(), settings))
