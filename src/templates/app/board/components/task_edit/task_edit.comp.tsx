"use client";

import React from "react";
import styles from "./task_edit.module.css";
import { useTaskEdit } from "./use.task_edit";

const TaskEdit = () => {
  const {} = useTaskEdit();

  return <div>TaskEdit</div>;
};

export default TaskEdit;
