import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.length < 3) {
      newErrors.name = "Minimum 3 characters.";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Valid email is required.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits.";
    }

    if (formData.age < 18 || formData.age > 60) {
      newErrors.age = "Age must be between 18 and 60.";
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      terms: false,
    });
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <div className="box">
      <h2>Register for Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <div className="error">{errors.name}</div>}

        <label>Email:</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}

        <label>Phone:</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <div className="error">{errors.phone}</div>}

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <div className="error">{errors.age}</div>}

        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          Accept Terms
        </label>
        {errors.terms && <div className="error">{errors.terms}</div>}

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      {submittedData && (
        <div className="result">
          <h3>Details Submitted:</h3>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Phone: {submittedData.phone}</p>
          <p>Age: {submittedData.age}</p>
        </div>
      )}
    </div>
  );
}

export default App;