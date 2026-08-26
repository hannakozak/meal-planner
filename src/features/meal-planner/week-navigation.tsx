'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { formatDateForUrl, formatWeekDate } from './utils'

type WeekNavigationProps = {
  monday: Date
  sunday: Date
}

export function WeekNavigation({ monday, sunday }: WeekNavigationProps) {
  const searchParams = useSearchParams()

  const getWeekUrl = (date: Date) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('week', formatDateForUrl(date))

    return `/meal-planner?${params.toString()}`
  }

  const previousWeek = new Date(monday)
  previousWeek.setDate(monday.getDate() - 7)

  const nextWeek = new Date(monday)
  nextWeek.setDate(monday.getDate() + 7)

  return (
    <div className="flex items-center justify-between">
      <Link
        href={getWeekUrl(previousWeek)}
        className="text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← Previous week
      </Link>

      <h2 className="text-lg font-semibold text-gray-900">
        {formatWeekDate(monday)} – {formatWeekDate(sunday)}
      </h2>

      <Link
        href={getWeekUrl(nextWeek)}
        className="text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        Next week →
      </Link>
    </div>
  )
}
