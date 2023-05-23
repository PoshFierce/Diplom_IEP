import { Rule } from 'rc-field-form/lib/interface';

export const makeRequiredFormFieldRule = (message = `This field is required`): Rule => ({
    required: true,
    message: message,
});

export const makeMinLengthFormFieldRule = (field: string, length: number): Rule => ({
    min: length,
    message: `${field} min length is ${length}`,
});
