import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "react-hot-toast";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Simulate API call
    try {
      console.log({
        title,
        description,
        image,
      });

      // Here you would typically construct a FormData object and send it to your backend
      // const formData = new FormData()
      // formData.append('title', title)
      // formData.append('description', description)
      // formData.append('image', image)
      // await axios.post('/api/blogs', formData)

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      toast.success("Blog created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Blog</CardTitle>
          <CardDescription>
            Share your thoughts with the world. Fill in the details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title</Label>
              <Input
                id="title"
                placeholder="Enter an engaging title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUpload onImageUpload={setImage} />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor content={description} onChange={setDescription} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit} disabled={loading} size="lg">
            {loading ? "Publishing..." : "Publish Blog"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddBlog;
