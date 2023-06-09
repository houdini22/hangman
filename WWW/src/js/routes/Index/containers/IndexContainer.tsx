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
            setLoginError: authActions.setLoginError,
            setIsLoading: authActions.setIsLoading,
        },
        dispatch,
    )
}

const mapStateToProps = (state) => ({
    loginError: authSelectors.getLoginError(state),
    isLoading: authSelectors.getIsLoading(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
