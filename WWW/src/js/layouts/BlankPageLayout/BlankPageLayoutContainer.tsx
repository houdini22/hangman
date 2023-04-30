import { connect } from 'react-redux'
import { BlankPageLayout } from './BlankPageLayout'
import {
    actions as commonActions,
    selectors as commonSelectors,
} from '../../reducers/common'
import {
    actions as authActions,
    selectors as authSelectors,
} from '../../reducers/auth'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => ({
    common: commonSelectors['getState'](state),
    user: authSelectors['getUser'](state),
    isLoggedIn: authSelectors['getIsLoggedIn'](state),
    connectionErrorModalVisible:
        commonSelectors['getIsConnectionErrorModalVisible'](state),
    connectionError: commonSelectors['getConnectionError'](state),
})

const BlankPageLayoutContainer = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setConnectionErrorModalVisible:
                commonActions.setConnectionErrorModalVisible,
            logoff: authActions.logoff,
        },
        dispatch,
    )
})(BlankPageLayout)

export { BlankPageLayoutContainer }
export default { BlankPageLayoutContainer }
