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

const cx = classNames.bind(styles)

interface ScoreTableProps {
    data: []
    page: number
    filters: Object
    total: number
    totalPages: number
}

class ScoreTable extends React.Component<ScoreTableProps, null> {
    render() {
        const { data, page, perPage, total, totalPages } = this.props

        return (
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
                    {data.map(
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
                                    <Table.Td xs={2}>{games_played}</Table.Td>
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
                    {!data.length && (
                        <Table.Tr>
                            <Table.Td xs={12} alignCenter>
                                No results.
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.TBody>
                <Table.TFoot>
                    <Table.Tr>
                        <Table.Td xs={12}>
                            Records:{' '}
                            <b>
                                {(page - 1) * perPage + 1} -{' '}
                                {Math.min(perPage * page, total)} / {total}
                            </b>
                            <br />
                            Total pages: <b>{totalPages}</b>
                        </Table.Td>
                    </Table.Tr>
                </Table.TFoot>
            </Table.Container>
        )
    }
}

export default { ScoreTable }
export { ScoreTable }
