import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { client } from "../utils/client";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = ({
  paymethods,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <>{paymethods && paymethods.map((m: { name: any }) => m.name)}</>;
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
  // return client
  //   .query(QUERY)
  //   .toPromise()
  //   .then((d) => {
  //     console.log(d.data.paymethods)
  //     return {
  //       props: { paymethods: d.data.paymethods },
  //     };
  //   })
  //   .catch((e) => {
  //   });

    return {
      props: {},
    };
};

export default Home;
