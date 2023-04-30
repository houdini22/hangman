import { connect } from 'react-redux'
import { IndexView } from '../components/Index'
import { bindActionCreators } from 'redux'
import {
    selectors as hangmanSelectors,
    actions as hangmanActions,
} from '../../../reducers/hangman'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setWordModalVisible: hangmanActions.setWordModalVisible,
            guessLetter: hangmanActions.guessLetter,
            reset: hangmanActions.reset,
        },
        dispatch,
    )
}

const mapStateToProps = (state) => ({
    wordModalVisible: hangmanSelectors.getWordModalVisible(state),
    word: hangmanSelectors.getWord(state),
    guessWord: hangmanSelectors.getGuessWord(state),
    mistakes: hangmanSelectors.getMistakes(state),
    duration: hangmanSelectors.getDuration(state),
    won: hangmanSelectors.getWon(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
