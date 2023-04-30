import { connect } from 'react-redux'
import { BlankPageLayout } from './BlankPageLayout'
import {
    actions as commonActions,
    selectors as commonSelectors,
} from '../../reducers/hangman'
import {
    actions as authActions,
    selectors as authSelectors,
} from '../../reducers/auth'
import { bindActionCreators } from 'redux'

const { setConnectionErrorModalVisible } = commonActions

const mapStateToProps = (state) => ({
    common: commonSelectors['getState'](state),
    user: authSelectors['getUser'](state),
    isLoggedIn: authSelectors['getIsLoggedIn'](state),
})

const BlankPageLayoutContainer = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setConnectionErrorModalVisible,
            logoff: authActions.logoff,
        },
        dispatch,
    )
})(BlankPageLayout)

export { BlankPageLayoutContainer }
export default { BlankPageLayoutContainer }
