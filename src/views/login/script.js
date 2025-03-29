const login = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.user) {
        // Redirect to user profile page
        window.location.href = "/user/profile";
      } else if (data.company) {
        // Redirect to company dashboard
        window.location.href = "/company/dashboard";
      } else {
        // Fallback to companies page if no specific data is returned
        window.location.href = "/companies";
      }
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    alert("Error: " + (error.message || "An error occurred during login"));
  }
};
