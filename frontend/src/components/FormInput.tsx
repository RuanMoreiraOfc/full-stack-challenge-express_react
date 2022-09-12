import { useId } from 'react';

import type { InputProps } from '@chakra-ui/react';
import { FormLabel, Text, Input } from '@chakra-ui/react';

export default FormInput;

type FormBoxProps = InputProps & { children?: never; label: string };

const defaultProps: Partial<FormBoxProps> = {
   isRequired: true,
};

FormInput.defaultProps = defaultProps;

function FormInput({ label, ...rest }: FormBoxProps) {
   const id = useId();
   const labelId = `label-${id}`;
   const fieldId = `field-${id}`;

   return (
      <FormLabel w='full' id={labelId} htmlFor={fieldId}>
         <Text as='span' textTransform='capitalize'>
            {label}:
         </Text>
         <Input //
            id={fieldId}
            h='12'
            placeholder={`Enter your ${label}`}
            bgColor='white'
            {...rest}
         />
      </FormLabel>
   );
}
