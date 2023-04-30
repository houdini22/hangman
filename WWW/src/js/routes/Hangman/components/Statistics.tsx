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

class Statistics extends React.Component<null, null> {
    state = {
        statistics: {},
        isLoading: false,
    }

    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            http.get(`/hangman/my_statistics`).then(
                ({
                    data: {
                        data: { statistics },
                    },
                }) => {
                    this.setState(
                        {
                            statistics,
                        },
                        () => {
                            this.setState({ isLoading: false })
                        },
                    )
                },
            )
        })
    }

    render() {
        const {
            isLoading,
            statistics: {
                duration = 0,
                letters_guessed = 0,
                max_duration = 0,
                max_length = 0,
                max_points = 0,
                points = 0,
                games_played = 0,
            },
        } = this.state
        return (
            <div className={cx('scores')}>
                <p>
                    Total points: <b>{points}</b>
                </p>
                <p>
                    Total letters guessed: <b>{letters_guessed}</b>
                </p>
                <p>
                    Time in game: <b>{secondsToWords(duration)}</b>
                </p>
                <p>
                    Longest game: <b>{secondsToWords(max_duration)}</b>
                </p>
                <p>
                    Maximum points won: <b>{max_points}</b>
                </p>
                <p>
                    Maximum guessed word length: <b>{max_length}</b>
                </p>
                <p>
                    Games played: <b>{games_played}</b>
                </p>
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export default { Statistics }
export { Statistics }
