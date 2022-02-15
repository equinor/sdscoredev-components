import { Form as BaseForm, FormProps } from './Form';
import { Row } from './Row';
import { Label } from './Label';
import { Actions } from './Actions';
import TextField from './inputFields/TextField';
import SelectField from './inputFields/SelectField';

import { useForm } from './useForm';
import { withInput, InputProps } from './inputFields/withInput';

type FormCompound = typeof BaseForm & {
    Row: typeof Row
    Label: typeof Label
    Actions: typeof Actions
    TextField: typeof TextField
    SelectField: typeof SelectField
}

const Form = BaseForm as FormCompound

Form.Row = Row
Form.Label = Label
Form.Actions = Actions
Form.TextField = TextField
Form.SelectField = SelectField


Form.Row.displayName = 'Form.Row'
Form.Label.displayName = 'Form.Label'

export { 
    Form,
    useForm,
    withInput,
    InputProps
}

export type { FormProps } 