import * as React from 'react'
import styles from '../../../../assets/scss/routes/register.scss'
import classNames from 'classnames/bind'
import { Container } from '../../../components/ui/Container'
import { RegisterFormContainer } from '../containers/RegisterFormContainer'
import { Alert, Card } from '../../../components'
const cx = classNames.bind(styles)

interface RegisterProps {
    registerError: Object
    register: Function
    setRegisterError: Function
    captcha: number
    resetCaptcha: Function
}

class IndexView extends React.Component<RegisterProps, null> {
    render() {
        const {
            registerError: { success, message },
            register,
            setRegisterError,
            captcha,
            resetCaptcha,
        } = this.props

        return (
            <div className={cx('route--register')}>
                <Container>
                    <Card>
                        {success === false && (
                            <Alert color={'danger'}>{message}</Alert>
                        )}
                        <RegisterFormContainer
                            register={register}
                            setRegisterError={setRegisterError}
                            captcha={captcha}
                            resetCaptcha={resetCaptcha}
                        />
                    </Card>
                </Container>
            </div>
        )
    }
}

export default { IndexView }
export { IndexView }
