import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ArrowLeftIcon, Loader } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  let [categoryName, setCategoryName] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let resposne = await axios.post(
        `${import.meta.env.VITE_CATE_URL}/create`,
        {
          categoryName,
        }
      );
      if (resposne.status === 201) {
        toast.success(`${resposne.data.message}`);
        setLoading(false);
        navigate("/category");
      }
    } catch (error) {
      setLoading(false);
      toast.error(resposne.data.message);
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

      <h1 className="text-2xl font-semibold">Add Category</h1>
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
          {loading ? <Loader className="animate-spin" /> : "Add Category"}
        </Button>
      </form>
      <div className="flex items-center gap-1">
        <p className="text-sm">If you want to update category</p>
        <Button
          onClick={() => navigate("/update-category/:4")}
          variant="link"
          className="text-blue-500"
        >
          Update Category
        </Button>
      </div>
    </div>
  );
};

export default AddCategory;
