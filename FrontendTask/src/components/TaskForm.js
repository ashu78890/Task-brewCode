import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    // Normalize dueDate: empty string -> undefined
    const payload = {
      title: form.title.trim(),
      description: form.description ? form.description.trim() : undefined,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined
    };
    onCreate(payload);
    setForm({ title: "", description: "", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
      <input
        placeholder="Title *"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        style={{ flex: 2, padding: 8 }}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ flex: 3, padding: 8 }}
      />
      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        style={{ padding: 8 }}
      />
      <button type="submit" style={{ padding: "8px 12px" }}>Add</button>
      {error && <div style={{ color: "red", marginTop: 6 }}>{error}</div>}
    </form>
  );
}
