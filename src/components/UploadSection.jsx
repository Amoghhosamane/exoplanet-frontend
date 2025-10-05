const API_BASE_URL = "https://exoplanet-backend.onrender.com";

async function handleFileUpload(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/upload_and_analyze`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Response from backend:", data);
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}
