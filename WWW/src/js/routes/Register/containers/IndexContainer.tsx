import { connect } from 'react-redux'
import { IndexView } from '../components/Index'
import { bindActionCreators } from 'redux'
import {
    selectors as authSelectors,
    actions as authActions,
} from '../../../reducers/auth'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            register: authActions.register,
            setRegisterError: authActions.setRegisterError,
            resetCaptcha: authActions.resetCaptcha,
        },
        dispatch,
    )
}

const mapStateToProps = (state) => ({
    registerError: authSelectors.getRegisterError(state),
    captcha: authSelectors.getCaptcha(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
