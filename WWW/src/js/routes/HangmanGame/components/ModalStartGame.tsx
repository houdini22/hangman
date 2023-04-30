import * as React from 'react'
import { Alert, Button, Modal } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'
import { BsInfoCircle as InfoIcon } from 'react-icons/bs'
import { WordFormContainer } from '../containers/WordFormContainer'

interface ModalStartGameProps {
    visible: boolean
    setWordModalVisible: Function
}

class ModalStartGame extends React.Component<ModalStartGameProps, null> {
    render() {
        const { visible, setWordModalVisible } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
                    <Modal.Container visible={visible}>
                        <Modal.Header>Enter Word</Modal.Header>
                        <Modal.Body>
                            <Alert
                                color={'info'}
                                withIcon={<InfoIcon />}
                                iconHighlighted
                            >
                                Enter Word for your Hangman Game.
                            </Alert>
                            <WordFormContainer
                                setWordModalVisible={setWordModalVisible}
                            />
                            <Button
                                block
                                color="secondary"
                                onClick={() => navigate('/hangman')}
                            >
                                Go Back
                            </Button>
                        </Modal.Body>
                    </Modal.Container>
                )}
            </RouteManager>
        )
    }
}

export default { ModalStartGame }
export { ModalStartGame }
