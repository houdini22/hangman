import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/hangman-game.scss'

const cx = classNames.bind(styles)

interface TimerProps {
    duration: number
    pointsToLoose: number | null
    pointsToWin: number | null
}

class Timer extends React.Component<TimerProps, null> {
    render() {
        const { duration, pointsToWin, pointsToLoose } = this.props

        return (
            <div className={cx('timer')}>
                Time: <b>{duration}s</b>
                {' | '}
                Points to win: <b>{pointsToWin}</b>
                {' | '}
                Points to loose: <b>{pointsToLoose}</b>
            </div>
        )
    }
}

export default { Timer }
export { Timer }
