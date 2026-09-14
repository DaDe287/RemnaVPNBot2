const YANDEX_METRIKA_COUNTER_ID = 111352049

export type MetrikaGoal = 'TRIAL' | 'PURCH'

type YandexMetrika = (counterId: number, method: 'reachGoal', goal: MetrikaGoal) => void

/** Sends a goal when Metrika is available without blocking the user action. */
export function reachMetrikaGoal(goal: MetrikaGoal): void {
  const ym = (window as typeof window & { ym?: YandexMetrika }).ym
  ym?.(YANDEX_METRIKA_COUNTER_ID, 'reachGoal', goal)
}
