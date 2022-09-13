import type { FormEvent, FormEventHandler } from 'react';
import Cookies from 'js-cookie';

import { apiPost } from '@services/api';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import { Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import FormBox from '@components/FormBox';
import FormInput from '@components/FormInput';
import FormChoice from '@components/FormChoice';

export default SignUp;

function SignUp() {
   const toast = useToast();
   const navigate = useNavigate();

   const submitHandler = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();

         const fields = event.currentTarget.elements;
         const getValue = (input: any) => input?.value;

         // ***

         const name = getValue(fields.namedItem('name'));
         const email = getValue(fields.namedItem('email'));
         const password = getValue(fields.namedItem('password'));

         const { error, data } = await apiPost<{
            success: { token: string };
            error: { message: string };
         }>('/auth/signup', {
            data: {
               name,
               email,
               password,
            },
         });

         if (error) {
            const id = 'toast-error';

            if (toast.isActive(id)) {
               return;
            }

            const title =
               error.response?.status === 500
                  ? 'Something went wrong!'
                  : error?.response?.data.message;

            toast({
               id,
               status: 'error',
               duration: 2000,
               position: 'top-right',
               title,
            });
            return;
         }

         Cookies.set('jwt_token', data.token);
         navigate('/', { replace: true });
      },
      [],
   );

   return (
      <FormBox onSubmit={submitHandler as FormEventHandler}>
         <Helmet>
            <title>Sign Up | FullStack Challenge</title>
         </Helmet>

         <Heading as='h1' mb='20' textAlign='center'>
            Sign Up
         </Heading>

         <FormInput //
            label='name'
            name='name'
         />
         <FormInput //
            label='email'
            type='email'
            name='email'
         />
         <FormInput //
            label='password'
            type='password'
            name='password'
         />

         <FormChoice to='/signin' linkText='Sign In' buttonText='Sign Up' />
      </FormBox>
   );
}
