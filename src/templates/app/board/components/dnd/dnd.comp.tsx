"use client";

import React from "react";
import { useDnd } from "./use.dnd";
import styles from "./dnd.module.css";
import { Box } from "@radix-ui/themes";
import Areas from "../areas/areas.comp";
import DraggableCard from "../draggable/draggable.comp";
import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import TaskView from "../task_view/task_view.comp";
import NewTask from "@/components/new_task/new_task.comp";
import { NewTaskProps } from "@/components/new_task/types/new_task";

const Dnd = () => {
  const {
    task,
    areas,
    taskId,
    sensors,
    editView,
    openView,
    activeTask,
    setEditView,
    setOpenView,
    handleDragEnd,
    handleDragStart,
    handleDragCancel,
  } = useDnd();

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
    >
      <Box className={styles.main}>
        {areas.map((item) => (
          <Areas
            title={item.title}
            key={item.defaultValue}
            defaultValue={item.defaultValue}
          />
        ))}
        <TaskView
          open={openView}
          taskId={taskId as string}
          close={() => setOpenView(!openView)}
        />

        {task && (
          <NewTask
            open={editView}
            onClose={() => setEditView(!editView)}
            defaultStatus={task?.status as NewTaskProps["defaultStatus"]}
            defaultValues={{
              ...task,
              date: {
                from: task.date_from,
                to: task.date_to,
              },
            }}
          />
        )}
      </Box>

      <DragOverlay>
        {activeTask ? <DraggableCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Dnd;
