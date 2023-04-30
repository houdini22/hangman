import { Card } from './ui/Card'
import { Checkbox } from './form/Checkbox'
import { Button } from './ui/Button'
import { LoadingOverlay } from './ui/LoadingOverlay'
import { Select } from './form/Select'
import { TextField } from './form/TextField'
import { Row } from './ui/Row'
import { Col } from './ui/Col'
import { FormField } from './form/FormField'
import { TextArea } from './form/TextArea'
import { Alert } from './ui/Alert'
import { Label } from './ui/Label'
import { Radio } from './form/Radio'
import { ModalContainer, ModalBody, ModalFooter, ModalHeader } from './ui/Modal'
import {
    DropdownContainer,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from './ui/Dropdown'
import {
    Table as TableContainer,
    Th as ThComponent,
    THead as THeadComponent,
    TBody as TBodyComponent,
    Td as TdComponent,
    Tr as TrComponent,
} from './ui/Table'

const Modal = {
    Container: ModalContainer,
    Body: ModalBody,
    Header: ModalHeader,
    Footer: ModalFooter,
}

const Dropdown = {
    Container: DropdownContainer,
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
}

const Table = {
    Container: TableContainer,
    Th: ThComponent,
    THead: THeadComponent,
    TBody: TBodyComponent,
    Td: TdComponent,
    Tr: TrComponent,
}

export {
    LoadingOverlay,
    Button,
    Select,
    Checkbox,
    Card,
    TextField,
    Row,
    Col,
    FormField,
    TextArea,
    Alert,
    Label,
    Radio,
    Modal,
    Dropdown,
    Table,
}

export default {
    TextField,
    LoadingOverlay,
    Button,
    Select,
    Checkbox,
    Card,
    Row,
    Col,
    FormField,
    TextArea,
    Alert,
    Label,
    Radio,
    Modal,
    Dropdown,
    Table,
}
