import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import FormBox from '@components/FormBox';
import FormInput from '@components/FormInput';
import FormChoice from '@components/FormChoice';

export default SignUp;

function SignUp() {
   return (
      <FormBox>
         <Helmet>
            <title>Sign Up | FullStack Challenge</title>
         </Helmet>

         <Heading as='h1' mb='20' textAlign='center'>
            Sign Up
         </Heading>

         <FormInput label='name' />
         <FormInput label='email' type='email' />
         <FormInput label='password' type='password' />

         <FormChoice to='/signin' linkText='Sign In' buttonText='Sign Up' />
      </FormBox>
   );
}
