import type { FormEvent, FormEventHandler } from 'react';
import Cookies from 'js-cookie';

import { apiPost } from '@services/api';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useErrorToast from '@hooks/useErrorToast';

import { Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import FormBox from '@components/FormBox';
import FormChoice from '@components/FormChoice';
import FormInput from '@components/FormInput';

export default SignIn;

function SignIn() {
   const { openToast } = useErrorToast();
   const navigate = useNavigate();

   const submitHandler = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();

         const fields = event.currentTarget.elements;
         const getValue = (input: any) => input?.value;

         // ***

         const email = getValue(fields.namedItem('email'));
         const password = getValue(fields.namedItem('password'));

         const { error, data } = await apiPost<{
            success: { token: string };
            error: { message: string };
         }>('/auth/signin', {
            data: {
               email,
               password,
            },
         });

         if (error) {
            const title =
               (error.response?.status === 500
                  ? null
                  : error?.response?.data.message) ?? 'Something went wrong!';

            openToast({ title });
            return;
         }

         Cookies.set('jwt_token', data.token);
         navigate('/', { replace: true });
      },
      [],
   );

   return (
      <FormBox onSubmit={submitHandler as FormEventHandler<HTMLElement>}>
         <Helmet>
            <title>Sign In | FullStack Challenge</title>
         </Helmet>

         <Heading as='h1' mb='20' textAlign='center'>
            Sign In
         </Heading>

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

         <FormChoice to='/signup' linkText='Sign Up' buttonText='Sign In' />
      </FormBox>
   );
}
