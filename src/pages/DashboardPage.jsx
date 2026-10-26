import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { studentDataService } from "../services/studentDataService.js";

const emptyStudentForm = { name: "", email: "", course: "" };

export default function DashboardPage() {
  const navigateToPage = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [studentForm, setStudentForm] = useState(emptyStudentForm);
  const [studentIdBeingEdited, setStudentIdBeingEdited] = useState(null);

  const loadStudents = async () => {
    setStudentList(await studentDataService.getAllStudents());
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleInputChange = (changeEvent) => {
    setStudentForm({
      ...studentForm,
      [changeEvent.target.name]: changeEvent.target.value,
    });
  };

  // Add a new student, or update the student that is being edited
  const handleSaveStudent = async (submitEvent) => {
    submitEvent.preventDefault();

    if (studentIdBeingEdited) {
      await studentDataService.updateStudent(studentIdBeingEdited, studentForm);
    } else {
      await studentDataService.addStudent(studentForm);
    }

    setStudentForm(emptyStudentForm);
    setStudentIdBeingEdited(null);
    loadStudents();
  };

  const handleEditStudent = (studentToEdit) => {
    setStudentIdBeingEdited(studentToEdit.studentId);
    setStudentForm({
      name: studentToEdit.name,
      email: studentToEdit.email,
      course: studentToEdit.course,
    });
  };

  const handleDeleteStudent = async (studentIdToDelete) => {
    await studentDataService.deleteStudent(studentIdToDelete);
    loadStudents();
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigateToPage("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="top-bar">
        <h2>Student Dashboard</h2>
        <button className="delete-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form className="student-form" onSubmit={handleSaveStudent}>
        <input
          name="name"
          placeholder="Name"
          value={studentForm.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={studentForm.email}
          onChange={handleInputChange}
          required
        />
        <input
          name="course"
          placeholder="Course"
          value={studentForm.course}
          onChange={handleInputChange}
          required
        />
        <button>{studentIdBeingEdited ? "Update Student" : "Add Student"}</button>
      </form>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => (
            <tr key={student.studentId}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button onClick={() => handleEditStudent(student)}>Edit</button>{" "}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteStudent(student.studentId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
