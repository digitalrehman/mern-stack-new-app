import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Form = () => {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccess("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    resetMessages();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    // Placeholder: replace with real API call
    if (mode === "login") {
      console.log("Logging in:", { email, password });
      setSuccess("Login submitted (check console).");
    } else {
      console.log("Signing up:", { name, email, password });
      setSuccess("Signup submitted (check console). Please verify email if required.");
    }

    // keep fields for demonstration; in real app you may clear them or navigate
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{mode === "login" ? "Welcome back" : "Create an account"}</h2>
          <div className="flex gap-2">
            <Button
              variant={mode === "login" ? "default" : "outline"}
              size="sm"
              onClick={() => { resetMessages(); setMode("login"); }}
            >
              Login
            </Button>
            <Button
              variant={mode === "signup" ? "default" : "outline"}
              size="sm"
              onClick={() => { resetMessages(); setMode("signup"); }}
            >
              Sign up
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {mode === "signup" && (
            <div className="grid gap-1">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
          )}

          {error && <div className="text-sm text-destructive">{error}</div>}
          {success && <div className="text-sm text-success">{success}</div>}

          <div className="flex items-center justify-between gap-2">
            <Button type="submit">{mode === "login" ? "Sign in" : "Create account"}</Button>
            <Button variant="ghost" size="sm" type="button" onClick={() => { setEmail(""); setPassword(""); setName(""); setConfirm(""); resetMessages(); }}>
              Clear
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              New here? <button className="text-primary underline" onClick={() => { resetMessages(); setMode("signup"); }}>Create an account</button>
            </>
          ) : (
            <>
              Already have an account? <button className="text-primary underline" onClick={() => { resetMessages(); setMode("login"); }}>Sign in</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
