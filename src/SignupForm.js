import React, { useState } from "react";

function SignupForm() {
  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    mobile: "",
    dob: "",
    address: "",
    qualification: "",
    skills: [],
    shift: [],
    resume: null,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      const newShift = checked
        ? [...formData.shift, value]
        : formData.shift.filter((s) => s !== value);
      setFormData({ ...formData, shift: newShift });
    } else if (type === "file") {
      setFormData({ ...formData, resume: files[0] });
    } else if (type === "select-multiple") {
      const options = [...e.target.selectedOptions].map((o) => o.value);
      setFormData({ ...formData, [name]: options });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => data.append(`${key}[]`, item));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:2024/api/register", {
        method: "POST",
        body: data,
      });

      const result = await response.text();
      alert(result);
      handleReset(); // Clear form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{ margin: "20px" }}
    >
      <h2 style={{ color: "red", textAlign: "center" }}>Please signup here!!!</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", margin: "auto" }}>
        <tbody>
          <tr>
            <td>Enter UserName:</td>
            <td><input type="text" name="username" onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td>Enter Password:</td>
            <td><input type="password" name="password" onChange={handleChange} required autoComplete="new-password" /></td>
          </tr>
          <tr>
            <td>Confirm Password:</td>
            <td><input type="password" name="confirmPassword" onChange={handleChange} required autoComplete="new-password" /></td>
          </tr>
          <tr>
            <td>Select Gender:</td>
            <td>
              <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
            </td>
          </tr>
          <tr>
            <td>Enter MobileNumber:</td>
            <td><input type="text" name="mobile" onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td>Enter DOB:</td>
            <td><input type="date" name="dob" onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Enter Address:</td>
            <td><textarea name="address" rows="4" cols="40" onChange={handleChange}></textarea></td>
          </tr>
          <tr>
            <td>Select Qualification:</td>
            <td>
              <select name="qualification" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Choose your Skills:</td>
            <td>
              <select name="skills" multiple size="4" onChange={handleChange} required>
                <option value="Java">Java</option>
                <option value="HTML5">HTML5</option>
                <option value="CSS3">CSS3</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Preferred Shift:</td>
            <td>
              <label><input type="checkbox" name="shift" value="DayShift" onChange={handleChange} /> DayShift</label>
              <label><input type="checkbox" name="shift" value="NightShift" onChange={handleChange} /> NightShift</label>
              <label><input type="checkbox" name="shift" value="Day/Night" onChange={handleChange} /> DayShift/NightShift</label>
            </td>
          </tr>
          <tr>
            <td>Upload your resume:</td>
            <td><input type="file" name="resume" onChange={handleChange} /></td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <button type="submit">Register</button>
              &nbsp;
              <button type="button" onClick={handleReset}>Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default SignupForm;
