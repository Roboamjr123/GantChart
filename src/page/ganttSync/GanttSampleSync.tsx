import "../ganttSync/css/tailwind.css";

import React, { useEffect, useState } from "react";
import {
  GanttComponent,
  Inject,
  Selection,
  Toolbar,
  Edit,
  EditSettingsModel,
  ToolbarItem,
  ColumnsDirective,
  ColumnDirective,
  ColumnMenu,
  Filter,
} from "@syncfusion/ej2-react-gantt";
import { GanttSyncData, taskFields } from "./data";

const GanttSampleSync = () => {
  const toolbarOptions: ToolbarItem[] = [
    "Add",
    "Edit",
    "Delete",
    "Cancel",
    "Update",
    "PrevTimeSpan",
    "NextTimeSpan",
    "ExpandAll",
    "CollapseAll",
    "Search",
    "Indent",
    "Outdent",
    "ZoomIn",
    "ZoomOut",
    "ZoomToFit",
  ];

  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
  };

  // Helper function to format date as 'MM dd, yyyy'
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // // Format dates in GanttSyncData
  // const formattedGanttSyncData = GanttSyncData.map((task) => ({
  //   ...task,
  //   StartDate: formatDate(task.PlannedStartDate),
  //   EndDate: formatDate(task.PlannedEndDate),
  //   subtasks: task.subtasks.map((subtask) => ({
  //     ...subtask,
  //     StartDate: formatDate(subtask.PlannedStartDate),
  //     EndDate: formatDate(subtask.PlannedEndDate),
  //   })),
  // }));

  return (
    <div className="p-5">
      <GanttComponent
        loadingIndicator={{ indicatorType: "Shimmer" }}
        dataSource={GanttSyncData}
        taskFields={taskFields}
        height="450px"
        timelineSettings={{
          timelineViewMode: "Week",
        }}
        splitterSettings={{ position: "50%" }}
        allowSelection={true}
        toolbar={toolbarOptions}
        // allowResizing={true}
        highlightWeekends={true}
        labelSettings={{ taskLabel: "${Progress}%", rightLabel: "TaskName" }}
        baselineColor="orange"
        renderBaseline={true}
        // showColumnMenu={true}

        editSettings={editOptions}
      >
        <Inject services={[Toolbar, Selection, Filter, Edit]} />
        <ColumnsDirective>
          {/* <ColumnDirective field="TaskID" headerText="ID" /> */}
          <ColumnDirective field="TaskName" headerText="Name" />
          <ColumnDirective
            field="PlannedStartDate"
            format="MMMM d, yyyy"
            headerText="Start Date"
          />
          <ColumnDirective
            field="PlannedEndDate"
            format="MMMM d, yyyy"
            headerText="End Date"
            allowEditing
          />
          <ColumnDirective field="Week" headerText="Duration (Days)" allowEditing={false} />
        </ColumnsDirective>
      </GanttComponent>
    </div>
  );
};

export default GanttSampleSync;
