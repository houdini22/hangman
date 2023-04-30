import * as React from 'react'
import styles from '../../../../assets/scss/routes/register.scss'
import classNames from 'classnames/bind'
import { Container } from '../../../components/ui/Container'
import { Alert, Button, LoadingOverlay } from '../../../components'
import { getParamsFromSearch } from '../../../helpers/router'

const cx = classNames.bind(styles)

interface RegisterProps {
    activateAccount: Function
}

interface RegisterState {
    message: string
    activated: boolean
}

class IndexView extends React.Component<RegisterProps, null> {
    state = {
        message: '',
        activated: false,
    }

    componentDidMount() {
        const {
            activateAccount,
            setIsLoading,
            location: { search },
        } = this.props

        setIsLoading(true)
        const token = getParamsFromSearch(search)

        activateAccount(token)
            .then(({ message }) => {
                this.setState(
                    {
                        message,
                        activated: true,
                    },
                    () => {
                        setIsLoading(false)
                    },
                )
            })
            .catch(
                ({
                    response: {
                        data: { message },
                    },
                }) => {
                    this.setState(
                        {
                            message,
                            activated: false,
                        },
                        () => {
                            setIsLoading(false)
                        },
                    )
                },
            )
    }

    render() {
        const { isLoading, navigate } = this.props
        const { activated, message } = this.state

        return (
            <div className={cx('route--activate-account')}>
                <Container>
                    {!activated && message && (
                        <Alert color={'danger'}>{message}</Alert>
                    )}
                    {activated && message && (
                        <>
                            <Alert color={'success'}>{message}</Alert>
                            <Button block onClick={() => navigate('/')}>
                                Back to login.
                            </Button>
                        </>
                    )}
                    {isLoading && <LoadingOverlay />}
                </Container>
            </div>
        )
    }
}

export default { IndexView }
export { IndexView }
