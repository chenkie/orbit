import React, {
  useContext,
  useState,
  useEffect
} from 'react';
import PageTitle from '../components/common/PageTitle';
import Card from './../components/common/Card';
import GradientButton from '../components/common/GradientButton';
import { Formik, Form, Field } from 'formik';
import { FetchContext } from './../context/FetchContext';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';

const Settings = () => {
  const fetchContext = useContext(FetchContext);
  const [bio, setBio] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getBio = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'bio'
        );
        setBio(data.bio);
      } catch (err) {
        console.log(err);
      }
    };
    getBio();
  }, [fetchContext.authAxios]);

  const saveBio = async bio => {
    try {
      const { data } = await fetchContext.authAxios.patch(
        'bio',
        bio
      );
      setErrorMessage(null);
      setSuccessMessage(data.message);
    } catch (err) {
      const { data } = err.response;
      setSuccessMessage(null);
      setErrorMessage(data.message);
    }
  };
  return (
    <>
      <PageTitle title="Settings" />
      <Card>
        <h2 className="font-bold mb-2">
          Fill Out Your Bio
        </h2>
        {successMessage && (
          <FormSuccess text={successMessage} />
        )}
        {errorMessage && <FormError text={errorMessage} />}
        <Formik
          initialValues={{
            bio
          }}
          onSubmit={values => saveBio(values)}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <Field
                className="border border-gray-300 rounded p-1 w-full h-56 mb-2"
                component="textarea"
                name="bio"
                placeholder="Your bio here"
              />
              <GradientButton text="Save" type="submit" />
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default Settings;
