import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth";

const Form = () => {
  let navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();

  const resetMessages = () => {
    setError("");
  };

  const validate = () => {
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    if (mode === "signup") {
      if (!name) return "Name is required for signup";
      if (!confirm) return "Please confirm your password";
      if (password !== confirm) return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    if (mode === "login") {
      try {
        setLoading(true);
        let response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/login`,
          { email, password },
          { withCredentials: true }
        );
        setLoading(false);
        dispatch(setUser(response.data.user));
        if (response.status === 201) {
          toast.success(`Welcome back, ${response.data.user.name}!`);
        }
        navigate("/");
        setEmail("");
        setPassword("");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        let response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/register`,
          { name, email, password },
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        setMode("login");
        if (response.status === 201) {
          toast.success(response.data.message);
        }
        setName("");
        setConfirm("");
        setEmail("");
        setPassword("");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h2>
          <div className="flex gap-2">
            <Button
              variant={mode === "login" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                resetMessages();
                setMode("login");
              }}
            >
              Login
            </Button>
            <Button
              variant={mode === "signup" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                resetMessages();
                setMode("signup");
              }}
            >
              Sign up
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {mode === "signup" && (
            <div className="grid gap-1">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          )}

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div className="flex items-center justify-between gap-2">
            <Button type="submit">
              {loading ? (
                <Loader className="animate-spin" />
              ) : mode === "login" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => {
                setEmail("");
                setPassword("");
                setName("");
                setConfirm("");
                resetMessages();
              }}
            >
              Clear
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              New here?{" "}
              <button
                className="text-primary underline"
                onClick={() => {
                  resetMessages();
                  setMode("signup");
                }}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-primary underline"
                onClick={() => {
                  resetMessages();
                  setMode("login");
                }}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
