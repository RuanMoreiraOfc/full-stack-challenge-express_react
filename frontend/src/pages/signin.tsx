import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import FormBox from '@components/FormBox';
import FormChoice from '@components/FormChoice';
import FormInput from '@components/FormInput';

export default SignIn;

function SignIn() {
   return (
      <FormBox>
         <Helmet>
            <title>Sign In | FullStack Challenge</title>
         </Helmet>

         <Heading as='h1' mb='20' textAlign='center'>
            Sign In
         </Heading>

         <FormInput label='email' type='email' />
         <FormInput label='password' type='password' />

         <FormChoice to='/signup' linkText='Sign Up' buttonText='Sign In' />
      </FormBox>
   );
}
