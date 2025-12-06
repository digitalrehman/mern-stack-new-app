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
import { Loader } from "lucide-react";

const Category = () => {
  let [category, setCategory] = useState([]);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function fetchCategory() {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_CATE_URL);
      setCategory(response.data.getAll);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);
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
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    <Loader className="animate-spin" />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {category.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>{item.slug}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size={"icon"}>
                        <Pencil />
                      </Button>
                      <Button variant="outline" size={"icon"}>
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Category;
