import type { GridProps } from '@chakra-ui/react';
import { Grid, FormControl } from '@chakra-ui/react';

export default FormBox;

type FormBoxProps = GridProps;

function FormBox({ children, ...rest }: FormBoxProps) {
   return (
      <Grid
         as='form'
         maxW='500px'
         w='full'
         h='full'
         mx='auto'
         placeItems='center'
         {...rest}
      >
         <FormControl
            as={Grid}
            bgColor='blackAlpha.200'
            px='8'
            pt='8'
            pb='16'
            borderRadius='4'
         >
            {children}
         </FormControl>
      </Grid>
   );
}
