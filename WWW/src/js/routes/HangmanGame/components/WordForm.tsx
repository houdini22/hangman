import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Button } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/index.scss'

const cx = classNames.bind(styles)

export class LoginForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, submit } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="word"
                    component={FormField}
                    type="password"
                    placeholder="Enter word..."
                    autoComplete="off"
                    autoFocus
                />
                <Button type={'submit'} block>
                    Start Game
                </Button>
            </form>
        )
    }
}

export default LoginForm
