import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/hangman-game.scss'
import { Button } from '../../../components'
const cx = classNames.bind(styles)

interface KeyboardProps {
    guessLetter: Function
}

class Keyboard extends React.Component<KeyboardProps, null> {
    renderKeyboard() {
        const { guessLetter } = this.props

        return 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVXYŹŻ'.split('').map((letter) => {
            return (
                <Button
                    size="xs"
                    outline
                    key={letter}
                    onClick={() => guessLetter(letter)}
                >
                    {letter}
                </Button>
            )
        })
    }
    render() {
        return <div className={cx('keyboard')}>{this.renderKeyboard()}</div>
    }
}

export default { Keyboard }
export { Keyboard }
