import * as React from 'react'
import { Alert, Button, Modal } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'

interface ModalWonProps {
    reset: Function
}

class ModalWon extends React.Component<ModalWonProps, null> {
    render() {
        const { reset } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
                    <Modal.Container visible={true}>
                        <Modal.Body>
                            <Alert color={'success'}>You Won!</Alert>
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

export default { ModalWon }
export { ModalWon }
