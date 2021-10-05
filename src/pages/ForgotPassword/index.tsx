import { ResponsiveGrid } from '@alifd/next';
import LoginBlock from './components/ForgotPasswordBlock';

const { Cell } = ResponsiveGrid;

const ForgotPassword = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <LoginBlock />
      </Cell>
    </ResponsiveGrid>
  );
};

export default ForgotPassword;
