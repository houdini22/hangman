import * as React from 'react'
import styles from '../../../../assets/scss/components/_scores.scss'
import classNames from 'classnames/bind'
import { LoadingOverlay, Table } from '../../../components'
import { http } from '../../../modules/http'

const cx = classNames.bind(styles)

class Scores extends React.Component<null, null> {
    state = {
        scores: [],
        isLoading: false,
        page: 1,
    }

    fetchPage(page) {
        http.get(`/hangman/scores?page=${page}`).then(
            ({
                data: {
                    data: {
                        scores: { data, current_page },
                    },
                },
            }) => {
                this.setState({ scores: data, page: current_page }, () => {
                    this.setState({ isLoading: false })
                })
            },
        )
    }

    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            this.fetchPage(1)
        })
    }

    render() {
        const { scores, isLoading } = this.state
        return (
            <div className={cx('scores')}>
                <Table.Container color={'primary'}>
                    <Table.THead>
                        <Table.Tr>
                            <Table.Th xs={3}>User</Table.Th>
                            <Table.Th xs={3}>Points</Table.Th>
                            <Table.Th xs={3}>Time in game</Table.Th>
                            <Table.Th xs={3}>Letters guessed</Table.Th>
                        </Table.Tr>
                    </Table.THead>
                    <Table.TBody>
                        {scores.map(
                            ({ name, points, duration, letters_guessed }) => {
                                return (
                                    <Table.Tr key={name}>
                                        <Table.Td xs={3}>{name}</Table.Td>
                                        <Table.Td xs={3}>{points}</Table.Td>
                                        <Table.Td xs={3}>{duration}</Table.Td>
                                        <Table.Td xs={3}>
                                            {letters_guessed}
                                        </Table.Td>
                                    </Table.Tr>
                                )
                            },
                        )}
                    </Table.TBody>
                </Table.Container>
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export default { Scores }
export { Scores }
