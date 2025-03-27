
const registrar = async (event) => {
  event.preventDefault()

  const name = document.getElementById('name').value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phoneNumber").value
  const address = document.getElementById("address").value
  const password = document.getElementById("password").value

  try {
    const response = await fetch("http://localhost:3333/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, address, password })
    })

    const data = await response.json()

    if (response.ok) {
      window.location.href = "/"
    } else {
      throw new Error(data.message || "Error en el registro")
    }
  } catch (error) {
    alert("Error: " + (error.message || "Ocurrió un error al registrar"))
  }
}