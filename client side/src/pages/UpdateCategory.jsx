import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UpdateCategory = () => {
  let navigate = useNavigate();
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
        <Input placeholder="Category Name" className="w-96" />
        <Button type="submit" className="w-96">
          Update Category
        </Button>
      </form>
      <div className="flex items-center gap-1">
        <p className="text-sm">If you want to add category</p>
        <Button onClick={() => navigate("/add-category")} variant="link" className="text-blue-500">Add Category</Button>
      </div>
    </div>
  );
};

export default UpdateCategory;
