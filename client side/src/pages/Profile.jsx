import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setUser } from "@/store/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setAvatarPreview(user.image || "");
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setName(user?.name || "");
    setBio(user?.bio || "");
    setPassword("");
    setAvatarFile(null);
    setAvatarPreview(user?.image || "");
    setMessage("");
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!name) {
      setError("Name is required");
      return;
    }

    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("password", password);
      if (avatarFile) {
        formData.append("image", avatarFile);
      }

      let response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/updateUser/${user._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to update profile");
    }
  };

  return (
    <div className="pt-16 px-4">
      <div className="mx-auto w-full max-w-2xl rounded-lg border bg-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Your profile</h1>

        <form onSubmit={handleSave} className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="h-24 w-24 overflow-hidden rounded-full border bg-muted">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="flex-1 grid gap-2">
              <div className="grid">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid">
            <Label htmlFor="email">Email (read-only)</Label>
            <Input id="email" value={user?.email || ""} disabled />
          </div>

          <div className="grid">
            <Label htmlFor="password">Password (optional)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password to change"
            />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}
          {message && <div className="text-sm text-success">{message}</div>}

          <div className="flex items-center gap-2 justify-end">
            <Button variant="outline" type="button" onClick={handleClear}>
              Clear
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
