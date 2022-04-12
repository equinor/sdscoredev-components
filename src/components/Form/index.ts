import { Form as BaseForm, FormProps, FormRef } from './Form';
import { Row } from './Row';
import { Label } from './Label';
import { Actions } from './Actions';
import TextField from './inputFields/TextField';
import SelectField from './inputFields/SelectField';
import ReadOnlyField from './inputFields/ReadOnlyField';
import { Validation } from './Validation';
import { ValidationProvider } from './Validation/ValidationProvider';
import { useValidation } from './Validation/useValidation';
import { validationReducer } from './Validation/validationReducer';

import { useForm } from './useForm';
import { withInput, InputProps } from './inputFields/withInput';

type FormCompound = typeof BaseForm & {
    Row: typeof Row
    Label: typeof Label
    Actions: typeof Actions
    TextField: typeof TextField
    SelectField: typeof SelectField
    ReadOnlyField: typeof ReadOnlyField
    Validation: typeof Validation
}

const Form = BaseForm as FormCompound

Form.Row = Row
Form.Label = Label
Form.Actions = Actions
Form.TextField = TextField
Form.SelectField = SelectField
Form.ReadOnlyField = ReadOnlyField
Form.Validation = Validation


Form.Row.displayName = 'Form.Row'
Form.Label.displayName = 'Form.Label'
Form.Validation.displayName = 'Form.Validation'

export { 
    Form,
    useForm,
    withInput,
    InputProps,
    ValidationProvider,
    useValidation,
    validationReducer
}

export type { FormProps, FormRef } 