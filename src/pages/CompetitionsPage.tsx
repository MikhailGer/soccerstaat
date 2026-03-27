import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { Pagination } from '../components/Pagination'
import { SearchField } from '../components/SearchField'
import { StatusPanel } from '../components/StatusPanel'
import {
  fetchCompetitions,
  getCompetitionSearchText,
} from '../api/soccerStat'
import {
  clampPage,
  filterBySearch,
  getTotalPages,
  paginateItems,
} from '../utils/list'

const PAGE_SIZE = 8

function getPageFromSearchParams(searchParams: URLSearchParams) {
  const pageValue = Number(searchParams.get('page') ?? '1')

  return Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1
}

export function CompetitionsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchValue = searchParams.get('search') ?? ''

  const competitionsQuery = useQuery({
    queryKey: ['competitions'],
    queryFn: fetchCompetitions,
  })

  const filteredCompetitions = filterBySearch(
    competitionsQuery.data ?? [],
    searchValue,
    getCompetitionSearchText,
  )
  const totalPages = getTotalPages(filteredCompetitions.length, PAGE_SIZE)
  const currentPage = clampPage(getPageFromSearchParams(searchParams), totalPages)
  const visibleCompetitions = paginateItems(
    filteredCompetitions,
    currentPage,
    PAGE_SIZE,
  )

  function updateSearch(nextSearchValue: string) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextSearchValue.trim()) {
      nextSearchParams.set('search', nextSearchValue)
    } else {
      nextSearchParams.delete('search')
    }

    nextSearchParams.delete('page')
    setSearchParams(nextSearchParams)
  }

  function updatePage(nextPage: number) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextPage <= 1) {
      nextSearchParams.delete('page')
    } else {
      nextSearchParams.set('page', String(nextPage))
    }

    setSearchParams(nextSearchParams)
  }

  return (
    <section className="page page--catalog">
      <div className="catalog-toolbar">
        <SearchField
          className="search-field--catalog"
          label="Поиск по лигам"
          placeholder="Search"
          value={searchValue}
          onChange={updateSearch}
          hideLabel
        />
      </div>

      {competitionsQuery.isLoading ? (
        <StatusPanel
          title="Загружаем лиги"
          description="Получаем список соревнований из football-data.org."
        />
      ) : null}

      {competitionsQuery.isError ? (
        <StatusPanel
          title="Не удалось загрузить лиги"
          description={competitionsQuery.error.message}
        />
      ) : null}

      {!competitionsQuery.isLoading &&
      !competitionsQuery.isError &&
      visibleCompetitions.length === 0 ? (
        <StatusPanel
          title="Ничего не найдено"
          description="Попробуй изменить поисковый запрос и проверить написание названия."
        />
      ) : null}

      {!competitionsQuery.isLoading &&
      !competitionsQuery.isError &&
      visibleCompetitions.length > 0 ? (
        <>
          <div className="catalog-grid">
            {visibleCompetitions.map((competition) => (
              <Link
                key={competition.id}
                to={`/competitions/${competition.id}`}
                className="catalog-card"
              >
                <div className="catalog-card__image">
                  {competition.emblem ? (
                    <img
                      src={competition.emblem}
                      alt={`Эмблема ${competition.name}`}
                      loading="lazy"
                    />
                  ) : (
                    <span className="catalog-card__fallback">
                      {competition.code || competition.name.slice(0, 3)}
                    </span>
                  )}
                </div>

                <div className="catalog-card__body">
                  <p className="catalog-card__title">{competition.name}</p>
                  <p className="catalog-card__subtitle">{competition.area.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={updatePage}
          />
        </>
      ) : null}
    </section>
  )
}
