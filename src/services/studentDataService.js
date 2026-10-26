// Student data is saved in the browser's localStorage.
// To use a real server, replace these functions with fetch() calls.

const readStudentsFromBrowserStorage = () =>
  JSON.parse(localStorage.getItem("students") || "[]");

const saveStudentsInBrowserStorage = (studentList) =>
  localStorage.setItem("students", JSON.stringify(studentList));

export const studentDataService = {
  async loginWithUsernameAndPassword(username, password) {
    if (username === "admin" && password === "admin123") {
      return { jwtToken: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.signature" };
    }
    throw new Error("Wrong username or password");
  },

  async getAllStudents() {
    return readStudentsFromBrowserStorage();
  },

  async addStudent(newStudent) {
    const studentList = readStudentsFromBrowserStorage();
    studentList.push({ ...newStudent, studentId: Date.now() });
    saveStudentsInBrowserStorage(studentList);
  },

  async updateStudent(studentIdToUpdate, updatedStudent) {
    const studentList = readStudentsFromBrowserStorage().map((student) =>
      student.studentId === studentIdToUpdate
        ? { ...student, ...updatedStudent }
        : student
    );
    saveStudentsInBrowserStorage(studentList);
  },

  async deleteStudent(studentIdToDelete) {
    const remainingStudentList = readStudentsFromBrowserStorage().filter(
      (student) => student.studentId !== studentIdToDelete
    );
    saveStudentsInBrowserStorage(remainingStudentList);
  },
};
