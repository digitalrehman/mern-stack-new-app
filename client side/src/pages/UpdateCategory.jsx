import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ArrowLeftIcon, Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  let { selected_category } = useSelector((state) => state.user);

  let { id } = useParams();
  let navigate = useNavigate();
  let [categoryName, setCategoryName] = useState(selected_category);
  let [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let resposne = await axios.put(
        `${import.meta.env.VITE_CATE_URL}/update/${id}`,
        {
          categoryName,
        },
        {
          withCredentials: true,
        }
      );
      if (resposne.status === 200) {
        toast.success(`${resposne.data.message}`);
        setLoading(false);
        navigate("/category");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-2 max-w-xl mx-auto p-4 relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate("/category")}
        className={"absolute -top-2 -left-52"}
      >
        <ArrowLeftIcon />
      </Button>

      <h1 className="text-2xl font-semibold">Update Category</h1>
      <form className="flex flex-col gap-2">
        <Input
          placeholder="Category Name"
          className="w-96"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          type="submit"
          className="w-96"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : "Update Category"}
        </Button>
      </form>
      <div className="flex items-center gap-1">
        <p className="text-sm">If you want to add category</p>
        <Button
          onClick={() => navigate("/add-category")}
          variant="link"
          className="text-blue-500"
        >
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default UpdateCategory;
