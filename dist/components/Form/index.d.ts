import { Form as BaseForm, FormProps, FormRef } from './Form';
import { Row } from './Row';
import { Label } from './Label';
import { Actions } from './Actions';
import TextField from './inputFields/TextField';
import SelectField from './inputFields/SelectField';
import { Validation } from './Validation';
import { useForm } from './useForm';
import { withInput, InputProps } from './inputFields/withInput';
declare type FormCompound = typeof BaseForm & {
    Row: typeof Row;
    Label: typeof Label;
    Actions: typeof Actions;
    TextField: typeof TextField;
    SelectField: typeof SelectField;
    Validation: typeof Validation;
};
declare const Form: FormCompound;
export { Form, useForm, withInput, InputProps };
export type { FormProps, FormRef };
