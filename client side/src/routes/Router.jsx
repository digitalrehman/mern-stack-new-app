import Layout from "@/layout/Layout";
import Blog from "@/pages/Blog";
import Form from "@/pages/Form";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import React from "react";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
