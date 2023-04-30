import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/hangman-game.scss'
const cx = classNames.bind(styles)

interface TimerProps {
    duration: number
}

class Timer extends React.Component<TimerProps, null> {
    render() {
        const { duration } = this.props

        return <div className={cx('timer')}>{duration}s</div>
    }
}

export default { Timer }
export { Timer }
