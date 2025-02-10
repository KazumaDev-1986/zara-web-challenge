import { FC, ReactNode } from 'react';
import NavBar from '../components/NavBar/NavBar';

interface RootLoyoutProps {
  children: ReactNode;
}

const RootLoyout: FC<RootLoyoutProps> = ({ children }) => {
  return (
    <>
      <NavBar></NavBar>
      <main>{children}</main>
    </>
  );
};

export default RootLoyout;
