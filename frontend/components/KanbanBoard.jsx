"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { toast } from "sonner";

const COLUMNS = [
  { id: "NEW", title: "New" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "REPAIRED", title: "Repaired" },
  { id: "SCRAP", title: "Scrap" },
];

export default function KanbanBoard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/requests").then(res => setItems(res.data));
  }, []);

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const newStatus = destination.droppableId;

    try {
      await api.post(`/requests/${draggableId}/status`, {
        status: newStatus,
      });

      setItems(prev =>
        prev.map(i =>
          i.id === draggableId ? { ...i, status: newStatus } : i
        )
      );

      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map(col => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-slate-100 rounded-xl p-3 min-h-[70vh]"
              >
                <h2 className="font-semibold mb-3">{col.title}</h2>

                {items
                  .filter(i => i.status === col.id)
                  .map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition"
                        >
                          <h3 className="font-medium">{item.subject}</h3>
                          <p className="text-xs text-gray-500">
                            {item.equipment?.name}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
