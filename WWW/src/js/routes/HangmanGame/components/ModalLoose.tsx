import * as React from 'react'
import { Alert, Button, Modal } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'

interface ModalLooseProps {
    reset: Function
    word: string
}

class ModalLoose extends React.Component<ModalLooseProps, null> {
    render() {
        const { reset, word } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
                    <Modal.Container visible={true}>
                        <Modal.Body>
                            <Alert color={'danger'}>You Loose!</Alert>
                            <p>
                                The correct word was <b>{word}</b>
                            </p>
                            <Button
                                block
                                onClick={() => {
                                    reset()
                                }}
                            >
                                Play Again
                            </Button>
                            <Button
                                block
                                color="secondary"
                                onClick={() => {
                                    reset()
                                    navigate('/hangman')
                                }}
                            >
                                Go To Main Page
                            </Button>
                        </Modal.Body>
                    </Modal.Container>
                )}
            </RouteManager>
        )
    }
}

export default { ModalLoose }
export { ModalLoose }
