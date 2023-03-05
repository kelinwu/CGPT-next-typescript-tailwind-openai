import { Inter } from "@next/font/google";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = ({
  paymethods,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <>hello</>;
};

type Data = {
  category: Record<string, string>[];
};

const QUERY = `query {
  paymethods {
    name
    type
  }
}`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Home;
