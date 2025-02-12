import { FC, ReactNode } from 'react';
import NavBar from '../components/NavBar/NavBar';
import './RootLayout.css';

interface RootLoyoutProps {
  children: ReactNode;
}

const RootLoyout: FC<RootLoyoutProps> = ({ children }) => {
  return (
    <>
      <NavBar></NavBar>
      <main className="main-container">{children}</main>
    </>
  );
};

export default RootLoyout;
