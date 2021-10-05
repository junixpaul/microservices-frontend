import { useState } from 'react';
import { Input, Message, Form, Divider, Button, Icon } from '@alifd/next';
import { useInterval } from './utils';
import styles from './index.module.scss';
import { login, socialLogin } from '@/app/data/datasSlice';
import { useAppDispatch } from '@/app/hooks';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const { Item } = Form;

export interface IDataSource {
  name: string;
  password: string;
  autoLogin: boolean;
  phone: string;
  code: string;
}

const DEFAULT_DATA: IDataSource = {
  name: '',
  // eslint-disable-next-line
  password: '',
  autoLogin: true,
  phone: '',
  code: '',
};

interface LoginProps {
  // eslint-disable-next-line react/require-default-props
  dataSource?: IDataSource;
}

const LoginBlock: React.FunctionComponent<LoginProps> = (props: LoginProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
  } = props;

  const [postData, setValue] = useState(dataSource);
  const dispatch = useAppDispatch();
  const [isRunning, checkRunning] = useState(false);
  const [isPhone, checkPhone] = useState(false);
  const [second, setSecond] = useState(59);

  useInterval(() => {
    setSecond(second - 1);
    if (second <= 0) {
      checkRunning(false);
      setSecond(59);
    }
  }, isRunning ? 1000 : null);

  const formChange = (values: IDataSource) => {
    setValue(values);
  };

  const sendCode = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    // get values.phone
    checkRunning(true);
  };

  const handleSubmit = (values: IDataSource, errors: []) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    dispatch(login(values));
  };

  const phoneForm = (
    <>
      <Item format="tel" required requiredMessage="Required" asterisk={false} >
        <Input
          name="phone"
          innerBefore={<span className={styles.innerBeforeInput}>+86<span className={styles.line} /></span>}
          maxLength={20}
          placeholder="phone number"
        />
      </Item>
      <Item required requiredMessage="Required" style={{ marginBottom: 0 }}>
        <Input
          name="code"
          innerAfter={(
            <span className={styles.innerAfterInput}>
              <span className={styles.line} />
              <Form.Submit
                text
                type="primary"
                style={{ width: 64 }}
                disabled={!!isRunning}
                validate={['phone']}
                onClick={sendCode}
                className={styles.sendCode}
              >
                {isRunning ? `${second}Try again in seconds` : 'get verification code\n'}
              </Form.Submit>
            </span>
          )}
          maxLength={20}
          placeholder="Verification code"
        />
      </Item>
    </>
  );

  const accountForm = (
    <>
      <Item required requiredMessage="Verification code">
        <Input
          name="email"
          placeholder="name@email.com"
        />
      </Item>
      <Item required requiredMessage="Required" style={{ marginBottom: 0 }}>
        <Input.Password
          name="password"
          htmlType="password"
          placeholder="Password"
        />
      </Item>
      <div className={styles.infoLine} style={{ marginTop: 10 }}>
        <div className={styles.infoLeft}>
          <div />
        </div>
        <div>
          <a href="/forgot_password" className={styles.link}>Forgot the password?</a>
        </div>
      </div>
    </>
  );

  const byAccount = () => {
    checkPhone(false);
  };

  const socialLoginSuccess = (googleData: any) => {
    if (googleData.type === 'gmail') {
      const gmailData = { tokenId: googleData.data.tokenId, email: googleData.email, type: googleData.type };
      dispatch(socialLogin(gmailData));
    } else if (googleData.type === 'facebook') {
      const fbData = { tokenId: googleData.data.accessToken, email: '', type: googleData.type };
      dispatch(socialLogin(fbData));
    } else {
      Message.error('Something went wrong. Please try again\n');
    }
  };

  const socialLoginError = (values: any) => {
    Message.error('Something went wrong. Please try again\n');
  };

  return (
    <div className={styles.LoginBlock}>
      <div className={styles.innerBlock}>
        <a href="/" >
          <img
            className={styles.logo}
            src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t1.6435-9/186566662_104455091843318_7682845358022839324_n.png?_nc_cat=100&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeFRS7Evwq3obiL0KjGyVI6M2R-K8kLvfUHZH4ryQu99QeD-sK4VaJNiqZLMVaO75BeLb39lIB9KCrhOgqi5k24m&_nc_ohc=vZfjhOrEyUMAX84IX9q&_nc_ht=scontent.fcrk4-1.fna&oh=6caf5b3ca70ee4c4db5432eba1fa7dca&oe=617F52A8"
            alt="logo"
          />
        </a>
        <div className={styles.desc}>
          <span onClick={byAccount} className={isPhone ? undefined : styles.active}>Login</span>
        </div>

        <Form
          value={postData}
          onChange={formChange}
          size="large"
        >
          {isPhone ? phoneForm : accountForm}
          <Item style={{ marginBottom: 10, marginTop: 10 }}>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              Continue
            </Form.Submit>
          </Item>


          <Divider style={{ fontSize: 14 }}>or</Divider>
          <div>
            <GoogleLogin
              clientId="142971805014-ri91o0shn0cq1u8jv43falfjvhs59t9i.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  style={{ width: '100%', height: 35 }}
                >
                  <Icon type="atm" />
                  <b>Continue with Google</b>
                </Button>
              )}
              buttonText="Log in with Google"
              onSuccess={(data) => socialLoginSuccess({ data, type: 'gmail' })}
              onFailure={socialLoginError}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <FacebookLogin
              appId="3743755145850462"
              autoLoad={false}
              version="3.1"
              onFailure={socialLoginError}
              onSuccess={(data) => socialLoginSuccess({ data, type: 'facebook' })}
              fields="name,email"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  style={{ width: '100%', height: 35 }}
                >
                  <b>Continue with Facebook</b>
                </Button>

              )}
            />
          </div>

          <p style={{ textAlign: 'center' }}>New user? <a href="/register" className={styles.link}>Create account</a></p>

        </Form>
      </div>
    </div>
  );
};

export default LoginBlock;
