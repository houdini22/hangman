import * as React from 'react'
import styles from '../../../../assets/scss/routes/hangman-game.scss'
import classNames from 'classnames/bind'
import { Container } from '../../../components/ui/Container'
import { Word } from './Word'
import { Image } from './Image'
import { Timer } from './Timer'
import { Keyboard } from './Keyboard'
import { ModalWon } from './ModalWon'
import { ModalLoose } from './ModalLoose'
import { ModalStartGame } from './ModalStartGame'
const cx = classNames.bind(styles)

interface HangmanProps {
    wordModalVisible: boolean
    setWordModalVisible: Function
    word: string
    guessWord: string
    mistakes: number
    duration: number
    won: boolean | null
    reset: Function
    pointsToWin: number | null
    pointsToLoose: number | null
}

class IndexView extends React.Component<HangmanProps, null> {
    render() {
        const {
            wordModalVisible,
            setWordModalVisible,
            word,
            guessWord,
            mistakes,
            duration,
            guessLetter,
            won,
            reset,
            pointsToWin,
            pointsToLoose,
        } = this.props

        return (
            <div className={cx('route--hangman-game')}>
                <Container>
                    <Timer
                        duration={duration}
                        pointsToWin={pointsToWin}
                        pointsToLoose={pointsToLoose}
                    />
                    <Image mistakes={mistakes} />
                    <Word word={word} guessWord={guessWord} />
                    <Keyboard guessLetter={guessLetter} />
                </Container>
                <ModalStartGame
                    visible={wordModalVisible}
                    setWordModalVisible={setWordModalVisible}
                />
                {won === true && <ModalWon reset={reset} />}
                {won === false && <ModalLoose reset={reset} word={word} />}
            </div>
        )
    }
}

export default { IndexView }
export { IndexView }
