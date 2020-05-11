import React, { useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Card from '../components/common/Card';
import GradientButton from '../components/common/GradientButton';
import Hyperlink from '../components/common/Hyperlink';
import Label from '../components/common/Label';
import FormInput from '../components/FormInput';
import { AuthContext } from '../context/AuthContext';
import GradientBar from './../components/common/GradientBar';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { publicFetch } from './../util/fetch';
import logo from './../images/logo.png';
import { Redirect } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required(
    'First name is required'
  ),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Signup = () => {
  const authContext = useContext(AuthContext);
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(
    false
  );
  const [loginLoading, setLoginLoading] = useState(false);

  const submitCredentials = async credentials => {
    try {
      setLoginLoading(true);
      const { data } = await publicFetch.post(
        `signup`,
        credentials
      );

      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError('');

      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setSignupError(data.message);
      setSignupSuccess('');
    }
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/dashboard" />}
      <section className="w-1/2 h-screen m-auto p-8 sm:pt-10">
        <GradientBar />
        <Card>
          <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
              <div>
                <div className="w-32 m-auto mb-6">
                  <img src={logo} alt="Logo" />
                </div>
                <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  Sign up for an account
                </h2>
                <p className="text-gray-600 text-center">
                  Already have an account?{' '}
                  <Hyperlink to="login" text="Log in now" />
                </p>
              </div>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: ''
                }}
                onSubmit={values =>
                  submitCredentials(values)
                }
                validationSchema={SignupSchema}
              >
                {() => (
                  <Form className="mt-8">
                    {signupSuccess && (
                      <FormSuccess text={signupSuccess} />
                    )}
                    {signupError && (
                      <FormError text={signupError} />
                    )}
                    <input
                      type="hidden"
                      name="remember"
                      value="true"
                    />
                    <div>
                      <div className="flex">
                        <div className="mb-2 mr-2 w-1/2">
                          <div className="mb-1">
                            <Label text="First Name" />
                          </div>
                          <FormInput
                            ariaLabel="First Name"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="mb-2 ml-2 w-1/2">
                          <div className="mb-1">
                            <Label text="Last Name" />
                          </div>
                          <FormInput
                            ariaLabel="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="Email address" />
                        </div>
                        <FormInput
                          ariaLabel="Email address"
                          name="email"
                          type="email"
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <div className="mb-1">
                          <Label text="Password" />
                        </div>
                        <FormInput
                          ariaLabel="Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <GradientButton
                        type="submit"
                        text="Sign Up"
                        loading={loginLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Signup;
