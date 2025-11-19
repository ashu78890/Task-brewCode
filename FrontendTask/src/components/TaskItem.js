export default function TaskItem({ task, onUpdate, onDelete }) {
  const toggleStatus = () => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    onUpdate(task._id, { status: newStatus });
  };

  const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;

  return (
    <div style={{
      border: "1px solid #e0e0e0",
      padding: 12,
      borderRadius: 6,
      marginBottom: 10,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <h3 style={{ margin: 0 }}>{task.title}</h3>
        <div style={{ fontSize: 13, color: "#555" }}>
          <span>Status: <strong>{task.status}</strong></span>
          {formattedDate && <span style={{ marginLeft: 12 }}>Due: {formattedDate}</span>}
        </div>
        {task.description && <p style={{ margin: "8px 0 0 0", color: "#333" }}>{task.description}</p>}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={toggleStatus} style={{ padding: "6px 10px" }}>
          {task.status === "pending" ? "Mark Completed" : "Mark Pending"}
        </button>
        <button onClick={() => onDelete(task._id)} style={{ padding: "6px 10px", background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 4 }}>
          Delete
        </button>
      </div>
    </div>
  );
}
