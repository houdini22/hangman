import * as React from 'react'
import styles from '../../../../assets/scss/routes/register.scss'
import classNames from 'classnames/bind'
import { Container } from '../../../components/ui/Container'
import { RegisterFormContainer } from '../containers/RegisterFormContainer'
import { Alert, Button, Card, LoadingOverlay } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'
const cx = classNames.bind(styles)

interface RegisterProps {
    registerError: Object
    register: Function
    setRegisterError: Function
    captcha: number
    resetCaptcha: Function
    isLoading: boolean
    setIsLoading: Function
}

class IndexView extends React.Component<RegisterProps, null> {
    render() {
        const {
            registerError: { success, message },
            register,
            setRegisterError,
            captcha,
            resetCaptcha,
            setIsLoading,
            isLoading,
        } = this.props

        return (
            <div className={cx('route--register')}>
                <RouteManager>
                    {({ navigate }) => (
                        <Container>
                            <Card>
                                {success === false && (
                                    <Alert color={'danger'}>{message}</Alert>
                                )}
                                {success === true && (
                                    <Alert color={'success'}>{message}</Alert>
                                )}
                                {!success && (
                                    <>
                                        <RegisterFormContainer
                                            register={register}
                                            setRegisterError={setRegisterError}
                                            captcha={captcha}
                                            resetCaptcha={resetCaptcha}
                                            setIsLoading={setIsLoading}
                                        />
                                        <Button
                                            block
                                            color={'secondary'}
                                            onClick={() => navigate('/')}
                                        >
                                            Go Back
                                        </Button>
                                    </>
                                )}
                                {isLoading && <LoadingOverlay />}
                            </Card>
                        </Container>
                    )}
                </RouteManager>
            </div>
        )
    }
}

export default { IndexView }
export { IndexView }
