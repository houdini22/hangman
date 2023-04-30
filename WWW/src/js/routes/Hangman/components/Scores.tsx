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

const cx = classNames.bind(styles)

class Scores extends React.Component<null, null> {
    state = {
        scores: [],
        isLoading: false,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
        totalPages: 0,
        filters: {
            date: 'all_time',
        },
        sortColumn: 'points',
        sortDirection: 'desc',
        total: 0,
    }

    fetchPage(page) {
        this.setState({ isLoading: true }, () => {
            const { filters, sortDirection, sortColumn } = this.state

            http.get(
                `/hangman/scores?page=${page}${Object.keys(filters).map(
                    (key) => {
                        return `&filters[${key}]=${filters[key]}`
                    },
                )}&sort_by=${sortColumn}&sort_direction=${sortDirection}`,
            ).then(
                ({
                    data: {
                        data: {
                            scores: {
                                data,
                                current_page,
                                next_page_url,
                                prev_page_url,
                                last_page,
                                total,
                            },
                        },
                    },
                }) => {
                    this.setState(
                        {
                            scores: data,
                            page: current_page,
                            hasNextPage: !!next_page_url,
                            hasPrevPage: !!prev_page_url,
                            totalPages: last_page,
                            total,
                        },
                        () => {
                            this.setState({ isLoading: false })
                        },
                    )
                },
            )
        })
    }

    componentDidMount() {
        this.fetchPage(1)
    }

    render() {
        const {
            scores,
            isLoading,
            hasNextPage,
            hasPrevPage,
            page,
            totalPages,
            filters,
            sortColumn,
            sortDirection,
            total,
        } = this.state
        return (
            <div className={cx('scores')}>
                <div className={cx('filters')}>
                    <div className={cx('filter')}>
                        <span>Date:</span>
                        <Button
                            color={
                                filters['date'] === 'this_month'
                                    ? 'warning'
                                    : 'secondary'
                            }
                            size={'xs'}
                            onClick={() => {
                                this.setState(
                                    {
                                        filters: {
                                            ...filters,
                                            date: 'this_month',
                                        },
                                    },
                                    () => {
                                        this.fetchPage(page)
                                    },
                                )
                            }}
                        >
                            This month
                        </Button>
                        <Button
                            color={
                                filters['date'] === 'this_year'
                                    ? 'warning'
                                    : 'secondary'
                            }
                            size={'xs'}
                            onClick={() => {
                                this.setState(
                                    {
                                        filters: {
                                            ...filters,
                                            date: 'this_year',
                                        },
                                    },
                                    () => {
                                        this.fetchPage(page)
                                    },
                                )
                            }}
                        >
                            This year
                        </Button>
                        <Button
                            color={
                                filters['date'] === 'previous_year'
                                    ? 'warning'
                                    : 'secondary'
                            }
                            size={'xs'}
                            onClick={() => {
                                this.setState(
                                    {
                                        filters: {
                                            ...filters,
                                            date: 'previous_year',
                                        },
                                    },
                                    () => {
                                        this.fetchPage(page)
                                    },
                                )
                            }}
                        >
                            Previous year
                        </Button>
                        <Button
                            color={
                                filters['date'] === 'all_time'
                                    ? 'warning'
                                    : 'secondary'
                            }
                            size={'xs'}
                            onClick={() => {
                                this.setState(
                                    {
                                        filters: {
                                            ...filters,
                                            date: 'all_time',
                                        },
                                    },
                                    () => {
                                        this.fetchPage(page)
                                    },
                                )
                            }}
                        >
                            All the time
                        </Button>
                    </div>
                    <div className={cx('filter')}>
                        <span>Sort by:</span>
                        <Select
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
                            defaultValue={sortColumn}
                            onChange={({ target: { value } }) => {
                                this.setState({ sortColumn: value }, () => {
                                    this.fetchPage(page)
                                })
                            }}
                        />
                        <Select
                            options={[
                                {
                                    label: 'Ascending',
                                    value: 'asc',
                                },
                                {
                                    label: 'Descending',
                                    value: 'desc',
                                },
                            ]}
                            defaultValue={sortDirection}
                            onChange={({ target: { value } }) => {
                                this.setState({ sortDirection: value }, () => {
                                    this.fetchPage(page)
                                })
                            }}
                        />
                    </div>
                </div>
                <Table.Container color={'primary'}>
                    <Table.THead>
                        <Table.Tr>
                            <Table.Th xs={2}>User</Table.Th>
                            <Table.Th xs={2}>Points</Table.Th>
                            <Table.Th xs={2}>Games played</Table.Th>
                            <Table.Th xs={3}>Time in game</Table.Th>
                            <Table.Th xs={3}>Letters guessed</Table.Th>
                        </Table.Tr>
                    </Table.THead>
                    <Table.TBody>
                        {scores.map(
                            ({
                                name,
                                points,
                                duration,
                                letters_guessed,
                                games_played,
                            }) => {
                                return (
                                    <Table.Tr key={name}>
                                        <Table.Td xs={2}>{name}</Table.Td>
                                        <Table.Td xs={2}>{points}</Table.Td>
                                        <Table.Td xs={2}>
                                            {games_played}
                                        </Table.Td>
                                        <Table.Td xs={3}>
                                            {secondsToWords(duration)}
                                        </Table.Td>
                                        <Table.Td xs={3}>
                                            {letters_guessed}
                                        </Table.Td>
                                    </Table.Tr>
                                )
                            },
                        )}
                    </Table.TBody>
                </Table.Container>
                <div className={cx('summary')}>
                    <p>
                        Total records: <b>{total}</b>
                    </p>
                </div>
                <Row className={cx('pagination')}>
                    <Col xs={5}>
                        <Button
                            disabled={!hasPrevPage}
                            color={'secondary'}
                            size={'xs'}
                            onClick={() => {
                                this.fetchPage(page - 1)
                            }}
                        >
                            Previous Page
                        </Button>
                    </Col>
                    <Col xs={2}>
                        Page {page} / {totalPages}
                    </Col>
                    <Col xs={5} style={{ textAlign: 'right' }}>
                        <Button
                            disabled={!hasNextPage}
                            color={'secondary'}
                            size={'xs'}
                            onClick={() => {
                                this.fetchPage(page + 1)
                            }}
                        >
                            Next Page
                        </Button>
                    </Col>
                </Row>
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export default { Scores }
export { Scores }
