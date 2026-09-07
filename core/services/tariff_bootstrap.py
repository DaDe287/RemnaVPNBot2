import logging

from sqlalchemy.ext.asyncio import AsyncSession

from config.settings import Settings

logger = logging.getLogger(__name__)


async def bootstrap_legacy_tariff(db: AsyncSession, settings: Settings) -> None:
    """Do not import environment defaults into the tariff catalog.

    The startup hook is retained for deployment compatibility, but catalog
    plans, prices, squads and traffic limits are now configured exclusively in
    the admin panel.  This prevents ``USER_TRAFFIC_LIMIT_GB`` from being
    silently copied to a tariff option.
    """
    del db, settings
    logger.debug("Tariff bootstrap skipped: catalog settings are database-managed.")
