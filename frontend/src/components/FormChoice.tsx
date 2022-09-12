import type { FlexProps } from '@chakra-ui/react';
import { Button, Flex } from '@chakra-ui/react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default FormChoice;

type FormChoiceProps = FlexProps & {
   children?: never;
   to: LinkProps['to'];
   linkText: LinkProps['children'];
   buttonText: LinkProps['children'];
};

function FormChoice({
   to,
   linkText,
   buttonText,
   sx,
   ...rest
}: FormChoiceProps) {
   return (
      <Flex
         mt='4'
         gap='2'
         sx={{
            '> *': {
               h: '12',
               flex: 1,
            },
            ...sx,
         }}
         {...rest}
      >
         <Button as={Link} to={to} colorScheme='green'>
            {linkText}
         </Button>
         <Button type='submit' colorScheme='blue'>
            {buttonText}
         </Button>
      </Flex>
   );
}
