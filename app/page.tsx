"use client";

import Header from "./components/Header";
import Chat from "./components/Chat";
import Footer from "./components/Footer";
import Aside from "./components/Aside";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <Header></Header>
      <Chat></Chat>
      <Footer></Footer>
      <Aside></Aside>
    </Layout>
  );
}
