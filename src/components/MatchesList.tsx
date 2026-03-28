import type { Match } from '../types/football'
import {
  formatMatchDate,
  formatMatchScoreSummary,
  formatMatchStatus,
  formatMatchTime,
} from '../utils/matches'

interface MatchesListProps {
  matches: Match[]
}

export function MatchesList({ matches }: MatchesListProps) {
  return (
    <div className="matches-table" role="table" aria-label="Список матчей">
      <div className="matches-table__row matches-table__row--head" role="row">
        <span role="columnheader">ДД.ММ.ГГГГ</span>
        <span role="columnheader">ЧЧ.ММ</span>
        <span role="columnheader">Статус</span>
        <span role="columnheader">Команда A - Команда B</span>
        <span role="columnheader" aria-hidden="true"></span>
      </div>

      {matches.map((match) => (
        <article key={match.id} className="matches-table__row" role="row">
          <span role="cell">{formatMatchDate(match.utcDate)}</span>
          <span role="cell">{formatMatchTime(match.utcDate)}</span>
          <span role="cell">{formatMatchStatus(match.status)}</span>
          <span role="cell" className="matches-table__teams">
            {match.homeTeam.name} - {match.awayTeam.name}
          </span>
          <span role="cell" className="matches-table__score">
            {formatMatchScoreSummary(match)}
          </span>
        </article>
      ))}
    </div>
  )
}
