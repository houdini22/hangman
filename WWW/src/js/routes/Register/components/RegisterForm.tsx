import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Button } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/index.scss'
import { apiURL } from '../../../helpers/api'
import { BiHelpCircle } from 'react-icons/bi'

const cx = classNames.bind(styles)

export class RegisterForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, captcha, resetCaptcha } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    component={FormField}
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                    autoFocus
                />
                <Field
                    name="email"
                    component={FormField}
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                />
                <Field
                    name="email_confirmation"
                    component={FormField}
                    type="text"
                    placeholder="Confirm email"
                    autoComplete="off"
                />
                <Field
                    name="password"
                    component={FormField}
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                />
                <Field
                    name="password_confirmation"
                    component={FormField}
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="off"
                />
                <Field
                    name="_captcha"
                    component={FormField}
                    type="html"
                    htmlAfter={
                        <span>
                            <BiHelpCircle /> Click to reload.
                        </span>
                    }
                    html={() => {
                        return (
                            <div>
                                <img
                                    className={cx('register-form__captcha')}
                                    src={apiURL(`captcha/math?${captcha}`)}
                                    alt={''}
                                    onClick={() => {
                                        resetCaptcha()
                                    }}
                                />
                            </div>
                        )
                    }}
                />
                <Field
                    name="captcha"
                    component={FormField}
                    type="text"
                    placeholder="Math result from image"
                    inputOnly
                    autoComplete="off"
                />
                <Button type={'submit'} block>
                    Register
                </Button>
            </form>
        )
    }
}

export default RegisterForm
