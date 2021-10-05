import { useState } from 'react';
import { Input, Message, Form, Divider, Checkbox, Icon } from '@alifd/next';
import { appHistory } from '@ice/stark';
import { register } from '../../../../app/data/datasSlice';
// import { useAppSelector, useAppDispatch } from '../../../../app/hooks'


import { useInterval } from './utils';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';

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

interface RegisterProps {
  // eslint-disable-next-line react/require-default-props
  dataSource?: IDataSource;
}

const RegisterBlock: React.FunctionComponent<RegisterProps> = (props: RegisterProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
  } = props;

  const [postData, setValue] = useState(dataSource);
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
    dispatch(register(values));
  };

  const accountForm = (
    <>
      <Item required requiredMessage="Verification code">
        <Input
          name="name"
          maxLength={20}
          placeholder="Username"
        />
      </Item>
      <Item required requiredMessage="Email">
        <Input
          name="email"
          placeholder="Email"
        />
      </Item>
      <Item required requiredMessage="First Name">
        <Input
          name="firstname"
          placeholder="First Name"
        />
      </Item>
      <Item required requiredMessage="Last Name">
        <Input
          name="lastname"
          placeholder="Last Name"
        />
      </Item>
      <Item required requiredMessage="Mobile Number">
        <Input
          name="mobile"
          placeholder="Mobile Number"
        />
      </Item>
      <Item required requiredMessage="Required" style={{ marginBottom: 0 }}>
        <Input.Password
          name="password"
          htmlType="password"
          placeholder="password"
        />
      </Item>
    </>
  );

  return (
    <div className={styles.LoginBlock}>
      <div className={styles.innerBlock}>
        <a href="#" >
          <img
            className={styles.logo}
            src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t1.6435-9/186566662_104455091843318_7682845358022839324_n.png?_nc_cat=100&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeFRS7Evwq3obiL0KjGyVI6M2R-K8kLvfUHZH4ryQu99QeD-sK4VaJNiqZLMVaO75BeLb39lIB9KCrhOgqi5k24m&_nc_ohc=vZfjhOrEyUMAX84IX9q&_nc_ht=scontent.fcrk4-1.fna&oh=6caf5b3ca70ee4c4db5432eba1fa7dca&oe=617F52A8"
            alt="logo"
          />
        </a>
        <div className={styles.desc}>
          <span className={styles.active}>SIGN-UP</span>
        </div>

        <Form
          value={postData}
          onChange={formChange}
          size="large"
        >
          { accountForm }

          <Item style={{ marginBottom: 10, marginTop: 20 }}>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              Submit
            </Form.Submit>
          </Item>
          <div className={styles.infoLine}>
            <p>Already have an account?  <a href="/login" className={styles.link}>Login</a></p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterBlock;
