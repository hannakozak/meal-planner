import { MealType, WeekDay } from '@prisma/client'

export const WEEK_DAYS = [
  { key: WeekDay.MONDAY, label: 'Monday' },
  { key: WeekDay.TUESDAY, label: 'Tuesday' },
  { key: WeekDay.WEDNESDAY, label: 'Wednesday' },
  { key: WeekDay.THURSDAY, label: 'Thursday' },
  { key: WeekDay.FRIDAY, label: 'Friday' },
  { key: WeekDay.SATURDAY, label: 'Saturday' },
  { key: WeekDay.SUNDAY, label: 'Sunday' },
]

export const MEAL_TYPES = [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER]
