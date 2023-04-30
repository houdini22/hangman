import * as React from 'react'
import { TextField } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/hangman-game.scss'
const cx = classNames.bind(styles)
interface WordProps {
    word: string
    guessWord: string
}

class Word extends React.Component<WordProps, null> {
    renderWord(word, guessWord) {
        return word.split('').map((letter, i) => {
            if (letter === ' ') {
                return <br key={i} />
            }

            return (
                <TextField
                    size="lg"
                    disabled
                    value={guessWord[i]}
                    type={'text'}
                    key={i}
                />
            )
        })
    }

    render() {
        const { word, guessWord } = this.props

        return (
            <div className={cx('word')}>{this.renderWord(word, guessWord)}</div>
        )
    }
}

export default { Word }
export { Word }
