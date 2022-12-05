import TopHeader from "../TopHeader/topHeader";
import { MainFooter } from "../Footer/mainFooter";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode
}

export const MainLayout = ({ children }: IProps) => {
  return (
    <>
      <TopHeader />
      <main>{children}</main>
      <MainFooter />
    </>
  )
}