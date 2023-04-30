import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import WordForm from '../components/WordForm'
import { actions as hangmanActions } from '../../../reducers/hangman'
import { withRouter } from '../../../helpers/router'
import { compose } from 'redux'

const onSubmit = (values, dispatch, { setWordModalVisible }) => {
    dispatch(hangmanActions.setWord(values['word']))
    setWordModalVisible(false)
}
const validate = ({ word }) => {
    const errors = {
        word: '',
    }

    if (!word) {
        errors.word = 'Required.'
    }

    if (
        !word
            .trim()
            .replace(/\s+/g, ' ')
            .toLowerCase()
            .match(/^[a-ząćęńółźż\s]+$/g)
    ) {
        errors.word = 'Word must be alphanumeric.'
    }

    return errors
}
export const FORM_NAME = 'WordForm'
const selector = formValueSelector(FORM_NAME)

const WordFormContainer = compose(
    connect(() => {
        return {
            word: '',
        }
    }),
    withRouter,
    reduxForm({
        form: FORM_NAME,
        onSubmit,
        validate,
        initialValues: {
            word: '',
        },
    }),
)(WordForm)

export { WordFormContainer }
export default { WordFormContainer }
