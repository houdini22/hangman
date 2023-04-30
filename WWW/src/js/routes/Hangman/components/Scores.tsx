import * as React from 'react'
import styles from '../../../../assets/scss/components/_scores.scss'
import classNames from 'classnames/bind'
import {
    Button,
    Col,
    LoadingOverlay,
    Row,
    Select,
    Table,
} from '../../../components'
import { http } from '../../../modules/http'
import { secondsToWords } from '../../../helpers/date-time'
import { Filter } from './List/Filter'
import { ListManager } from './List/ListManager'
import { Pagination } from './List/Pagination'
import { ScoreTable } from './ScoreTable'
import { Filters } from './List/Filters'

const cx = classNames.bind(styles)

class Scores extends React.Component<null, null> {
    render() {
        return (
            <div className={cx('scores')}>
                <ListManager
                    url={'/hangman/scores'}
                    defaultFilters={{
                        date: 'all_time',
                        order_by: 'points',
                        order_direction: 'desc',
                        items_per_page: '5',
                    }}
                >
                    {({
                        fetch,
                        links,
                        setFilter,
                        filters,
                        data,
                        total,
                        hasPrevPage,
                        hasNextPage,
                        totalPages,
                        page,
                        isLoading,
                        setPage,
                        perPage,
                        resetFilters,
                    }) => (
                        <div>
                            <Filters>
                                <Filter
                                    filters={filters}
                                    options={[
                                        {
                                            label: 'All time',
                                            value: 'all_time',
                                        },
                                        {
                                            label: 'This month',
                                            value: 'this_month',
                                        },
                                        {
                                            label: 'This year',
                                            value: 'this_year',
                                        },
                                        {
                                            label: 'Previous year',
                                            value: 'previous_year',
                                        },
                                    ]}
                                    type={'radio'}
                                    name={'date'}
                                    setFilter={setFilter}
                                    fetch={fetch}
                                    label={'Date'}
                                />
                                <Filter
                                    filters={filters}
                                    options={[
                                        {
                                            label: '5',
                                            value: '5',
                                        },
                                        {
                                            label: '30',
                                            value: '15',
                                        },
                                        {
                                            label: '100',
                                            value: '100',
                                        },
                                    ]}
                                    type={'radio'}
                                    name={'items_per_page'}
                                    setFilter={setFilter}
                                    fetch={fetch}
                                    label={'Items per page'}
                                />
                                <Filter
                                    filters={filters}
                                    options={[
                                        {
                                            label: 'User',
                                            value: 'name',
                                        },
                                        {
                                            label: 'Points',
                                            value: 'points',
                                        },
                                        {
                                            label: 'Games played',
                                            value: 'games_played',
                                        },
                                        {
                                            label: 'Time',
                                            value: 'duration',
                                        },
                                        {
                                            label: 'Letters guessed',
                                            value: 'letters_guessed',
                                        },
                                    ]}
                                    type={'order'}
                                    setFilter={setFilter}
                                    fetch={fetch}
                                />
                                <Button
                                    color={'secondary'}
                                    onClick={() => resetFilters()}
                                >
                                    Reset Filters
                                </Button>
                            </Filters>
                            <ScoreTable
                                page={page}
                                filters={filters}
                                data={data}
                                total={total}
                                perPage={perPage}
                                totalPages={totalPages}
                            />
                            <Pagination
                                links={links}
                                page={page}
                                fetch={fetch}
                                setPage={setPage}
                                hasNextPage={hasNextPage}
                                hasPrevPage={hasPrevPage}
                                totalPages={totalPages}
                            />
                            {isLoading && <LoadingOverlay />}
                        </div>
                    )}
                </ListManager>
            </div>
        )
    }
}

export default { Scores }
export { Scores }
