import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

const Category = () => {
  let [category, setCategory] = useState([]);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function fetchCategory() {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_CATE_URL, {
        withCredentials: true,
      });
      setCategory(response.data.getAll);
      setLoading(false);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id) {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_CATE_URL}/delete/${id}`,
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success(`${response.data.message}`);
        fetchCategory();
      }
      setLoading(false);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Card>
        <CardContent>
          <div>
            <Button onClick={() => navigate("/add-category")}>
              <Plus /> Add Category
            </Button>
          </div>

          {/* table start */}
          <Table className={"mt-5"}>
            <TableCaption>Category List</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {category.length > 0 ? (
                category.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>{item.slug}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size={"icon"} onClick={() => navigate(`/update-category/${item._id}`)}>
                        <Pencil />
                      </Button>
                      <Button
                        variant="outline"
                        size={"icon"}
                        onClick={() => deleteCategory(item._id)}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Category;
