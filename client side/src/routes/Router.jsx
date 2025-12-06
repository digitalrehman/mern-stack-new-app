import Layout from "@/layout/Layout";
import AddCategory from "@/pages/AddCategory";
import Blog from "@/pages/Blog";
import Blogs from "@/pages/Blogs";
import Category from "@/pages/Category";
import Form from "@/pages/Form";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import UpdateCategory from "@/pages/UpdateCategory";
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
          <Route path="/category" element={<Category />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
