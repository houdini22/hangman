import { connect } from 'react-redux'
import { IndexView } from '../components/Index'
import { bindActionCreators, compose } from 'redux'
import {
    selectors as authSelectors,
    actions as authActions,
} from '../../../reducers/auth'
import { withRouter } from '../../../helpers/router'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            activateAccount: authActions.activateAccount,
            setIsLoading: authActions.setIsLoading,
        },
        dispatch,
    )
}

const mapStateToProps = (state) => ({
    isLoading: authSelectors.getIsLoading(state),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(IndexView)
