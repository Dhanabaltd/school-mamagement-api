import { withRouter } from "react-router-dom";
import { useStyles } from "./styles";
import * as React from 'react';
import StaffList from './staff/staffList';
import CourseList from './course/courseList';
import StudentList from './student/studentList';
import AddStaff from "./staff/addStaff";
import EditStaff from "./staff/editStaff";
import AddCourse from "./course/addCourse";
import EditCourse from "./course/editCourse";
import AddStudent from "./student/addStudent";
import EditStudent from "./student/editStudent";
import ViewCourse from "./course/viewCourse";
import ViewStudent from "./student/viewStudent";
import ViewStaff from "./staff/viewStaff";

export const Body = withRouter((props) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {props?.label === "STAFF" ?
                <StaffList value={props} />
                : props?.label === "COURSE" ?
                    <CourseList value={props} />
                    : props?.label === "STUDENT" ?
                        <StudentList value={props} />
                        : props?.label === "STAFFADD" ?
                            <AddStaff value={props} />
                            : props?.label === "STAFFEDIT" ?
                                <EditStaff value={props} />
                                : props?.label === "COURSEADD" ?
                                    <AddCourse value={props} />
                                    : props?.label === "COURSEEDIT" ?
                                        <EditCourse value={props} />
                                        : props?.label === "STUDENTADD" ?
                                            <AddStudent value={props} />
                                            : props?.label === "STUDENTEDIT" ?
                                                <EditStudent value={props} />
                                                : props?.label === "COURSEVIEW" ?
                                                    <ViewCourse value={props} />
                                                    : props?.label === "STAFFVIEW" ?
                                                        <ViewStaff value={props} />
                                                        : props?.label === "STUDENTVIEW" ?
                                                            <ViewStudent value={props} />
                                                            : null
            }
        </main>
    );
});
