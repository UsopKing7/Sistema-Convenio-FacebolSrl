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
      if (data.user && typeof data.user === "object") {
        window.location.href = "/user/profile";
      } else if (data.company && typeof data.company === "object") {
        if (data.users && data.users.length > 0) {
          window.location.href = "/company/dashboard";
        } else {
          alert("No users associated with this company.");
        }
      } else {
        window.location.href = "/companies";
      }
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    alert("Error: " + (error.message || "An error occurred during login"));
  }
};