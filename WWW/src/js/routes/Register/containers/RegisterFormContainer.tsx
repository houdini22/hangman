import { reduxForm, formValueSelector, SubmissionError } from 'redux-form'
import RegisterForm from '../components/RegisterForm'
import { withRouter } from '../../../helpers/router'
import { compose } from 'redux'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
const onSubmit = (
    values,
    dispatch,
    { register, setRegisterError, resetCaptcha },
) => {
    return register(values).then(
        () => {
            setRegisterError(
                true,
                'Your account was created. Now activate it by clicking link in email.',
            )
        },
        ({
            response: {
                data: { errors, message },
            },
        }) => {
            resetCaptcha()
            setRegisterError(false, message)
            throw new SubmissionError(
                processAPIerrorResponseToFormErrors(errors),
            )
        },
    )
}
export const FORM_NAME = 'RegisterForm'
const selector = formValueSelector(FORM_NAME)

const RegisterFormContainer = compose(
    withRouter,
    reduxForm({
        form: FORM_NAME,
        onSubmit,
        initialValues: {
            name: '',
            email: '',
            confirm_email: '',
            password: '',
            confirm_password: '',
        },
    }),
)(RegisterForm)

export { RegisterFormContainer }
export default { RegisterFormContainer }
