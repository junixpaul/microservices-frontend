import { useState } from 'react';
import { Input, Message, Form, Divider, Checkbox, Icon } from '@alifd/next';
import { appHistory } from '@ice/stark';
import { forgotPassword, resetPassword } from '../../../../app/data/datasSlice';
// import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { useInterval } from './utils';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { Link } from 'ice';

const { Item } = Form;

export interface IDataSource {
  name: string;
  password: string;
  email: string;
  firstname: string;
  mobile: string;
  lastname: string;
}

const DEFAULT_DATA: IDataSource = {
  name: '',
  // eslint-disable-next-line
  password: '',
  email: '',
  firstname: '',
  mobile: '',
  lastname: '',
};

interface ForgotPasswordProps {
  // eslint-disable-next-line react/require-default-props
  dataSource?: IDataSource;
}

const ForgotPasswordBlock: React.FunctionComponent<ForgotPasswordProps> = (props: ForgotPasswordProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
  } = props;

  const [postData, setValue] = useState(dataSource);
  const [formDisply, setFormValue] = useState({ path: '' });
  const [isRunning, checkRunning] = useState(false);
  // const [isPhone, checkPhone] = useState(false);
  const [second, setSecond] = useState(59);
  const dispatch = useAppDispatch();
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

  const handleSubmit = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    dispatch(forgotPassword(values));
    setFormValue({ path: 'verify' });
  };

  const handleSubmitVerify = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }

    if (values.new_password === values.verify_password) {
      dispatch(resetPassword(values));
    } else {
      Message.error("Password don't Match");
    }
  };

  const accountForm = (
    <>
      <Item required requiredMessage="Email">
        <Input
          name="email"
          placeholder="Email"
        />
        <p>{ formDisply.path === '' ? '' : 'Please check email for the code.' }</p>
      </Item>
    </>
  );


  const accountForm2 = (
    <>
      <Item required requiredMessage="Verification code">
        <Input
          name="code"
          maxLength={20}
          placeholder="Code"
        />
      </Item>
      <Item required requiredMessage="Required">
        <Input.Password
          name="new_password"
          htmlType="password"
          placeholder="New Password"
        />
      </Item>
      <Item required requiredMessage="Required">
        <Input.Password
          name="verify_password"
          htmlType="password"
          placeholder="Verify Password"
        />
      </Item>
    </>
  );

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
          <span className={styles.active}>FORGOT PASSWORD</span>
        </div>

        <Form
          value={postData}
          onChange={formChange}
          size="large"
        >
          { accountForm }
          { formDisply.path === '' ? <></> : accountForm2 }

          <Item style={{ marginBottom: 10, marginTop: 20 }}>
            <Form.Submit
              type="primary"
              onClick={formDisply.path === '' ? handleSubmit : handleSubmitVerify}
              className={styles.submitBtn}
              validate
            >
              { formDisply.path === '' ? 'Verify Email' : 'Reset Password' }
            </Form.Submit>
          </Item>

          { formDisply.path === '' ? <></> : <div className={styles.infoLine}>
            <a onClick={handleSubmitVerify}>Send code again?</a>
          </div>
          }

          <div className={styles.infoLeft}>
            <div className={styles.infoLine}>
              <p>Already have an account?  <a href="/login" className={styles.link}>Login</a></p>
            </div>
          </div>

        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordBlock;
